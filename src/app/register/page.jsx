"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Shield, ArrowRight, Phone, Briefcase, MapPin, CheckCircle } from "lucide-react";
import { sendVerificationOTP, verifyEmailAndRegister, resendVerificationOTP } from "@/lib/api/password";
import { showSuccess, showError } from "@/lib/utils/sweetalert";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Fill all fields, 2: OTP verification
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    experience: "",
    location: "",
    agreeToTerms: false,
  });
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(0);

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
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.experience) newErrors.experience = "Please select experience level";
    if (!formData.location) newErrors.location = "Please select location";
    
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
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        phone: formData.phone || undefined,
        address: formData.location ? {
          city: formData.location,
          country: "India"
        } : undefined,
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

  const experienceLevels = [
    "Fresh Graduate", "1-2 years", "3-5 years", "6-10 years", "11-15 years", "16-20 years", "20+ years"
  ];

  const locations = [
    "Mumbai", "Delhi", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Pune", "Ahmedabad", "Other"
  ];

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
            <form className="space-y-6" onSubmit={handleSendOTP}>
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                        errors.firstName ? "border-red-500" : "border-white/30"
                      }`}
                      placeholder="Enter first name"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                        errors.lastName ? "border-red-500" : "border-white/30"
                      }`}
                      placeholder="Enter last name"
                    />
                  </div>
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                        errors.phone ? "border-red-500" : "border-white/30"
                      }`}
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* BVT Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-white mb-2">
                    Experience Level
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-blue-300" />
                    </div>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all appearance-none ${
                        errors.experience ? "border-red-500" : "border-white/30"
                      }`}
                    >
                      <option value="" className="text-gray-900">Select experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level} className="text-gray-900">{level}</option>
                      ))}
                    </select>
                  </div>
                  {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience}</p>}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                    Preferred Training Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-blue-300" />
                    </div>
                    <select
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all appearance-none ${
                        errors.location ? "border-red-500" : "border-white/30"
                      }`}
                    >
                      <option value="" className="text-gray-900">Select preferred location</option>
                      {locations.map((location) => (
                        <option key={location} value={location} className="text-gray-900">{location}</option>
                      ))}
                    </select>
                  </div>
                  {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
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
                disabled={isLoading}
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
                disabled={isLoading || otp.length !== 6}
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
