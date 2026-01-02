"use client";

import { motion } from "framer-motion";
import { Award, Sparkles, Shield, Building2, CheckCircle2 } from "lucide-react";

const COMPANIES = [
  {
    name: "US Navy",
    logo: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=150&h=80&fit=crop",
    fallback: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=US+Navy"
  },
  {
    name: "BVT Academy",
    logo: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=150&h=80&fit=crop",
    fallback: "https://via.placeholder.com/150x80/1e40af/ffffff?text=BVT+Academy"
  },
  {
    name: "Fleet Command",
    logo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=80&fit=crop",
    fallback: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=Fleet+Command"
  },
  {
    name: "Coast Guard",
    logo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=80&fit=crop",
    fallback: "https://via.placeholder.com/150x80/1e40af/ffffff?text=Coast+Guard"
  },
  {
    name: "BVT Reserve",
    logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=150&h=80&fit=crop",
    fallback: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=BVT+Reserve"
  },
  {
    name: "Maritime Admin",
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=80&fit=crop",
    fallback: "https://via.placeholder.com/150x80/1e40af/ffffff?text=Maritime+Admin"
  },
];

export default function TrustedCompanies() {
  return (
    <section className="relative py-12 bg-gradient-to-b from-white via-blue-50/50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/10 to-yellow-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border-2 border-yellow-500/30 mb-4 shadow-lg"
          >
            <Shield className="w-4 h-4 text-yellow-600" />
            <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">
              Official Partners
            </span>
            <Sparkles className="w-4 h-4 text-yellow-600 animate-pulse" />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 bg-clip-text text-transparent mb-4">
            Recognized by Leading BVT Organizations
          </h2>
          <p className="text-sm md:text-base text-gray-600 lg:w-6/12 max-w-3xl mx-auto leading-relaxed">
            Trusted and recognized by the most prestigious BVT organizations worldwide. 
            Our training programs meet the highest standards of excellence.
          </p>
        </motion.div>

        {/* Companies Grid - Enhanced Design */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {COMPANIES.map((company, key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ 
                default: { delay: key * 0.1, duration: 0.5, type: "spring" },
                hover: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
              }}
              className="group relative bg-white rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-md hover:shadow-xl cursor-pointer border-[3px] border-gray-400 hover:border-yellow-500 overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/0 via-yellow-200/0 to-blue-200/0 group-hover:from-blue-200/20 group-hover:via-yellow-200/30 group-hover:to-blue-200/20 transition-all duration-500 blur-xl"></div>

              {/* Company Logo Container - Bigger */}
              <div className="relative z-10 flex items-center justify-center h-full min-h-[140px] lg:min-h-[160px] pt-1">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full max-w-[95%] max-h-[95%] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    style={{ 
                      filter: 'grayscale(100%)',
                      transition: 'filter 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(100%)';
                    }}
                    onError={(e) => {
                      if (e.target.src !== company.fallback) {
                        e.target.src = company.fallback;
                      }
                    }}
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Company Name - Always Visible */}
              <div className="absolute bottom-2 left-0 right-0 z-10 text-center">
                <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-200 shadow-md mx-1">
                  <p className="text-[10px] lg:text-xs font-bold text-gray-900">{company.name}</p>
                </div>
              </div>

              {/* Verified Badge - Top Right - Smaller */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: key * 0.1 + 0.3, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-1 right-1 z-10"
              >
                <div className="w-4 h-4 lg:w-4.5 lg:h-4.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full border border-white shadow-md flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" />
                </div>
              </motion.div>

              {/* Shine Effect on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none overflow-hidden"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                ></motion.div>
              </motion.div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-400/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-yellow-400/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-5 lg:gap-6"
        >
          {[
            { icon: Award, text: "Certified Training", color: "from-blue-600 to-blue-700" },
            { icon: Shield, text: "Trusted Partner", color: "from-yellow-600 to-yellow-700" },
            { icon: Building2, text: "6+ Organizations", color: "from-green-600 to-green-700" }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border-2 border-gray-200 shadow-lg"
              >
                <div className={`bg-gradient-to-r ${item.color} p-2.5 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-900">{item.text}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
