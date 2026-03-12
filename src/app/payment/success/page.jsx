"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Loader2, Home, BookOpen } from 'lucide-react';
import { showSuccess } from '@/lib/utils/sweetalert';

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Small delay to let the webhook process
      const timer = setTimeout(() => {
        setLoading(false);
        showSuccess('Payment Successful!', 'Your transaction was completed successfully. Your dashboard has been updated.');
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      router.push('/');
    }
  }, [sessionId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Verifying your payment...</h2>
          <p className="text-gray-500 mt-2">Please wait while we confirm your transaction.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10 text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Payment Received!</h1>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Thank you for your purchase. Your payment was processed successfully and your access has been granted.
        </p>

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group"
          >
            Go to My Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/courses"
              className="py-3 px-4 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Browse More
            </Link>
            <Link
              href="/"
              className="py-3 px-4 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-50 text-xs text-gray-400 font-medium">
          Transaction ID: <span className="font-mono">{sessionId?.substring(0, 20)}...</span>
        </div>
      </motion.div>
    </div>
  );
};

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900">Verifying your payment...</h2>
            <p className="text-gray-500 mt-2">Please wait while we confirm your transaction.</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
