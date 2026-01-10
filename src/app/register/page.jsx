"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Shield, ArrowRight, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { sendVerificationOTP, verifyEmailAndRegister, resendVerificationOTP } from "@/lib/api/password";
import { useAuth } from "@/context/AuthContext";
import { showSuccess, showError } from "@/lib/utils/sweetalert";
import CountryCodeSelector from "@/components/common/CountryCodeSelector";
// Country codes will be loaded dynamically in useEffect

export default function RegisterPage() {
  const router = useRouter();
  const { loginWithGoogle, isAuthenticated, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1); // 1: Fill all fields, 2: OTP verification
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+1",
    phone: "",
    password: "",
    confirmPassword: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
    agreeToTerms: false,
  });
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(0);
  const [countryCodes, setCountryCodes] = useState([]);
  const [countryCodesLoading, setCountryCodesLoading] = useState(true);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

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
              // Log first country to see actual structure
              console.log('Sample country object from package:', countries[0]);
              console.log('All keys in country object:', countries[0] ? Object.keys(countries[0]) : 'no countries');
              
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
              
              // The package structure should be: { name, dial_code, code, flag }
              // Map all countries with their fields directly - check ALL possible fields
              const allCountries = countries
                .map((country, index) => {
                  // Extract ALL fields - check every possible variation
                  const dialCode = country.dial_code || country.dialCode || '';
                  const code = dialCode ? (dialCode.toString().startsWith('+') ? dialCode.toString() : `+${dialCode}`) : '';
                  const countryName = country.name || country.countryName || '';
                  const countryCode = country.code || country.countryCode || country.iso2 || country.iso || '';
                  
                  // Check ALL possible flag field names - the package might use any of these
                  const flag = country.flag || 
                               country.flagEmoji || 
                               country.emoji || 
                               country.flag_emoji || 
                               country.flagEmojiUnicode ||
                               country.unicode ||
                               '';
                  
                  // Debug log for first few countries to see actual structure
                  if (index < 3) {
                    console.log(`Country ${index}:`, {
                      name: countryName,
                      dial_code: dialCode,
                      code: countryCode,
                      flag_found: flag,
                      flag_type: typeof flag,
                      flag_length: flag?.length,
                      all_keys: Object.keys(country),
                      raw_country: country
                    });
                  }
                  
                  // Use package flag, or generate from country code if available
                  let finalFlag = flag;
                  if (!finalFlag && countryCode && countryCode.length === 2) {
                    finalFlag = getFlagEmoji(countryCode);
                  }
                  
                  return {
                    id: `${code}-${countryCode || index}`, // Unique ID combining dial code and country code
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
              
              console.log('Formatted countries sample (first 5):', formattedCountries.slice(0, 5));
              console.log('Sample formatted country:', formattedCountries[0]);
              console.log('Total formatted countries:', formattedCountries.length);
              console.log('Countries with flags:', formattedCountries.filter(c => c.flag).length);
              console.log('Countries without flags:', formattedCountries.filter(c => !c.flag).slice(0, 5));
            
              if (formattedCountries.length > 0) {
                setCountryCodes(formattedCountries);
                setCountryCodesLoading(false);
                // Set default country code if not already set
                if (!formData.countryCode || formData.countryCode === '+1') {
                  const defaultCode = formattedCountries.find(c => c.code === '+1') || formattedCountries[0];
                  if (defaultCode) {
                    setFormData(prev => ({ ...prev, countryCode: defaultCode.code }));
                  }
                }
              } else {
                console.error('No formatted country codes found. Sample country object:', countries[0]);
                setCountryCodesLoading(false);
              }
            } else {
              console.error('Invalid countries data from getAll(). Type:', typeof countries, 'Is Array:', Array.isArray(countries), 'Length:', countries?.length);
              setCountryCodesLoading(false);
            }
          } else {
            console.error('CountryList.getAll is not a function. Available methods:', Object.keys(CountryList || {}));
            setCountryCodesLoading(false);
          }
        } catch (error) {
          console.error('Error loading country codes:', error);
          console.error('Error stack:', error.stack);
          setCountryCodesLoading(false);
        }
      };

      loadCountries();
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError("");
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName || !formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = "Please enter your full name (first and last name)";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone number is mandatory for email registration
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
      newErrors.state = "State is required";
    }
    if (!formData.postalCode || !formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Please agree to terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const newErrors = {};
    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "OTP must be a 6-digit number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1: Validate form and send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      showError('Validation Error', 'Please fill all required fields correctly');
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendVerificationOTP(formData.email);
      if (response.success) {
        showSuccess('OTP Sent', 'Please check your email for the verification code');
        setStep(2);
        setCountdown(60);
      } else {
        const errorMsg = response.message || "Failed to send OTP";
        setError(errorMsg);
        showError('Error', errorMsg);
      }
    } catch (err) {
      const errorMsg = err.message || "Failed to send OTP. Please try again.";
      setError(errorMsg);
      showError('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setError("");
    setIsLoading(true);
    
    try {
      const response = await resendVerificationOTP(formData.email);
      if (response.success) {
        showSuccess('OTP Sent', 'A new verification code has been sent to your email');
        setCountdown(60);
      } else {
        const errorMsg = response.message || "Failed to resend OTP";
        setError(errorMsg);
        showError('Error', errorMsg);
      }
    } catch (err) {
      const errorMsg = err.message || "Failed to resend OTP";
      setError(errorMsg);
      showError('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and complete registration
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateOTP()) return;

    setIsLoading(true);
    try {
      const registrationData = {
        email: formData.email,
        otp: otp,
        password: formData.password,
        fullName: formData.fullName.trim(),
        phone: formData.phone ? formData.phone.trim() : undefined,
        countryCode: formData.countryCode || undefined,
        address: {
          street: formData.street?.trim() || undefined,
          city: formData.city?.trim() || undefined,
          state: formData.state?.trim() || undefined,
          postalCode: formData.postalCode?.trim() || undefined,
          country: formData.country || "USA"
        },
      };

      const response = await verifyEmailAndRegister(registrationData);
      
      if (response.success) {
        showSuccess('Registration Successful!', 'Your account has been created. Redirecting to login...');
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        const errorMsg = response.message || "Registration failed. Please try again.";
        setError(errorMsg);
        showError('Registration Failed', errorMsg);
      }
    } catch (err) {
      const errorMsg = err.message || "An error occurred during registration.";
      setError(errorMsg);
      showError('Registration Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setIsGoogleLoading(true);
    
    try {
      const result = await loginWithGoogle();
      
      if (result.success) {
        // Check if profile needs completion
        try {
          const { checkProfileCompletion } = await import("@/lib/api/student");
          const profileCheck = await checkProfileCompletion();
          
          if (profileCheck.success && profileCheck.data && profileCheck.data.needsCompletion) {
            // Profile needs completion, redirect to complete profile page
            showSuccess('Account Created!', 'Please complete your profile to continue.');
            setTimeout(() => {
              router.push("/complete-profile");
            }, 1000);
          } else {
            // Profile is complete, redirect to dashboard
            showSuccess('Registration Successful!', 'Welcome! Your account has been created.');
            setTimeout(() => {
              router.push("/dashboard");
            }, 1500);
          }
        } catch (profileError) {
          // If profile check fails, still redirect to complete profile as fallback
          console.error('Error checking profile:', profileError);
          showSuccess('Account Created!', 'Please complete your profile to continue.');
          setTimeout(() => {
            router.push("/complete-profile");
          }, 1000);
        }
      } else {
        const errorMsg = result.error || "Google registration failed. Please try again.";
        setError(errorMsg);
        showError('Google Registration Failed', errorMsg);
      }
    } catch (err) {
      const errorMsg = err.message || "An error occurred during Google registration. Please try again.";
      setError(errorMsg);
      showError('Google Registration Error', errorMsg);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  // Don't render if already authenticated (will redirect)
  if (isAuthenticated) {
    return null;
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
          <h2 className="text-3xl font-bold text-white mb-2">Join Our BVT Community</h2>
          <p className="text-blue-200">
            {step === 1 ? "Create your account and start your training journey" : "Verify your email to complete registration"}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          {[1, 2].map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s
                    ? "bg-yellow-500 text-blue-950"
                    : "bg-white/20 text-white/60"
                }`}
              >
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {index < 1 && (
                <div
                  className={`w-20 h-1 mx-2 transition-colors ${
                    step > s ? "bg-yellow-500" : "bg-white/20"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step Labels */}
        <div className="flex justify-center gap-16 text-sm">
          <span className={step >= 1 ? "text-yellow-400" : "text-white/40"}>Fill Details</span>
          <span className={step >= 2 ? "text-yellow-400" : "text-white/40"}>Verify Email</span>
        </div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-sm text-red-200 mb-6">
              {error}
            </div>
          )}

          {/* Step 1: Fill All Details */}
          {step === 1 && (
            <div className="space-y-6">
            {/* Google Register Button - Shown at top */}
            <div>
              <motion.button
                type="button"
                onClick={handleGoogleRegister}
                disabled={isLoading || isGoogleLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-white/30 rounded-xl shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isGoogleLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Registering with Google...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Register with Google
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-blue-200">Or register with email</span>
                </div>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSendOTP}>
              {/* Personal Information - Name and Email in same row */}
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
                      placeholder="Enter your name"
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
                      <Mail className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                        errors.email ? "border-red-500" : "border-white/30"
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-3">
                  <CountryCodeSelector
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    disabled={countryCodesLoading || countryCodes.length === 0}
                    error={!!errors.countryCode}
                    countryCodes={countryCodes}
                    loading={countryCodesLoading}
                    className="w-44"
                    size="md"
                  />
                  <div className="relative flex-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData(prev => ({
                          ...prev,
                          phone: value
                        }));
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                      }}
                      className={`block w-full px-4 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                        errors.phone ? "border-red-500" : "border-white/30"
                      }`}
                      placeholder="Enter phone number"
                      maxLength={15}
                      pattern="[0-9]{6,15}"
                      title="Phone number must be 6-15 digits"
                    />
                  </div>
                </div>
                {errors.countryCode && <p className="text-red-400 text-sm mt-1">{errors.countryCode}</p>}
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
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

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-12 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                        errors.password ? "border-red-500" : "border-white/30"
                      }`}
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-12 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                        errors.confirmPassword ? "border-red-500" : "border-white/30"
                      }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 mt-1 text-yellow-600 focus:ring-yellow-500 border-white/30 rounded bg-white/5"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-blue-200">
                  I agree to the{" "}
                  <Link href="/terms" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-400 text-sm">{errors.agreeToTerms}</p>}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-blue-950 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-950"></div>
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Continue & Verify Email
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </motion.button>
            </form>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyAndRegister} className="space-y-6">
              {/* Email Display */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                <p className="text-green-300 text-sm">
                  <span className="font-medium">Verification code sent to:</span> {formData.email}
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-white mb-2">
                  Enter Verification Code
                </label>
                <div className="relative">
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                      if (errors.otp) setErrors(prev => ({ ...prev, otp: "" }));
                    }}
                    className={`block w-full px-4 py-4 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-center text-3xl tracking-[0.5em] font-mono ${
                      errors.otp ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="000000"
                    maxLength={6}
                    autoFocus
                    required
                  />
                  {countdown > 0 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-yellow-400 font-medium">
                      {formatTime(countdown)}
                    </div>
                  )}
                </div>
                {errors.otp && (
                  <p className="text-red-400 text-sm mt-1">{errors.otp}</p>
                )}
              </div>

              {/* Verify Button */}
              <motion.button
                type="submit"
                disabled={isLoading || isGoogleLoading || otp.length !== 6}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-blue-950 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-950"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Verify & Create Account
                  </>
                )}
              </motion.button>

              {/* Resend OTP */}
              <div className="text-center">
                {countdown === 0 ? (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
                    disabled={isLoading}
                  >
                    Didn't receive code? Resend OTP
                  </button>
                ) : (
                  <p className="text-blue-200 text-sm">
                    Resend OTP in {formatTime(countdown)}
                  </p>
                )}
              </div>

              {/* Change Email */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-blue-300 hover:text-white text-sm transition-colors"
                >
                  ← Back to edit details
                </button>
              </div>
            </form>
          )}

        </motion.div>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-blue-200">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
