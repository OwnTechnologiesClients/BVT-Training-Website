"use client";

import { motion } from "framer-motion";
import { Calendar, Ship, Users, Award, Anchor, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const TIMELINE = [
  // {
  //   year: "1973",
  //   title: "Foundation",
  //   description: "BVT Training was established with a vision to provide world-class BVT vocational training.",
  //   icon: Ship,
  //   color: "from-blue-600 to-blue-800"
  // },
  // {
  //   year: "1985",
  //   title: "Expansion",
  //   description: "Expanded to include advanced technical programs and leadership development courses.",
  //   icon: Users,
  //   color: "from-blue-700 to-blue-900"
  // },
  // {
  //   year: "1995",
  //   title: "Recognition",
  //   description: "Received official recognition for excellence in vocational training.",
  //   icon: Award,
  //   color: "from-blue-800 to-blue-950"
  // },
  // {
  //   year: "2005",
  //   title: "Innovation",
  //   description: "Introduced modern simulation technology and digital learning platforms.",
  //   icon: Anchor,
  //   color: "from-slate-700 to-slate-900"
  // },
  // {
  //   year: "2015",
  //   title: "Global Reach",
  //   description: "Extended training programs to international BVT forces and maritime organizations.",
  //   icon: Ship,
  //   color: "from-indigo-700 to-indigo-900"
  // },
  {
    year: "2025",
    title: "Startup of BVT Training",
    description: "BVT Training saw the world in 2025, expanding training programs globally and validating methodologies across diverse international operations.",
    icon: Ship,
    color: "from-blue-900 to-blue-950"
  },
  {
    year: "2026",
    title: "Launching of Digital Seamanship",
    description: "Launching of 'Digital Seamanship: AI-Assisted Safety Leadership' - a revolutionary program combining AI technology with maritime safety leadership.",
    icon: Award,
    color: "from-indigo-700 to-indigo-900"
  }
];

export default function OurStory() {
  return (
    <section className="relative px-3 sm:px-4 lg:px-6 py-12 lg:py-16 bg-gradient-to-br from-white via-blue-50/50 to-white overflow-x-hidden overflow-y-visible">
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
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Our Journey</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              Our Story Through the Decades
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From a small startup in 2025 to becoming a global leader in BVT vocational training, 
            our journey has been marked by continuous innovation, excellence, and dedication to our mission.
          </p>
        </motion.div>

        {/* Timeline - mobile: compact left-aligned line + cards; desktop: alternating */}
        <div className="relative max-w-full">
          {/* Timeline Line - left on mobile (aligned with dots), center on desktop */}
          <div className="absolute left-3 w-1 h-full min-h-[120px] bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-500 rounded-full lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:min-h-0" aria-hidden></div>

          <div className="space-y-8 sm:space-y-10 lg:space-y-16 pl-8 sm:pl-10 lg:pl-0">
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
                  className={`relative flex flex-col lg:flex-row items-stretch lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Content card */}
                  <div className={`w-full max-w-full lg:w-5/12 ${isEven ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'} mb-0 lg:mb-0`}>
                    <motion.div
                      whileHover={{ y: -6, scale: 1.02 }}
                      className={`bg-white rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all group ${isEven ? 'lg:ml-auto' : 'lg:mr-auto'} max-w-full lg:max-w-md w-full relative`}
                    >
                      {/* Dot anchor: on mobile the dot sits at same vertical position as this card's top */}
                      <div className="hidden lg:block" aria-hidden />
                      {/* Background Pattern - subtle */}
                      <div className="absolute inset-0 opacity-5 rounded-xl overflow-hidden pointer-events-none">
                        <div className={`absolute ${isEven ? 'top-2 right-2' : 'top-2 left-2'} w-20 h-20 border border-blue-600 rounded-full`}></div>
                      </div>

                      <div className="relative z-10">
                        {/* Icon + Year in one compact row - no extra circle */}
                        <div className={`flex items-center gap-3 mb-2 sm:mb-3 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                          <span className={`inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-r ${item.color} shadow-md flex-shrink-0`}>
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" />
                          </span>
                          <span className="text-base sm:text-lg lg:text-2xl font-bold text-blue-900">{item.year}</span>
                        </div>
                        <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">{item.description}</p>
                      </div>

                      {/* Decorative Corner - desktop only */}
                      <div className={`hidden lg:block absolute ${isEven ? 'top-0 right-0' : 'top-0 left-0'} w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent ${isEven ? 'rounded-bl-full' : 'rounded-br-full'} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
                    </motion.div>
                  </div>

                  {/* Timeline Dot - mobile: left on line, vertically centered with card; desktop: center */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:top-0 lg:translate-x-0 lg:translate-y-0 lg:w-2/12 flex justify-center items-center lg:my-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      whileHover={{ scale: 1.2 }}
                      className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center ring-2 ring-yellow-400/30"
                    >
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-4 lg:h-4 bg-white rounded-full block" />
                    </motion.div>
                  </div>

                  {/* Empty Space for desktop layout */}
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
