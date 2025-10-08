"use client";

import { motion } from "framer-motion";
import { Users, Award, Star, BookOpen, MapPin, TrendingUp } from "lucide-react";
import MentorCard from "./MentorCard";

export default function MentorsSection({ mentors, showLocations = false }) {
  const stats = showLocations ? [
    { icon: Users, value: "15+", label: "Expert Instructors" },
    { icon: MapPin, value: "6+", label: "Training Locations" },
    { icon: Star, value: "4.8/5", label: "Average Rating" },
    { icon: BookOpen, value: "50+", label: "Workshops Available" }
  ] : [
    { icon: Users, value: "15+", label: "Expert Instructors" },
    { icon: Award, value: "200+", label: "Years Combined Experience" },
    { icon: Star, value: "4.8/5", label: "Average Instructor Rating" },
    { icon: BookOpen, value: "1,200+", label: "Courses Taught" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4 text-blue-900" />
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                {showLocations ? "Expert Workshop Instructors" : "Expert Instructors"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learn from Naval Experts
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our instructors are distinguished BVT officers with decades of real-world experience. 
              {showLocations ? " Learn hands-on skills from the best in state-of-the-art facilities." : " Learn from the best and advance your career with proven strategies and techniques."}
            </p>
          </div>
        </div>
      </div>

      {/* Mentor Stats - Full Width */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Mentors Grid - Full Width */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mentors.map((mentor, index) => (
            <MentorCard key={mentor.id} mentor={mentor} index={index} showLocations={showLocations} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {showLocations ? "Ready to Learn Hands-On?" : "Ready to Learn from the Best?"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {showLocations ? 
                "Join hundreds of BVT personnel who have advanced their careers through our expert-led offline training programs. Experience real-world training with state-of-the-art equipment." :
                "Join thousands of BVT personnel who have advanced their careers through our expert-led training programs. Start your journey with world-class instructors."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Meet All Instructors
              </button>
              <button className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-900 hover:text-white transition-colors flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {showLocations ? "Browse Workshops" : "Browse Courses"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
