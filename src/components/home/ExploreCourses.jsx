"use client";

import { motion } from "framer-motion";
import { Clock, Users, Award, TrendingUp } from "lucide-react";

const COURSES = [
  {
    tag: "Beginner • 12 Weeks • 150 Cadets",
    title: "Marine Engineering Fundamentals",
    label: "Apply Now",
    desc: "Master the basics of marine engineering, from propulsion systems to electrical operations. Essential training for technical ratings.",
    color: "from-blue-700 to-blue-900",
    level: "Beginner",
    duration: "12 Weeks",
    students: 150,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
  },
  {
    tag: "Intermediate • 8 Weeks • 120 Cadets",
    title: "Advanced Navigation Systems",
    label: "Apply Now",
    desc: "Learn modern navigation techniques, GPS systems, and chart plotting. Essential skills for deck officers and navigation specialists.",
    color: "from-blue-800 to-blue-950",
    level: "Intermediate",
    duration: "8 Weeks",
    students: 120,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
  },
  {
    tag: "Advanced • 16 Weeks • 200 Cadets",
    title: "Maritime Safety & Security",
    label: "Apply Now",
    desc: "Comprehensive training in safety protocols, emergency response, and security measures for maritime operations.",
    color: "from-slate-700 to-slate-900",
    level: "Advanced",
    duration: "16 Weeks",
    students: 200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop"
  },
  {
    tag: "Beginner • 10 Weeks • 180 Cadets",
    title: "Naval Communications",
    label: "Apply Now",
    desc: "Master naval communication systems, radio operations, and signal procedures essential for fleet operations.",
    color: "from-indigo-700 to-indigo-900",
    level: "Beginner",
    duration: "10 Weeks",
    students: 180,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
  },
  {
    tag: "Intermediate • 14 Weeks • 95 Cadets",
    title: "Leadership & Command",
    label: "Apply Now",
    desc: "Develop essential leadership skills, team management, and command principles for advancing your naval career.",
    color: "from-blue-900 to-blue-950",
    level: "Intermediate",
    duration: "14 Weeks",
    students: 95,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
  {
    tag: "Advanced • 20 Weeks • 160 Cadets",
    title: "Weapons Systems Operations",
    label: "Apply Now",
    desc: "Advanced training in naval weapons systems, targeting, and tactical operations for defense specialists.",
    color: "from-slate-800 to-slate-950",
    level: "Advanced",
    duration: "20 Weeks",
    students: 160,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
  },
];

export default function ExploreCourses() {
  return (
    <section className="px-8 py-20 bg-gray-50">
      <div className="container mx-auto mb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
          <Award className="w-4 h-4 text-blue-900" />
          <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
            400+ Training Programs
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore Training Programs
        </h2>
        <p className="mt-2 mx-auto w-full px-4 text-lg text-gray-500 lg:w-6/12 lg:px-8">
          Browse through our comprehensive naval vocational training programs and find the perfect path 
          for your career advancement.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all border border-gray-200"
          >
            {/* Course Image with Overlay */}
            <div className={`relative h-56 overflow-hidden`}>
              <img 
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Level Badge */}
              <div className="absolute top-4 left-4 bg-yellow-600 text-blue-950 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {course.level}
              </div>

              {/* Rating */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <svg className="w-4 h-4 fill-yellow-500" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-sm font-bold text-gray-900">{course.rating}</span>
              </div>

              {/* Center Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-8xl font-bold">
                  {idx + 1}
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students} Cadets</span>
                </div>
              </div>

              <a
                href="#"
                className="text-gray-900 transition-colors hover:text-blue-900"
              >
                <h3 className="mb-3 text-xl font-bold leading-tight">
                  {course.title}
                </h3>
              </a>
              
              <p className="mb-6 font-normal text-gray-600 line-clamp-2">
                {course.desc}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Enrollment Progress</span>
                  <span>85%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-900 to-blue-700 rounded-full" style={{width: "85%"}} />
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-900 to-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 group">
                {course.label}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-gray-600 mb-6">Can't find what you're looking for?</p>
        <button className="bg-white border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-900 hover:text-white transition-colors shadow-lg">
          View All 400+ Programs
        </button>
      </div>
    </section>
  );
}
