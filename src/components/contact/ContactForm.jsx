"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { createInquiry } from "@/lib/api/inquiries";
import { showSuccess, showError } from "@/lib/utils/sweetalert";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const inquiries = [
    { value: "general", label: "General Inquiry" },
    { value: "courses", label: "Course Information" },
    { value: "enrollment", label: "Enrollment Support" },
    { value: "technical", label: "Technical Support" },
    { value: "certification", label: "Certification" },
    { value: "events", label: "Events & Workshops" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await createInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        inquiryType: formData.inquiryType,
        message: formData.message
      });

      if (response.success) {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          inquiryType: "general",
        });
        setSubmitStatus('success');
        showSuccess('Message Sent!', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      } else {
        throw new Error(response.message || 'Failed to submit inquiry');
      }
    } catch (error) {
      // Error submitting inquiry
      setSubmitStatus('error');
      showError('Failed to Send Message', error.message || 'Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-blue-950" />
                </div>
              </motion.div>
              <div className="bg-blue-100 px-4 py-2 rounded-full border border-blue-200">
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Contact Form</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Send Us a Message
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Fill out the form below and we'll get back to you as soon as possible. 
              We typically respond within 24 hours.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl lg:rounded-3xl shadow-xl border-2 border-gray-200 p-6 lg:p-8"
          >
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800 font-medium">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800 font-medium">Sorry, there was an error sending your message. Please try again.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all appearance-none bg-white"
                    >
                      {inquiries.map(inquiry => (
                        <option key={inquiry.value} value={inquiry.value}>{inquiry.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all resize-none"
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 shadow-lg ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
