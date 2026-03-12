"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle, ArrowLeft, Loader2, Lock, Calendar, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { showSuccess, showError } from "@/lib/utils/sweetalert";
import { getStudentProfile } from "@/lib/api/student";
import { createCheckoutSession } from "@/lib/api/stripe";

const BillingPage = ({
  type, // 'course' or 'event'
  item, // Course or event data
  onComplete, // Callback for FREE items (if price is 0)
  onCancel // Callback to go back
}) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [processing, setProcessing] = useState(false);

  const handleStripeRedirect = async () => {
    if (!isAuthenticated) {
      showError('Authentication Required', 'Please log in to continue.');
      router.push('/login');
      return;
    }

    setProcessing(true);

    try {
      // 1. Check phone verification
      const profileResponse = await getStudentProfile();
      const studentData = profileResponse?.data?.student;
      const phoneVerified = !!(studentData?.phone && studentData?.isPhoneVerified);

      if (!phoneVerified) {
        showError('Verify Phone Number', 'Please verify your mobile number in your profile before purchasing or registering.');
        router.push('/profile');
        setProcessing(false);
        return;
      }

      // 2. Initiate Stripe Checkout
      const response = await createCheckoutSession(item._id || item.id, type);

      if (response.success && response.url) {
        // Redirect to Stripe
        window.location.href = response.url;
      } else {
        showError('Checkout Error', response.message || 'Failed to initiate secure checkout session.');
        setProcessing(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      showError('System error', 'Unable to connect to payment gateway. Please try again later.');
      setProcessing(false);
    }
  };

  const price = type === 'course' 
    ? (item?.priceNOK !== undefined && item?.priceNOK !== null ? item.priceNOK : (item?.price ? item.price * 10.5 : 0))
    : (item?.costNOK !== undefined && item?.costNOK !== null ? item.costNOK : (item?.cost ? item.cost * 10.5 : 0));
  const title = item?.title || (type === 'course' ? 'Course' : 'Event');
  const itemType = type === 'course' ? 'Course' : 'Event';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onCancel || (() => router.back())}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Return to {itemType} Details</span>
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
          <p className="text-lg text-gray-600 mt-2">Securely complete your enrollment via Stripe Payment Gateway.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  {item?.image && (
                    <img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">{itemType}</p>
                    <p className="text-base font-bold text-gray-900 leading-tight">{title}</p>
                  </div>
                </div>

                {type === 'event' && item?.startDate && (
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{new Date(item.startDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                  </div>
                )}

                <div className="pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="text-sm">Price</span>
                    <span className="font-semibold text-gray-900">{price.toFixed(2)} NOK</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 pb-2">
                    <span className="text-sm">Taxes & Fees</span>
                    <span className="font-semibold text-gray-900">0.00 NOK</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center bg-blue-50/50 -mx-8 px-8 py-4">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-3xl font-black text-blue-600">{price.toFixed(2)} NOK</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-gray-500 justify-center">
                <Lock className="w-4 h-4 text-green-500" />
                <span>Encrypted secure checkout</span>
              </div>
            </div>
          </motion.div>

          {/* Checkout Action */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-8">
                <CreditCard className="w-10 h-10 text-blue-600" />
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Confirm & Pay</h2>
              <p className="text-gray-600 mb-10 max-w-sm mx-auto leading-relaxed">
                You will be redirected to Stripe to securely enter your payment details and finalize the transaction.
              </p>

              <button
                onClick={handleStripeRedirect}
                disabled={processing}
                className="w-full max-w-sm py-5 px-8 bg-gradient-to-r from-blue-700 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-6"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Preparing Secure Session...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ExternalLink className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;

