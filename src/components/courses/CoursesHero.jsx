"use client";

import { motion } from "framer-motion";
import { Play, Users, Award, Clock, MapPin, Wrench, Star, CheckCircle, ArrowRight } from "lucide-react";

const iconMap = {
  Globe: "🌐",
  Clock: Clock,
  Users: Users,
  Award: Award,
  MapPin: MapPin,
  Wrench: Wrench
};

export default function CoursesHero({ content }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20 overflow-hidden">
      {/* Background Image Overlay */}
      {content.backgroundImage && (
        <div className="absolute inset-0 opacity-10">
          <img
            src={content.backgroundImage}
            alt="Naval Training"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/30">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-200">Premier Naval Training</span>
              </div>

              {/* Title and Subtitle */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {content.title}
                </h1>
                <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                  {content.subtitle}
                </p>
                <p className="text-lg text-blue-200 leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Stats */}
              {content.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {content.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-blue-200">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              {content.cta && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-500 text-blue-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    {content.cta.primary}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-950 transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    {content.cta.secondary}
                  </motion.button>
                </div>
              )}

              {/* Features */}
              <div className="flex flex-wrap gap-3">
                {content.features.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                    >
                      {IconComponent && typeof IconComponent === 'string' ? (
                        <span className="text-lg">{IconComponent}</span>
                      ) : (
                        IconComponent && <IconComponent className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column - Badges/Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {content.badges && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4 text-center">Why Choose Our Training?</h3>
                  <div className="space-y-3">
                    {content.badges.map((badge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-blue-100">{badge}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  <span className="ml-2 text-white font-medium">4.8/5 Average Rating</span>
                </div>
                <p className="text-blue-200 text-sm">
                  Trusted by 15,000+ naval professionals worldwide
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl"></div>
    </section>
  );
}