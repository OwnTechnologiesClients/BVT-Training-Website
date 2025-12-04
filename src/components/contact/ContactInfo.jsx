"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Users, Award, BookOpen, Headphones, ArrowRight, Sparkles } from "lucide-react";

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our training specialists",
      contact: "+1 (555) 123-4567",
      hours: "Mon-Fri: 8AM-6PM EST",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses to your inquiries",
      contact: "info@navytraining.com",
      hours: "Response within 24 hours",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      title: "Live Chat",
      description: "Instant support during business hours",
      contact: "Chat with us now",
      hours: "Mon-Fri: 9AM-5PM EST",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Headphones,
      title: "Emergency Support",
      description: "24/7 urgent training support",
      contact: "+1 (555) 911-TRAIN",
      hours: "Available 24/7",
      color: "from-red-500 to-red-600"
    }
  ];

  const departments = [
    {
      icon: BookOpen,
      title: "Program Information",
      description: "Questions about courses, schedules, and enrollment",
      contact: "programs@navytraining.com",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Award,
      title: "Certification Support",
      description: "Help with certifications and credentials",
      contact: "certifications@navytraining.com",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Technical Support",
      description: "Platform issues and technical assistance",
      contact: "support@navytraining.com",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Career Counseling",
      description: "Personalized career guidance and advice",
      contact: "counseling@navytraining.com",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
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
            className="text-center mb-12 lg:mb-16"
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
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

          {/* Department Contacts */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl lg:rounded-3xl p-8 lg:p-12 border-2 border-blue-200 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Department Contacts
              </h3>
              <p className="text-gray-600 text-base lg:text-lg">
                Get specialized support from the right department for faster assistance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group bg-white rounded-xl lg:rounded-2xl p-6 shadow-md border-2 border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.3 }}
                        className={`inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${dept.color} rounded-xl shadow-lg flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{dept.title}</h4>
                        <p className="text-gray-600 text-sm lg:text-base mb-3">{dept.description}</p>
                        <div className="text-blue-900 font-bold text-sm lg:text-base">{dept.contact}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Office Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border-2 border-yellow-400/30">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6">Office Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-lg lg:text-xl font-bold mb-2">Monday - Friday</div>
                    <div className="text-blue-100">8:00 AM - 6:00 PM EST</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-lg lg:text-xl font-bold mb-2">Saturday</div>
                    <div className="text-blue-100">9:00 AM - 4:00 PM EST</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-lg lg:text-xl font-bold mb-2">Sunday</div>
                    <div className="text-blue-100">Emergency Support Only</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
