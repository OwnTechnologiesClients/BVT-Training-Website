"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Award, Globe, Shield, Clock, Star, CheckCircle } from "lucide-react";

export default function ProgramBenefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Career Advancement",
      description: "94% of graduates receive promotions or new opportunities within 6 months",
      stat: "94%",
      color: "green"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Certifications recognized by top BVT organizations worldwide",
      stat: "100%",
      color: "blue"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from active and retired BVT officers with real-world experience",
      stat: "50+",
      color: "purple"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with BVT professionals from over 25 countries",
      stat: "25+",
      color: "indigo"
    },
    {
      icon: Shield,
      title: "Security Clearance",
      description: "Programs designed to meet government security requirements",
      stat: "Top Secret",
      color: "red"
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to materials",
      stat: "24/7",
      color: "orange"
    }
  ];


  const getColorClasses = (color) => {
    const colorMap = {
      green: "from-green-500 to-green-600",
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      indigo: "from-indigo-500 to-indigo-600",
      red: "from-red-500 to-red-600",
      orange: "from-orange-500 to-orange-600"
    };
    return colorMap[color] || "from-blue-500 to-blue-600";
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
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
              Why Choose Our Programs?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful BVT professionals who have advanced their careers 
              through our comprehensive training programs.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(benefit.color)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{benefit.title}</h3>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${getColorClasses(benefit.color)} bg-clip-text text-transparent`}>
                        {benefit.stat}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Program Features</h3>
            <div className="space-y-4">
              {[
                "Industry-recognized certifications",
                "Real-world case studies and projects",
                "Access to exclusive BVT resources",
                "Lifetime learning community access",
                "Career placement assistance",
                "Continuing education credits"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          >
            <h3 className="text-xl font-bold mb-6">Ready to Start?</h3>
            <p className="text-blue-100 mb-6">
              Join the next cohort and begin your journey to BVT excellence. 
              Limited seats available for each program.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Apply Now
              </button>
              <button className="w-full border-2 border-white text-white py-3 px-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
