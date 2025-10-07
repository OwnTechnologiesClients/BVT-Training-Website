import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-navy-900 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-yellow-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-600/30">
              <Mail className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
                Get In Touch
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Contact <span className="text-yellow-500">Our Team</span> Today
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions about our training programs or need assistance? Our dedicated team 
              is here to help you succeed in your naval career journey.
            </p>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {[
                { icon: Phone, value: "+1 (555) 123-4567", label: "Phone Support" },
                { icon: Mail, value: "info@navytraining.com", label: "Email Support" },
                { icon: MapPin, value: "Naval Base", label: "Main Location" },
                { icon: Clock, value: "24/7", label: "Support Hours" }
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <Icon className="w-6 h-6 text-yellow-500 mb-2 mx-auto" />
                      <div className="text-lg font-semibold text-white">{contact.value}</div>
                      <div className="text-sm text-blue-200">{contact.label}</div>
                    </div>
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


