"use client";

import { motion } from "framer-motion";
import { Calendar, Ship, Users, Award, Anchor, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const TIMELINE = [
  {
    year: "1973",
    title: "Foundation",
    description: "BVT Training was established with a vision to provide world-class BVT vocational training.",
    icon: Ship,
    color: "from-blue-600 to-blue-800"
  },
  {
    year: "1985",
    title: "Expansion",
    description: "Expanded to include advanced technical programs and leadership development courses.",
    icon: Users,
    color: "from-blue-700 to-blue-900"
  },
  {
    year: "1995",
    title: "Recognition",
    description: "Received official recognition from the US Navy for excellence in vocational training.",
    icon: Award,
    color: "from-blue-800 to-blue-950"
  },
  {
    year: "2005",
    title: "Innovation",
    description: "Introduced modern simulation technology and digital learning platforms.",
    icon: Anchor,
    color: "from-slate-700 to-slate-900"
  },
  {
    year: "2015",
    title: "Global Reach",
    description: "Extended training programs to international BVT forces and maritime organizations.",
    icon: Ship,
    color: "from-indigo-700 to-indigo-900"
  },
  {
    year: "2025",
    title: "Future",
    description: "Continuing to lead in BVT education with cutting-edge technology and methodologies.",
    icon: Award,
    color: "from-blue-900 to-blue-950"
  }
];

export default function OurStory() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-gradient-to-br from-white via-blue-50/50 to-white overflow-hidden">
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
          className="mb-16 text-center"
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
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Our Journey</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              Our Story Through the Decades
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From humble beginnings in 1973 to becoming a global leader in BVT vocational training, 
            our journey has been marked by continuous innovation, excellence, and dedication to our mission.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-yellow-500 to-blue-600 rounded-full hidden lg:block"></div>

          <div className="space-y-12 lg:space-y-16">
            {TIMELINE.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-full lg:w-5/12 ${isEven ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'} mb-6 lg:mb-0`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className={`bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all group ${isEven ? 'lg:ml-auto' : 'lg:mr-auto'}`}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 rounded-2xl lg:rounded-3xl overflow-hidden">
                        <div className={`absolute ${isEven ? 'top-4 right-4' : 'top-4 left-4'} w-32 h-32 border-2 border-blue-600 rounded-full`}></div>
                      </div>

                      <div className="relative z-10">
                        <div className={`flex items-center gap-4 mb-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} flex-col sm:flex-row`}>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.3 }}
                            className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">{item.year}</div>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-base lg:text-lg">{item.description}</p>
                      </div>

                      {/* Decorative Corner */}
                      <div className={`absolute ${isEven ? 'top-0 right-0' : 'top-0 left-0'} w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent ${isEven ? 'rounded-bl-full' : 'rounded-br-full'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-full lg:w-2/12 flex justify-center my-4 lg:my-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      whileHover={{ scale: 1.2 }}
                      className="relative z-10 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center"
                    >
                      <div className="w-3 h-3 lg:w-4 lg:h-4 bg-white rounded-full"></div>
                    </motion.div>
                  </div>

                  {/* Empty Space */}
                  <div className="hidden lg:block w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 lg:gap-6 bg-gradient-to-r from-blue-900 to-blue-950 px-6 lg:px-10 py-6 lg:py-8 rounded-2xl lg:rounded-3xl shadow-2xl border-2 border-yellow-400/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
            </div>

            <div className="relative z-10 text-left">
              <p className="text-yellow-400 font-bold text-lg lg:text-xl mb-1">Join Our Continuing Legacy</p>
              <p className="text-blue-100 text-sm lg:text-base">Be part of the next chapter in BVT training excellence</p>
            </div>
            <Link
              href="/courses"
              className="relative z-10 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
