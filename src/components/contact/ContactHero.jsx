"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactHero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative py-10 lg:py-16 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-yellow-500 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  {isMounted && <Sparkles className="w-6 h-6 text-blue-950" />}
                </div>
              </motion.div>
              <div className="bg-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-600/30">
                <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                  Get In Touch
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Contact Our Team
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Today
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions about our training programs or need assistance? Our dedicated team 
              is here to help you succeed in your BVT career journey.
            </p>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pt-8">
              {[
                { icon: Mail, value: "Cato.grasdal@gmail.com", label: "Email Support", color: "from-green-500 to-green-600" },
                { icon: MapPin, value: "Hetlevik, Norway", label: "Main Location", color: "from-yellow-500 to-yellow-600" }
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group relative"
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-4 lg:p-6 border-2 border-white/20 hover:border-yellow-400/50 transition-all shadow-lg">
                      <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                      <div className="text-lg lg:text-xl font-bold text-white mb-1">{contact.value}</div>
                      <div className="text-xs lg:text-sm text-blue-200 font-medium">{contact.label}</div>
                    </div>
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
