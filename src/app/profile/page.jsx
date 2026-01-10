"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Loader2, CheckCircle, Edit2, Save, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getStudentProfile, updateStudentProfile } from "@/lib/api/student";
import { cleanupRecaptcha } from "@/lib/firebase";
import { showSuccess, showError } from "@/lib/utils/sweetalert";

export default function ProfilePage() {
  const router = useRouter();
  const { student, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
  const [originalFormData, setOriginalFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await getStudentProfile();
        
        if (response.success && response.data?.student) {
          const studentData = response.data.student;
          const profileData = {
            fullName: studentData.fullName || "",
            email: studentData.email || "",
            countryCode: studentData.countryCode || "+1",
            phone: studentData.phone || "",
            street: studentData.address?.street || "",
            city: studentData.address?.city || "",
            state: studentData.address?.state || "",
            postalCode: studentData.address?.postalCode || "",
            country: studentData.address?.country || "USA",
          };
          
          setFormData(profileData);
          setOriginalFormData(profileData);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        showError('Error', 'Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadProfile();
    }
    
    return () => {
      cleanupRecaptcha();
    };
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
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

  const handleCancel = () => {
    setFormData(originalFormData);
    setIsEditing(false);
    setErrors({});
    cleanupRecaptcha();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    
    if (!validateForm()) {
      showError('Validation Error', 'Please fill all required fields correctly');
      return;
    }

    setSubmitting(true);

    try {
      // Only update fields that can be changed (name and address)
      // Email and phone cannot be changed - they are security-sensitive identifiers
      const profileData = {
        fullName: formData.fullName.trim(),
        address: {
          street: formData.street.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          postalCode: formData.postalCode.trim(),
          country: formData.country.trim(),
        }
      };

      const response = await updateStudentProfile(profileData);
      
      if (response.success) {
        // Reload profile data to get updated student info
        const updatedResponse = await getStudentProfile();
        if (updatedResponse.success && updatedResponse.data?.student) {
          const studentData = updatedResponse.data.student;
          const updatedFormData = {
            fullName: studentData.fullName || "",
            email: studentData.email || "",
            countryCode: studentData.countryCode || "+1",
            phone: studentData.phone || "",
            street: studentData.address?.street || "",
            city: studentData.address?.city || "",
            state: studentData.address?.state || "",
            postalCode: studentData.address?.postalCode || "",
            country: studentData.address?.country || "USA",
          };
          setFormData(updatedFormData);
          setOriginalFormData(updatedFormData);
        }
        
        setIsEditing(false);
        cleanupRecaptcha();
        
        showSuccess('Profile Updated!', 'Your profile has been updated successfully. Page will reload to refresh data.');
        
        // Reload page after a short delay to ensure data is refreshed
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showError('Error', error.message || "Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
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
          <h2 className="text-3xl font-bold text-white mb-2">My Profile</h2>
          <p className="text-blue-200">
            {isEditing ? "Update your profile information" : "View and manage your profile details"}
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
                    disabled={!isEditing}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.fullName ? "border-red-500" : "border-white/30"
                    } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
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
                    placeholder="Email"
                  />
                </div>
                <p className="text-blue-300 text-xs mt-1">Email cannot be changed</p>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number
                {formData.phone && (
                  <span className="ml-2 inline-flex items-center gap-1 text-green-400 text-xs font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </label>
              
              <div className="flex gap-2">
                <div className="relative w-32">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Phone className="h-4 w-4 text-blue-300" />
                  </div>
                  <div className="block w-full pl-8 pr-3 py-3 border rounded-xl bg-white/10 text-white/70 border-white/20 cursor-not-allowed opacity-60">
                    <span className="text-sm font-medium">{formData.countryCode || '+1'}</span>
                  </div>
                </div>
                <div className="relative flex-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    disabled
                    value={formData.phone || 'Not provided'}
                    className="block w-full px-3 py-3 border rounded-xl bg-white/10 text-white/70 placeholder-blue-300 border-white/20 cursor-not-allowed opacity-60"
                    placeholder="Phone number"
                    readOnly
                  />
                </div>
              </div>
              <p className="text-blue-300 text-xs mt-1">Phone number cannot be changed. Contact support if you need to update it.</p>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white mb-2">
                Address
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
                    disabled={!isEditing}
                    value={formData.street}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.street ? "border-red-500" : "border-white/30"
                    } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
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
                    disabled={!isEditing}
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.city ? "border-red-500" : "border-white/30"
                    } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
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
                    disabled={!isEditing}
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.state ? "border-red-500" : "border-white/30"
                    } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
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
                    disabled={!isEditing}
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl bg-white/5 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                      errors.postalCode ? "border-red-500" : "border-white/30"
                    } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
                    placeholder="Postal/ZIP Code"
                  />
                  {errors.postalCode && <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>}
                </div>

                <div>
                  <select
                    id="country"
                    name="country"
                    required
                    disabled={!isEditing}
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all appearance-none ${
                      errors.country ? "border-red-500" : "border-white/30"
                    } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
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

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {!isEditing ? (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-blue-950 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </motion.button>
              ) : (
                <>
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-white/30 rounded-xl text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-blue-950 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

