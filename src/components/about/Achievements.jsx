"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award, Shield, Target, Sparkles } from "lucide-react";

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
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Our Achievements</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              Recognized Excellence
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence has been recognized by leading organizations in the maritime 
            industry and military sectors, earning us numerous awards and accolades over the years.
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {ACHIEVEMENTS.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-blue-50 to-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border-2 border-blue-200 hover:border-yellow-400 hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-32 h-32 border-2 border-blue-600 rounded-full"></div>
                </div>

                <div className="relative z-10">
                  {/* Award Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  >
                    <Icon className="w-8 h-8 lg:w-9 lg:h-9 text-blue-950" />
                  </motion.div>

                  {/* Award Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-300">
                        {achievement.category}
                      </span>
                      <span className="text-blue-900 font-bold text-lg">{achievement.year}</span>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-sm lg:text-base font-semibold text-blue-900 mb-2">{achievement.organization}</p>
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{achievement.description}</p>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border-2 border-yellow-400/30"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-yellow-500 rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8 lg:mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">Our Impact by the Numbers</h3>
              <p className="text-blue-100 text-base lg:text-lg">Measurable results that demonstrate our commitment to excellence</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="text-center p-4 lg:p-6 bg-blue-800/30 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-blue-700/50 hover:bg-blue-800/50 hover:border-yellow-400/50 transition-all"
                  >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-blue-950" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">{stat.number}</div>
                    <div className="text-xs lg:text-sm text-blue-200 leading-tight">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Recognition Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 lg:gap-6 bg-gradient-to-r from-yellow-50 to-blue-50 px-6 lg:px-10 py-6 lg:py-8 rounded-2xl lg:rounded-3xl shadow-xl border-2 border-yellow-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 lg:w-10 lg:h-10 text-blue-950" />
              </div>
              <div className="text-left">
                <p className="text-blue-900 font-bold text-lg lg:text-xl">Recognized Excellence</p>
                <p className="text-gray-600 text-sm lg:text-base">Award-winning training programs since 1973</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
