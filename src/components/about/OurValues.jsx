"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Award, Users, Lightbulb, Target, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Integrity",
    description: "We uphold the highest ethical standards in all our training programs and interactions.",
    details: [
      "Transparent communication",
      "Ethical decision-making",
      "Accountability in all actions"
    ],
    color: "from-red-500 to-red-700",
    bgColor: "from-red-50 to-red-100"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest quality in every aspect of our training and services.",
    details: [
      "Continuous improvement",
      "Best-in-class instruction",
      "Outstanding results"
    ],
    color: "from-yellow-500 to-yellow-700",
    bgColor: "from-yellow-50 to-yellow-100"
  },
  {
    icon: Shield,
    title: "Safety",
    description: "The safety and well-being of our trainees is our top priority in all operations.",
    details: [
      "Comprehensive safety protocols",
      "Risk assessment and mitigation",
      "Emergency preparedness"
    ],
    color: "from-green-500 to-green-700",
    bgColor: "from-green-50 to-green-100"
  },
  {
    icon: Users,
    title: "Respect",
    description: "We foster an environment of mutual respect and dignity for all individuals.",
    details: [
      "Inclusive learning environment",
      "Diverse perspectives",
      "Collaborative approach"
    ],
    color: "from-blue-500 to-blue-700",
    bgColor: "from-blue-50 to-blue-100"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace new technologies and methodologies to enhance learning outcomes.",
    details: [
      "Cutting-edge technology",
      "Modern teaching methods",
      "Continuous innovation"
    ],
    color: "from-purple-500 to-purple-700",
    bgColor: "from-purple-50 to-purple-100"
  },
  {
    icon: Target,
    title: "Service",
    description: "We are committed to serving our BVT community and the broader maritime industry.",
    details: [
      "Community engagement",
      "Service to others",
      "National security mission"
    ],
    color: "from-indigo-500 to-indigo-700",
    bgColor: "from-indigo-50 to-indigo-100"
  }
];

export default function OurValues() {
  return (
    <section className="relative px-3 sm:px-4 lg:px-6 py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
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
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Our Values</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              What We Stand For
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our core values guide every decision we make and every program we deliver, 
            ensuring that we maintain the highest standards while serving our BVT community.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-10">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 lg:w-9 lg:h-9 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-base lg:text-lg">{value.description}</p>

                  {/* Details - list with visible dots/bullets */}
                  <ul className="space-y-2 list-none pl-0">
                    {value.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 bg-gradient-to-r ${value.color}`} />
                        <span className="text-sm lg:text-base text-gray-600">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Values Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border-2 border-yellow-400/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-yellow-500 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Living Our Values Every Day</h3>
              <p className="text-blue-100 leading-relaxed max-w-4xl mx-auto text-base lg:text-lg mb-6">
                These values aren't just words on a wall—they're the foundation of everything we do. 
                From the way we design our training programs to how we interact with each trainee, 
                our values guide us in creating an environment where excellence, integrity, and service 
                are not just expected, but celebrated.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
                {VALUES.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <value.icon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm lg:text-base font-medium text-white">{value.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
