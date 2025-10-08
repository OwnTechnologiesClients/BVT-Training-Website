"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award, Shield, Target } from "lucide-react";

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: "Naval Training Excellence Award",
    year: "2024",
    organization: "US Navy",
    description: "Recognized for outstanding contribution to BVT vocational training and education.",
    category: "Excellence"
  },
  {
    icon: Medal,
    title: "Innovation in Education",
    year: "2023",
    organization: "Maritime Education Council",
    description: "Awarded for pioneering use of simulation technology in BVT training programs.",
    category: "Innovation"
  },
  {
    icon: Star,
    title: "Outstanding Service Award",
    year: "2022",
    organization: "Department of Defense",
    description: "Honored for exceptional service in preparing military personnel for maritime operations.",
    category: "Service"
  },
  {
    icon: Award,
    title: "Training Program of the Year",
    year: "2021",
    organization: "International Maritime Organization",
    description: "Recognized for the most comprehensive and effective BVT training curriculum.",
    category: "Recognition"
  },
  {
    icon: Shield,
    title: "Safety Excellence Award",
    year: "2020",
    organization: "Maritime Safety Authority",
    description: "Acknowledged for maintaining the highest safety standards in training operations.",
    category: "Safety"
  },
  {
    icon: Target,
    title: "Leadership Development Excellence",
    year: "2019",
    organization: "Naval Leadership Institute",
    description: "Praised for exceptional leadership training programs and graduate success rates.",
    category: "Leadership"
  }
];

const STATS = [
  { number: "95%", label: "Graduate Success Rate", icon: Trophy },
  { number: "8,500+", label: "Successful Graduates", icon: Award },
  { number: "50+", label: "Years of Excellence", icon: Star },
  { number: "400+", label: "Training Programs", icon: Target },
  { number: "24/7", label: "Student Support", icon: Shield },
  { number: "100+", label: "Industry Partnerships", icon: Medal }
];

export default function Achievements() {
  return (
    <section className="px-8 py-20 bg-white">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Trophy className="w-4 h-4 text-blue-900" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
              Our Achievements
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recognized Excellence
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Our commitment to excellence has been recognized by leading organizations in the maritime 
            industry and military sectors, earning us numerous awards and accolades over the years.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ACHIEVEMENTS.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-200 hover:shadow-xl hover:scale-105 transition-all"
              >
                {/* Award Icon */}
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Icon className="w-8 h-8 text-blue-950" />
                </div>

                {/* Award Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
                      {achievement.category}
                    </span>
                    <span className="text-blue-900 font-bold">{achievement.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-sm font-semibold text-blue-900 mb-2">{achievement.organization}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-yellow-500 rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Our Impact by the Numbers</h3>
              <p className="text-blue-100">Measurable results that demonstrate our commitment to excellence</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center p-4 bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-700 hover:bg-blue-800/50 transition-all"
                  >
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-blue-950" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-500 mb-1">{stat.number}</div>
                    <div className="text-xs text-blue-200 leading-tight">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recognition Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-yellow-50 to-blue-50 px-8 py-6 rounded-2xl shadow-xl border border-yellow-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-blue-950" />
              </div>
              <div className="text-left">
                <p className="text-blue-900 font-bold text-lg">Recognized Excellence</p>
                <p className="text-gray-600 text-sm">Award-winning training programs since 1973</p>
              </div>
            </div>
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors whitespace-nowrap shadow-lg">
              View All Awards
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
