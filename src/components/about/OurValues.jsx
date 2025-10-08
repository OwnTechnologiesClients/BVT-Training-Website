"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Award, Users, Lightbulb, Target } from "lucide-react";

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
    <section className="px-8 py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Heart className="w-4 h-4 text-blue-900" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
              Our Values
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What We Stand For
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Our core values guide every decision we make and every program we deliver, 
            ensuring that we maintain the highest standards while serving our BVT community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{value.description}</p>

                  {/* Details */}
                  <div className="space-y-2">
                    {value.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${value.color} rounded-full`}></div>
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Values Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Living Our Values Every Day</h3>
              <p className="text-blue-100 leading-relaxed max-w-4xl mx-auto">
                These values aren't just words on a wall—they're the foundation of everything we do. 
                From the way we design our training programs to how we interact with each trainee, 
                our values guide us in creating an environment where excellence, integrity, and service 
                are not just expected, but celebrated.
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {VALUES.map((value, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <value.icon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-white">{value.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
