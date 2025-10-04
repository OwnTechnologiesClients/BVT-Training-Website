"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Shield, Navigation, AlertTriangle, Brain, Radio, Wrench } from "lucide-react";

export default function ProgramCategories() {
  const categories = [
    {
      icon: BookOpen,
      title: "Technical Training",
      description: "Advanced technical skills and engineering programs",
      programs: 45,
      color: "blue"
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Command and leadership skills for naval officers",
      programs: 28,
      color: "green"
    },
    {
      icon: Shield,
      title: "Security & Defense",
      description: "Maritime security protocols and defense strategies",
      programs: 32,
      color: "red"
    },
    {
      icon: Navigation,
      title: "Navigation & Seamanship",
      description: "Traditional and modern navigation techniques",
      programs: 25,
      color: "purple"
    },
    {
      icon: AlertTriangle,
      title: "Safety & Emergency",
      description: "Emergency response and safety procedures",
      programs: 18,
      color: "orange"
    },
    {
      icon: Brain,
      title: "Strategic Planning",
      description: "Military strategy and operational planning",
      programs: 22,
      color: "indigo"
    },
    {
      icon: Radio,
      title: "Communications",
      description: "Advanced communication systems and protocols",
      programs: 15,
      color: "teal"
    },
    {
      icon: Wrench,
      title: "Maintenance & Repair",
      description: "Equipment maintenance and technical repairs",
      programs: 20,
      color: "gray"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      red: "from-red-500 to-red-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      indigo: "from-indigo-500 to-indigo-600",
      teal: "from-teal-500 to-teal-600",
      gray: "from-gray-500 to-gray-600"
    };
    return colorMap[color] || "from-blue-500 to-blue-600";
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Program Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect training program for your career goals. Our comprehensive categories 
              cover every aspect of naval operations and professional development.
            </p>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer"
              >
                {/* Icon */}
                <div className={`bg-gradient-to-r ${getColorClasses(category.color)} p-6`}>
                  <Icon className="w-12 h-12 text-white mx-auto" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  {/* Programs Count */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <BookOpen className="w-4 h-4" />
                      <span>{category.programs} programs</span>
                    </div>
                    <div className="text-blue-600 group-hover:text-blue-800 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Training Journey?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of naval professionals who have advanced their careers with our comprehensive training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse All Programs
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get Program Catalog
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
