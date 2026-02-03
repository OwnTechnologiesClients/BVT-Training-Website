"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle, ArrowLeft, Loader2, Lock, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { showSuccess, showError } from "@/lib/utils/sweetalert";
import { getStudentProfile } from "@/lib/api/student";

const BillingPage = ({ 
  type, // 'course' or 'event'
  item, // Course or event data
  onComplete, // Callback after successful purchase/registration
  onCancel // Callback to go back
}) => {
  const router = useRouter();
  const { student, isAuthenticated } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    billingAddress: "",
    city: "",
    zipCode: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (formatted.replace(/\s/g, "").length <= 16) {
        setFormData(prev => ({ ...prev, [name]: formatted }));
      }
      return;
    }
    
    // Format expiry date MM/YY
    if (name === "expiryDate") {
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").substring(0, 5);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Format CVV (3-4 digits only)
    if (name === "cvv") {
      const formatted = value.replace(/\D/g, "").substring(0, 4);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check phone verification before proceeding with payment
    if (!isAuthenticated) {
      showError('Authentication Required', 'Please log in to continue.');
      router.push('/login');
      return;
    }

    try {
      const profileResponse = await getStudentProfile();
      const studentData = profileResponse?.data?.student;
      const phoneVerified = !!(studentData?.phone && studentData?.isPhoneVerified);

      if (!phoneVerified) {
        showError('Verify Phone Number', 'Please verify your mobile number in your profile before purchasing or registering.');
        router.push('/profile');
        return;
      }
    } catch (err) {
      console.error('Error checking phone verification before billing:', err);
      showError('Error', 'Unable to verify your profile at the moment. Please try again.');
      return;
    }

    // Validation
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length !== 16) {
      showError('Validation Error', 'Please enter a valid 16-digit card number');
      return;
    }
    
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      showError('Validation Error', 'Please enter a valid expiry date (MM/YY)');
      return;
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      showError('Validation Error', 'Please enter a valid CVV');
      return;
    }
    
    if (!formData.cardName) {
      showError('Validation Error', 'Please enter cardholder name');
      return;
    }

    setProcessing(true);

    try {
      // Simulate payment processing (for testing, we'll just proceed)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Call onComplete callback which will handle the actual enrollment/registration
      if (onComplete) {
        await onComplete();
      }
      
      showSuccess(
        type === 'course' ? 'Course Purchased!' : 'Event Registered!',
        type === 'course' 
          ? 'You have successfully purchased the course. You can now access it from your dashboard.'
          : 'You have successfully registered for the event. You can view it in your dashboard.'
      );
    } catch (error) {
      console.error('Payment processing error:', error);
      showError('Payment Failed', error.message || 'An error occurred during payment processing');
    } finally {
      setProcessing(false);
    }
  };

  const price = item?.price || item?.cost || 0;
  const title = item?.title || (type === 'course' ? 'Course' : 'Event');
  const itemType = type === 'course' ? 'Course' : 'Event';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={onCancel || (() => router.back())}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="text-gray-600 mt-2">Please provide your payment information to continue</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{itemType}</p>
                  <p className="font-semibold text-gray-900">{title}</p>
                </div>

                {type === 'event' && item?.startDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(item.startDate).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2 gap-2 min-w-0">
                    <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
                    <span className="font-semibold text-sm sm:text-base truncate">${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <span className="text-sm sm:text-base text-gray-600">Processing Fee</span>
                    <span className="font-semibold text-sm sm:text-base">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between items-center gap-2 min-w-0">
                      <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 truncate">${price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Lock className="w-4 h-4 text-green-600" />
                <span>Secure payment processing</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
              {/* Card Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={5}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Billing Address</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onCancel || (() => router.back())}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  disabled={processing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Complete Purchase
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;

