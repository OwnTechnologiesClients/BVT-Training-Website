"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Loader2, ArrowRight, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { completeProfile, checkProfileCompletion, verifyPhoneNumber } from "@/lib/api/student";
import { sendPhoneVerificationCode, verifyPhoneCode, cleanupRecaptcha } from "@/lib/firebase";
import { showSuccess, showError } from "@/lib/utils/sweetalert";
import CountryCodeSelector from "@/components/common/CountryCodeSelector";
// Country codes will be loaded dynamically in useEffect


export default function CompleteProfilePage() {
  const router = useRouter();
  const { student, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+1",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
  });
  const [errors, setErrors] = useState({});
  const [countryCodes, setCountryCodes] = useState([]);
  const [countryCodesLoading, setCountryCodesLoading] = useState(true);
  
  // Phone verification states
  const [phoneVerificationStep, setPhoneVerificationStep] = useState(0); // 0: not started, 1: OTP sent, 2: verified
  const [phoneVerificationLoading, setPhoneVerificationLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // Load country codes from country-list-with-dial-code-and-flag package
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadCountries = async () => {
        try {
          // Import the package dynamically
          const CountryListModule = await import('country-list-with-dial-code-and-flag');
          
          // The package exports CountryList with getAll() method
          const CountryList = CountryListModule.default || CountryListModule;
          
          if (CountryList && typeof CountryList.getAll === 'function') {
            const countries = CountryList.getAll();
            
            if (countries && Array.isArray(countries) && countries.length > 0) {
              // Helper function to generate flag emoji from country code (ISO 3166-1 alpha-2) - fallback only
              const getFlagEmoji = (countryCode) => {
                if (!countryCode || countryCode.length !== 2) return '';
                // Convert country code to flag emoji
                const codePoints = countryCode
                  .toUpperCase()
                  .split('')
                  .map(char => 127397 + char.charCodeAt());
                return String.fromCodePoint(...codePoints);
              };
              
              // Map all countries with their fields directly
              const allCountries = countries
                .map((country) => {
                  // Extract ALL fields
                  const dialCode = country.dial_code || country.dialCode || '';
                  const code = dialCode ? (dialCode.toString().startsWith('+') ? dialCode.toString() : `+${dialCode}`) : '';
                  const countryName = country.name || country.countryName || '';
                  const countryCode = country.code || country.countryCode || country.iso2 || country.iso || '';
                  
                  // Check ALL possible flag field names
                  const flag = country.flag || 
                               country.flagEmoji || 
                               country.emoji || 
                               country.flag_emoji || 
                               country.flagEmojiUnicode ||
                               country.unicode ||
                               '';
                  
                  // Use package flag, or generate from country code if available
                  let finalFlag = flag;
                  if (!finalFlag && countryCode && countryCode.length === 2) {
                    finalFlag = getFlagEmoji(countryCode);
                  }
                  
                  return {
                    id: `${code}-${countryCode || Math.random()}`, // Unique ID combining dial code and country code
                    code: code,
                    country: countryName,
                    flag: finalFlag, // This should be the emoji flag
                    countryCode: countryCode
                  };
                })
                .filter(item => item.code && item.code.trim() && item.code !== '+' && item.code !== '++');
              
              // Deduplicate by dial code - keep the first country for each dial code
              const seenCodes = new Set();
              const formattedCountries = allCountries
                .filter(item => {
                  if (!seenCodes.has(item.code)) {
                    seenCodes.add(item.code);
                    return true;
                  }
                  return false;
                })
                .map(item => ({
                  id: item.id,
                  code: item.code,
                  country: item.country,
                  flag: item.flag
                }))
                .sort((a, b) => {
                  // Sort by country name for better UX
                  return a.country.localeCompare(b.country);
                });
              
              if (formattedCountries.length > 0) {
                setCountryCodes(formattedCountries);
                // Set default country code if not already set or if current value is '+1' (initial default)
                setFormData(prev => {
                  if (!prev.countryCode || prev.countryCode === '+1') {
                    const defaultCode = formattedCountries.find(c => c.code === '+1') || formattedCountries[0];
                    if (defaultCode) {
                      return { ...prev, countryCode: defaultCode.code };
                    }
                  }
                  return prev;
                });
              } else {
                console.error('No formatted country codes found.');
              }
              setCountryCodesLoading(false);
            } else {
              console.error('Invalid countries data from getAll().');
              setCountryCodesLoading(false);
            }
          } else {
            console.error('CountryList.getAll is not a function.');
            setCountryCodesLoading(false);
          }
        } catch (error) {
          console.error('Error loading country codes:', error);
          setCountryCodesLoading(false);
        }
      };

      loadCountries();
    }
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Check if profile is already complete
    const checkProfile = async () => {
      try {
        const response = await checkProfileCompletion();
        if (response.success && response.data) {
          // Only redirect if profile is complete AND user didn't explicitly come here
          // Check for query parameter to see if user wants to complete profile
          const urlParams = new URLSearchParams(window.location.search);
          const forceComplete = urlParams.get('complete') === 'true';
          
          // If profile is complete and no force parameter, redirect to dashboard
          // But if user explicitly navigated here (force=true) or profile needs completion, stay on page
          if (response.data.isComplete && !response.data.needsCompletion && !forceComplete) {
            // Profile is already complete, redirect to dashboard
            router.push("/dashboard");
            return;
          }
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();

    // Pre-fill form with student data from Google
    if (student) {
      setFormData(prev => ({
        ...prev,
        fullName: student.fullName || "",
        email: student.email || "",
        phone: student.phone || "",
        countryCode: student.countryCode || "+1",
        street: student.address?.street || "",
        city: student.address?.city || "",
        state: student.address?.state || "",
        postalCode: student.address?.postalCode || "",
        country: student.address?.country || "USA",
      }));
      
      // Check if phone is already verified
      if (student.phone && student.isPhoneVerified) {
        setIsPhoneVerified(true);
        setPhoneVerificationStep(2);
      }
    }
    
    // Cleanup recaptcha on unmount
    return () => {
      cleanupRecaptcha();
    };
  }, [student, isAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    
    // Reset phone verification if phone number changes
    if (name === 'phone' || name === 'countryCode') {
      if (phoneVerificationStep > 0) {
        setPhoneVerificationStep(0);
        setIsPhoneVerified(false);
        setConfirmationResult(null);
        setVerificationCode("");
        cleanupRecaptcha();
      }
    }
  };

  // Handle phone verification - Send OTP
  const handleSendPhoneOTP = async () => {
    setErrors({});
    setPhoneVerificationLoading(true);

    try {
      // Clean up any existing recaptcha before creating a new one
      cleanupRecaptcha();

      // Validate phone number
      if (!formData.phone || !formData.phone.trim()) {
        setErrors({ phone: "Phone number is required" });
        showError('Validation Error', 'Please enter a phone number');
        setPhoneVerificationLoading(false);
        return;
      }

      if (!/^\d{6,15}$/.test(formData.phone.trim())) {
        setErrors({ phone: "Phone number must be 6-15 digits" });
        showError('Validation Error', 'Phone number must be 6-15 digits');
        setPhoneVerificationLoading(false);
        return;
      }

      // Format phone number (remove spaces, dashes, etc.)
      const cleanPhone = formData.phone.replace(/\s|-|\(|\)/g, '');

      // Send verification code using Firebase
      const result = await sendPhoneVerificationCode(cleanPhone, formData.countryCode);
      
      if (result.success) {
        setConfirmationResult(result.confirmationResult);
        setPhoneVerificationStep(1);
        showSuccess('Code Sent!', 'Verification code has been sent to your phone number.');
      } else {
        throw new Error('Failed to send verification code');
      }
    } catch (error) {
      console.error('Error sending phone verification code:', error);
      // Clean up on error
      cleanupRecaptcha();
      
      let errorMessage = 'Failed to send verification code. Please try again.';
      
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid phone number format. Please check and try again.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = 'reCAPTCHA verification failed. Please try again.';
      } else if (error.message?.includes('already been rendered')) {
        errorMessage = 'Please wait a moment and try again.';
        // Force cleanup and retry after a short delay
        cleanupRecaptcha();
        setTimeout(() => {
          cleanupRecaptcha();
        }, 1000);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ phone: errorMessage });
      showError('Error', errorMessage);
    } finally {
      setPhoneVerificationLoading(false);
    }
  };

  // Handle phone verification - Verify OTP
  const handleVerifyPhoneOTP = async () => {
    setErrors({});
    setPhoneVerificationLoading(true);

    try {
      if (!verificationCode || verificationCode.length !== 6) {
        setErrors({ verificationCode: "Please enter a valid 6-digit verification code" });
        showError('Validation Error', 'Please enter a valid 6-digit verification code');
        return;
      }

      // Verify code using Firebase
      const verifyResult = await verifyPhoneCode(confirmationResult, verificationCode);
      
      if (verifyResult.success && verifyResult.idToken) {
        // Get phone number from Firebase result (format: +1234567890)
        const firebasePhoneNumber = verifyResult.phoneNumber;
        
        // Extract phone number without country code for backend
        // Firebase provides full number with country code
        const cleanPhone = formData.phone.trim().replace(/\D/g, '');
        
        // Send to backend to verify and save to student record
        const backendResult = await verifyPhoneNumber(verifyResult.idToken, cleanPhone, formData.countryCode);
        
        if (backendResult.success) {
          // Update form data with verified phone number from backend
          const verifiedPhone = backendResult.data?.student?.phone || cleanPhone;
          const verifiedCountryCode = backendResult.data?.student?.countryCode || formData.countryCode;
          
          setIsPhoneVerified(true);
          setPhoneVerificationStep(2);
          setFormData(prev => ({
            ...prev,
            phone: verifiedPhone,
            countryCode: verifiedCountryCode
          }));
          showSuccess('Phone Verified!', 'Your phone number has been verified successfully.');
          cleanupRecaptcha();
        } else {
          throw new Error(backendResult.message || 'Failed to verify phone number on server');
        }
      } else {
        throw new Error('Failed to verify code');
      }
    } catch (error) {
      console.error('Error verifying phone code:', error);
      let errorMessage = 'Invalid verification code. Please try again.';
      
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = 'Invalid verification code. Please check and try again.';
      } else if (error.code === 'auth/code-expired') {
        errorMessage = 'Verification code has expired. Please request a new code.';
      } else if (error.code === 'auth/session-expired') {
        errorMessage = 'Session expired. Please request a new verification code.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ verificationCode: errorMessage });
      showError('Verification Failed', errorMessage);
    } finally {
      setPhoneVerificationLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    setPhoneVerificationStep(0);
    setVerificationCode("");
    setConfirmationResult(null);
    cleanupRecaptcha();
    await handleSendPhoneOTP();
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName || !formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone number must be verified before completing profile
    if (!isPhoneVerified) {
      newErrors.phone = "Phone number must be verified before completing profile";
      showError('Phone Verification Required', 'Please verify your phone number first');
      return false;
    }
    
    if (!formData.countryCode || !formData.countryCode.trim()) {
      newErrors.countryCode = "Country code is required";
    }
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{6,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be 6-15 digits";
    }
    
    // Address validation
    if (!formData.street || !formData.street.trim()) {
      newErrors.street = "Street address is required";
    }
    if (!formData.city || !formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state || !formData.state.trim()) {
      newErrors.state = "State/Province is required";
    }
    if (!formData.postalCode || !formData.postalCode.trim()) {
      newErrors.postalCode = "Postal/ZIP code is required";
    }
    if (!formData.country || !formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure phone is verified before submitting
    if (!isPhoneVerified) {
      showError('Phone Verification Required', 'Please verify your phone number before completing your profile');
      // Scroll to phone verification section
      const phoneSection = document.getElementById('phone-verification-section');
      if (phoneSection) {
        phoneSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    if (!validateForm()) {
      showError('Validation Error', 'Please fill all required fields correctly');
      return;
    }

    setSubmitting(true);

    try {
      // Phone should already be verified, so we don't need to send it again
      // But we send countryCode in case it needs to be updated
      const profileData = {
        fullName: formData.fullName.trim(),
        countryCode: formData.countryCode.trim(), // Update country code if changed
        address: {
          street: formData.street.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          postalCode: formData.postalCode.trim(),
          country: formData.country.trim(),
        }
      };

      const response = await completeProfile(profileData);
      
      if (response.success) {
        showSuccess('Profile Completed!', 'Your profile has been completed successfully. Redirecting to dashboard...');
        
        // Cleanup recaptcha before redirecting
        cleanupRecaptcha();
        
        // Refresh student data and redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        throw new Error(response.message || "Failed to complete profile");
      }
    } catch (error) {
      console.error("Error completing profile:", error);
      showError('Error', error.message || "Failed to complete profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
            <User className="h-8 w-8 text-blue-950" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h2>
          <p className="text-blue-200">
            Please provide the following information to complete your registration
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.fullName ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="Enter full name"
                  />
                </div>
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled
                    value={formData.email}
                    className="block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/10 text-white/70 placeholder-blue-300 border-white/20 cursor-not-allowed"
                    placeholder="Email (from Google)"
                  />
                </div>
                <p className="text-blue-300 text-xs mt-1">Email cannot be changed</p>
              </div>
            </div>

            {/* Phone Number Verification */}
            <div id="phone-verification-section" className="space-y-4">
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number <span className="text-red-400">*</span>
                {isPhoneVerified && (
                  <span className="ml-2 inline-flex items-center gap-1 text-green-400 text-xs font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </label>
              
              {/* Phone Number Input */}
              <div className="flex gap-2">
                <CountryCodeSelector
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  disabled={isPhoneVerified || countryCodesLoading || countryCodes.length === 0}
                  error={!!errors.countryCode}
                  countryCodes={countryCodes}
                  loading={countryCodesLoading}
                  className="w-32"
                  size="md"
                />
                <div className="relative flex-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    disabled={isPhoneVerified}
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setFormData(prev => ({
                        ...prev,
                        phone: value
                      }));
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                      
                      // Reset phone verification if phone number changes
                      if (phoneVerificationStep > 0) {
                        setPhoneVerificationStep(0);
                        setIsPhoneVerified(false);
                        setConfirmationResult(null);
                        setVerificationCode("");
                        cleanupRecaptcha();
                      }
                    }}
                    className={`block w-full px-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.phone ? "border-red-500" : "border-white/30"
                    } ${isPhoneVerified ? "opacity-60 cursor-not-allowed" : ""}`}
                    placeholder="Enter phone number"
                    maxLength={15}
                    pattern="[0-9]{6,15}"
                    title="Phone number must be 6-15 digits"
                  />
                </div>
              </div>
              {errors.countryCode && <p className="text-red-400 text-sm mt-1">{errors.countryCode}</p>}
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              
              {/* Phone Verification Steps */}
              {!isPhoneVerified && (
                <div className="space-y-3">
                  {/* Step 1: Send OTP */}
                  {phoneVerificationStep === 0 && (
                    <motion.button
                      type="button"
                      onClick={handleSendPhoneOTP}
                      disabled={phoneVerificationLoading || !formData.phone || !/^\d{6,15}$/.test(formData.phone.trim())}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-white/30 rounded-xl text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {phoneVerificationLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending Code...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          Verify Phone Number
                        </>
                      )}
                    </motion.button>
                  )}
                  
                  {/* Step 2: Enter OTP */}
                  {phoneVerificationStep === 1 && (
                    <div className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/20">
                      <p className="text-sm text-blue-200 text-center">
                        Enter the 6-digit code sent to {formData.countryCode} {formData.phone}
                      </p>
                      <div className="relative">
                        <input
                          id="verificationCode"
                          type="text"
                          value={verificationCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').substring(0, 6);
                            setVerificationCode(value);
                            if (errors.verificationCode) setErrors(prev => ({ ...prev, verificationCode: "" }));
                          }}
                          className={`block w-full px-4 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-center text-2xl tracking-widest font-mono ${
                            errors.verificationCode ? "border-red-500" : "border-white/30"
                          }`}
                          placeholder="000000"
                          maxLength={6}
                          autoFocus
                          required
                        />
                      </div>
                      {errors.verificationCode && <p className="text-red-400 text-sm text-center">{errors.verificationCode}</p>}
                      
                      <div className="flex gap-2">
                        <motion.button
                          type="button"
                          onClick={handleVerifyPhoneOTP}
                          disabled={phoneVerificationLoading || verificationCode.length !== 6}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-xl text-sm font-medium text-blue-950 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {phoneVerificationLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Verify Code
                            </>
                          )}
                        </motion.button>
                        
                        <motion.button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={phoneVerificationLoading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 border border-white/30 rounded-xl text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          Resend
                        </motion.button>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneVerificationStep(0);
                          setVerificationCode("");
                          setConfirmationResult(null);
                          cleanupRecaptcha();
                        }}
                        className="w-full text-center text-sm text-blue-300 hover:text-white transition-colors"
                      >
                        Change Phone Number
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Recaptcha Container (hidden) */}
              <div id="recaptcha-container-phone-verification"></div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white mb-2">
                Address <span className="text-red-400">*</span>
              </label>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.street ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="Street Address"
                  />
                </div>
                {errors.street && <p className="text-red-400 text-sm mt-1">{errors.street}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.city ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="City"
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.state ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="State/Province"
                  />
                  {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.postalCode ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="Postal/ZIP Code"
                  />
                  {errors.postalCode && <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>}
                </div>

                <div>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all appearance-none ${
                      errors.country ? "border-red-500" : "border-white/30"
                    }`}
                  >
                    <option value="USA" className="text-gray-900">United States</option>
                    <option value="India" className="text-gray-900">India</option>
                    <option value="UK" className="text-gray-900">United Kingdom</option>
                    <option value="Canada" className="text-gray-900">Canada</option>
                    <option value="Australia" className="text-gray-900">Australia</option>
                    <option value="Germany" className="text-gray-900">Germany</option>
                    <option value="France" className="text-gray-900">France</option>
                    <option value="Other" className="text-gray-900">Other</option>
                  </select>
                  {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting || !isPhoneVerified}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-blue-950 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title={!isPhoneVerified ? "Please verify your phone number first" : ""}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Completing Profile...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  {isPhoneVerified ? 'Complete Profile' : 'Verify Phone to Continue'}
                  {isPhoneVerified && <ArrowRight className="h-5 w-5" />}
                </>
              )}
            </motion.button>
            
            {!isPhoneVerified && (
              <p className="text-center text-sm text-yellow-400">
                <AlertCircle className="inline w-4 h-4 mr-1" />
                Phone verification is required before completing your profile
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}

