"use client";

import { motion } from "framer-motion";
import { FileText, PlayCircle, PenSquare, Phone, TrendingUp } from "lucide-react";

const STATS = [
  {
    icon: FileText,
    count: "8,500+",
    title: "Active Trainees",
    description: "Enrolled in programs"
  },
  {
    icon: PlayCircle,
    count: "120+",
    title: "Expert Instructors",
    description: "Navy certified"
  },
  {
    icon: PenSquare,
    count: "400+",
    title: "Training Programs",
    description: "Across all specialties"
  },
  {
    icon: Phone,
    count: "24/7",
    title: "Student Support",
    description: "Always available"
  },
];

export default function Stats() {
  return (
    <section className="px-8 pt-32 pb-20 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Simple Background - Same as Hero */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 border-2 border-yellow-500 rounded-full"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        {/* Header - Simplified */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-600/30 mb-6">
            <TrendingUp className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
              Our Impact
            </span>
          </div>
          <h2 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            Excellence in Naval Training
          </h2>
          <p className="mx-auto w-full text-lg text-blue-100 lg:w-6/12">
            Decades of experience delivering world-class vocational training 
            to BVT personnel. Your success is our mission.
          </p>
        </div>

        {/* Stats Grid - Simplified */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, key) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={key} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: key * 0.1, duration: 0.5 }}
                className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-8 border border-blue-800 hover:border-yellow-600/50 transition-all hover:scale-105"
              >
                <div className="w-16 h-16 rounded-full bg-yellow-600 mx-auto mb-4 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-blue-950" />
                </div>

                <h3 className="mb-2 text-4xl font-bold text-white">
                  {stat.count}
                </h3>

                <p className="font-bold text-lg text-yellow-500 mb-1">
                  {stat.title}
                </p>

                <p className="text-sm text-blue-200">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats Banner - Simplified */}
        <div className="mt-16 bg-blue-900/30 backdrop-blur-sm border border-blue-800 rounded-xl py-8 px-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-1">95%</div>
              <div className="text-sm text-blue-200">Graduate Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-1">50+</div>
              <div className="text-sm text-blue-200">Years of Excellence</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-1">200+</div>
              <div className="text-sm text-blue-200">Partner Organizations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
