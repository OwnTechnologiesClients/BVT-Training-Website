"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, Home, ShoppingCart, RefreshCw } from 'lucide-react';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10 text-center"
      >
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-200">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Payment Cancelled</h1>
        <p className="text-gray-600 mb-10 leading-relaxed">
          The transaction was not completed. If you experienced any issues or have questions, please contact our support team.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => window.history.back()}
            className="w-full py-4 px-6 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-200 group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/courses"
              className="py-3 px-4 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Store
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

        <p className="mt-10 text-sm text-gray-400">
          No charges were made to your account.
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentCancelPage;
