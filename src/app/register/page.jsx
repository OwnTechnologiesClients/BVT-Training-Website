"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Shield, ArrowRight, Phone, Briefcase, MapPin } from "lucide-react";
import { studentRegister } from "@/lib/api/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    rank: "",
    experience: "",
    location: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    
    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Map form data to backend structure
      const registrationData = {
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        phone: formData.phone || undefined,
        rank: formData.rank || undefined,
        branch: formData.experience || undefined, // Using experience as branch
        address: formData.location ? {
          city: formData.location,
          country: "India" // Default country
        } : undefined,
      };

      const response = await studentRegister(registrationData);
      
      if (response.success) {
        // Show success message and redirect to login
        alert("Registration successful! Please login to continue.");
        router.push("/login");
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const ranks = [
    "Seaman Recruit", "Seaman Apprentice", "Seaman", "Petty Officer 3rd Class",
    "Petty Officer 2nd Class", "Petty Officer 1st Class", "Chief Petty Officer",
    "Senior Chief Petty Officer", "Master Chief Petty Officer", "Warrant Officer",
    "Chief Warrant Officer", "Ensign", "Lieutenant Junior Grade", "Lieutenant",
    "Lieutenant Commander", "Commander", "Captain", "Commodore", "Rear Admiral",
    "Vice Admiral", "Admiral"
  ];

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
          <p className="text-blue-200">Create your account and start your training journey</p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-sm text-red-200">
                {error}
              </div>
            )}

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
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Enter first name"
                  />
                </div>
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
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Enter last name"
                  />
                </div>
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
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
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
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            {/* BVT Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="rank" className="block text-sm font-medium text-white mb-2">
                  BVT Rank
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-blue-300" />
                  </div>
                  <select
                    id="rank"
                    name="rank"
                    required
                    value={formData.rank}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" className="text-gray-900">Select your rank</option>
                    {ranks.map((rank) => (
                      <option key={rank} value={rank} className="text-gray-900">{rank}</option>
                    ))}
                  </select>
                </div>
              </div>

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
                    className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" className="text-gray-900">Select experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level} className="text-gray-900">{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
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
                  className="block w-full pl-10 pr-3 py-3 border border-white/30 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="" className="text-gray-900">Select preferred location</option>
                  {locations.map((location) => (
                    <option key={location} value={location} className="text-gray-900">{location}</option>
                  ))}
                </select>
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
                    className="block w-full pl-10 pr-12 py-3 border border-white/30 rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
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
                    className="block w-full pl-10 pr-12 py-3 border border-white/30 rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
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
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-white/30 rounded bg-white/5"
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>
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
