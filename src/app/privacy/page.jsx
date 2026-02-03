"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
              <Shield className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Privacy Policy
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
                <p>
                  We collect information you provide when registering (name, email, phone), when enrolling in courses or events, and when you contact us. We may also collect usage data to improve our services.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
                <p>
                  We use your information to deliver training services, process enrollments, send relevant updates, improve our website and courses, and comply with legal obligations. We do not sell your personal data.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or loss. Access to personal data is limited to those who need it to perform their duties.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Your Rights</h2>
                <p>
                  You may request access to, correction of, or deletion of your personal data. You may also object to or restrict certain processing. To exercise these rights, contact us using the details below.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies and Tracking</h2>
                <p>
                  Our website may use cookies and similar technologies to improve functionality and user experience. You can adjust your browser settings to manage cookies.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">6. Contact</h2>
                <p>
                  For privacy-related questions or requests, please contact us at{" "}
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
              href="/terms"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View Terms and Conditions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
