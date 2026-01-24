"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Users, Award, BookOpen, Headphones, ArrowRight, Sparkles } from "lucide-react";

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses to your inquiries",
      contact: "Cato.grasdal@gmail.com",
      hours: "Response within 24 hours",
      color: "from-green-500 to-green-600"
    },
  ];


  return (
    <section className="relative py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 lg:mb-10"
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
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Contact Methods</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Multiple Ways to Connect
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the communication method that works best for you. Our team is committed 
              to providing exceptional support for all your training needs.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-5 mb-10">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 text-center overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-2 right-2 w-16 h-16 border border-blue-600 rounded-full"></div>
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                      className={`inline-flex items-center justify-center w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-r ${method.color} rounded-2xl mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 lg:w-9 lg:h-9 text-white" />
                    </motion.div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm lg:text-base mb-4">{method.description}</p>
                    <div className="space-y-2 mb-6">
                      <div className="font-bold text-gray-900 text-base lg:text-lg">{method.contact}</div>
                      <div className="text-sm text-gray-500">{method.hours}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-gradient-to-r ${method.color} text-white py-3 px-4 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2`}
                    >
                      Contact Now
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
