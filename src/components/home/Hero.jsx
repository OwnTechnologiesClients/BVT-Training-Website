"use client";

import { motion } from "framer-motion";
import { Ship, Anchor, Award, Users } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-between px-4 md:px-10 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 py-10">
      {/* Simple Background Pattern - Same as Stats */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-yellow-500 rounded-full"></div>
      </div>

      <div className="container mx-auto mt-20 md:mt-28 relative z-10">
        <div className="grid grid-cols-12 gap-8 text-center lg:text-left items-center">
          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-full lg:col-span-7 space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-600/30">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
                Navy Certified Training
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl !leading-tight font-bold text-white">
              Excel in Your <span className="text-yellow-500">Naval Career</span> with Professional Training
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
              Advance your career in the naval forces with our comprehensive vocational 
              training programs. From technical skills to leadership development, we provide 
              the education you need to succeed.
            </p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
            >
              <button className="group bg-yellow-600 text-blue-950 px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                <Ship className="w-5 h-5" />
                View All Programs
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="border-2 border-yellow-600 text-yellow-500 px-8 py-4 rounded-lg font-bold hover:bg-yellow-600 hover:text-blue-950 transition-all hover:scale-105 backdrop-blur-sm">
                Enrollment Info
              </button>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl">
              {[
                { icon: Users, value: "8,500+", label: "Active Trainees" },
                { icon: Award, value: "400+", label: "Programs" },
                { icon: Anchor, value: "95%", label: "Success Rate" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center lg:text-left">
                    <Icon className="w-6 h-6 text-yellow-500 mb-2 mx-auto lg:mx-0" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="col-span-full lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Main Hero Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=600&h=600&fit=crop"
                  alt="Naval Training"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent"></div>
                
                {/* Center Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-yellow-600/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <Ship className="w-12 h-12 text-blue-950" />
                    <div className="text-blue-950">
                      <div className="text-2xl font-bold">BVT TRAINING</div>
                      <div className="text-sm font-semibold">Naval Excellence</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Badges - Simplified */}
              {[
                { icon: Award, position: "top-0 left-0" },
                { icon: Users, position: "top-0 right-0" },
                { icon: Anchor, position: "bottom-0 left-0" },
                { icon: Ship, position: "bottom-0 right-0" }
              ].map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className={`absolute ${badge.position} w-16 h-16 bg-blue-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-yellow-600 hover:bg-blue-800 transition-all hover:scale-110`}
                  >
                    <Icon className="w-7 h-7 text-yellow-500" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
