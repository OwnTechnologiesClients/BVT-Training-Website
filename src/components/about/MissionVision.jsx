"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Shield } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="px-8 py-20 bg-white">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Target className="w-4 h-4 text-blue-900" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
              Our Foundation
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mission, Vision & Values
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Our commitment to BVT excellence is built on a solid foundation of core principles 
            that guide everything we do in preparing the next generation of BVT professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-xl transition-all group"
          >
            <div className="absolute top-6 right-6 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8 text-blue-950" />
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide world-class BVT vocational training that empowers maritime professionals 
                with the knowledge, skills, and leadership qualities necessary to excel in their careers 
                and serve their nations with distinction.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Excellence in Training</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Professional Development</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Career Advancement</span>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white hover:shadow-xl transition-all group"
          >
            <div className="absolute top-6 right-6 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="w-8 h-8 text-blue-950" />
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed">
                To be the global leader in BVT vocational education, recognized for our innovative 
                training methods, outstanding faculty, and the exceptional success of our graduates 
                in maritime operations worldwide.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-blue-100">Global Leadership</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-blue-100">Innovation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-blue-100">Graduate Success</span>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all group"
          >
            <div className="absolute top-6 right-6 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 text-blue-950" />
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Integrity, excellence, and service form the cornerstone of our educational philosophy, 
                ensuring that every graduate embodies the highest standards of BVT professionalism.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Integrity</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Excellence</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Service</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Supporting Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, number: "8,500+", label: "Successful Graduates" },
            { icon: Award, number: "95%", label: "Career Advancement Rate" },
            { icon: Shield, number: "50+", label: "Years of Excellence" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-950" />
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
