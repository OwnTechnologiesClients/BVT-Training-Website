"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Eye, EyeOff, KeyRound, CheckCircle, Shield } from "lucide-react";
import { sendForgotPasswordOTP, verifyPasswordOTP, resetPassword } from "@/lib/api/password";
import { showSuccess, showError } from "@/lib/utils/sweetalert";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Countdown timer for OTP resend
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

  const validateEmail = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
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

  const validatePassword = () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      const response = await sendForgotPasswordOTP(email);
      if (response.success) {
        setSuccessMessage("OTP sent to your email");
        showSuccess('OTP Sent', 'Please check your email for the verification code');
        setStep(2);
        setCountdown(60);
      } else {
        setErrorMessage(response.message || "Failed to send OTP");
        showError('Error', response.message || "Failed to send OTP");
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to send OTP. Please try again.");
      showError('Error', error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    
    try {
      const response = await sendForgotPasswordOTP(email);
      if (response.success) {
        setSuccessMessage("New OTP sent to your email");
        showSuccess('OTP Sent', 'A new verification code has been sent to your email');
        setCountdown(60);
      } else {
        setErrorMessage(response.message || "Failed to resend OTP");
        showError('Error', response.message || "Failed to resend OTP");
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to resend OTP");
      showError('Error', error.message || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateOTP()) return;

    setIsLoading(true);
    try {
      const response = await verifyPasswordOTP(email, otp);
      if (response.success) {
        setSuccessMessage("OTP verified successfully");
        showSuccess('Verified', 'OTP verified successfully');
        setStep(3);
      } else {
        setErrorMessage(response.message || "Invalid OTP");
        showError('Invalid OTP', response.message || "Please check the code and try again");
      }
    } catch (error) {
      setErrorMessage(error.message || "OTP verification failed");
      showError('Verification Failed', error.message || "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validatePassword()) return;

    setIsLoading(true);
    try {
      const response = await resetPassword(email, newPassword);
      if (response.success) {
        showSuccess('Success!', 'Your password has been reset successfully. Redirecting to login...');
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setErrorMessage(response.message || "Failed to reset password");
        showError('Error', response.message || "Failed to reset password");
      }
    } catch (error) {
      setErrorMessage(error.message || "Failed to reset password");
      showError('Error', error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
            {step === 3 ? (
              <KeyRound className="h-8 w-8 text-blue-950" />
            ) : (
              <Shield className="h-8 w-8 text-blue-950" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Reset Password"}
          </h2>
          <p className="text-blue-200">
            {step === 1 && "Enter your email to receive a verification code"}
            {step === 2 && `Enter the 6-digit code sent to ${email}`}
            {step === 3 && "Create a new password for your account"}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          {[1, 2, 3].map((s, index) => (
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
              {index < 2 && (
                <div
                  className={`w-16 h-1 mx-2 transition-colors ${
                    step > s ? "bg-yellow-500" : "bg-white/20"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-xl">
              <p className="text-green-200 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl">
              <p className="text-red-200 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Step 1: Email Form */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-6">
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
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({});
                    }}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.email ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

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
                  "Send OTP"
                )}
              </motion.button>
            </form>
          )}

          {/* Step 2: OTP Form */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-white mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                      if (errors.otp) setErrors({});
                    }}
                    className={`block w-full px-4 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-center text-2xl tracking-widest ${
                      errors.otp ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                  {countdown > 0 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-yellow-400 font-medium">
                      {formatTime(countdown)}
                    </div>
                  )}
                </div>
                {errors.otp && (
                  <p className="text-red-400 text-sm mt-1">{errors.otp}</p>
                )}
              </div>

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
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </motion.button>

              <div className="text-center">
                {countdown === 0 ? (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-blue-200 text-sm">
                    Resend OTP in {formatTime(countdown)}
                  </p>
                )}
              </div>
            </form>
          )}

          {/* Step 3: New Password Form */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errors.newPassword) setErrors({...errors, newPassword: ""});
                    }}
                    className={`block w-full px-4 py-3 pr-12 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.newPassword ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="Enter new password"
                    required
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
                {errors.newPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({...errors, confirmPassword: ""});
                    }}
                    className={`block w-full px-4 py-3 pr-12 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.confirmPassword ? "border-red-500" : "border-white/30"
                    }`}
                    placeholder="Confirm new password"
                    required
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
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

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
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <KeyRound className="h-5 w-5" />
                    Reset Password
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Back to Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/login"
            className="inline-flex items-center text-blue-200 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

