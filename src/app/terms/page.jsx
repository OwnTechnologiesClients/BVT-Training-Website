"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-blue-900 to-blue-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-400/30">
              <FileText className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Terms and Conditions
              </h1>
              <p className="text-blue-200 mt-1">Last updated: {new Date().toLocaleDateString("en-GB")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg prose-blue max-w-none"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-10 space-y-8 text-gray-700">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the BVT Training website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Use of Services</h2>
                <p>
                  Our training courses, events, and programs are provided for professional development and vocational training. You agree to use the services only for lawful purposes and in accordance with any instructions we provide.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Registration and Accounts</h2>
                <p>
                  When you register, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Payments and Refunds</h2>
                <p>
                  Fees for courses and events are as stated at the time of enrollment. Refund policies for specific programs are outlined on the course or event page. Please contact us for any refund requests.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
                <p>
                  All content on this site, including text, graphics, logos, and course materials, is the property of BVT Training or its licensors and is protected by copyright. You may not reproduce or distribute materials without our written permission.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">6. Contact</h2>
                <p>
                  For questions about these Terms and Conditions, please contact us at{" "}
                  <a href="mailto:Cato.grasdal@gmail.com" className="text-blue-600 hover:underline">
                    Cato.grasdal@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
          <div className="mt-8 text-center">
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
