"use client";

import { motion } from "framer-motion";
import { Star, Users, BookOpen, Award } from "lucide-react";

export default function MentorCard({ mentor, index }) {
  const {
    id,
    name,
    title,
    specialization,
    experience,
    rating,
    studentsCount,
    coursesCount,
    image,
    bestCourses
  } = mentor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100"
    >
      {/* Mentor Info */}
      <div className="flex items-center gap-4 mb-4">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center border border-white">
            <Award className="w-3 h-3 text-blue-900" />
          </div>
        </div>

        {/* Basic Info */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
            {name}
          </h3>
          <p className="text-blue-900 font-medium text-sm">{title}</p>
          <p className="text-gray-600 text-xs">{specialization}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
            <Star className="w-3 h-3 fill-current" />
          </div>
          <div className="text-sm font-bold text-gray-900">{rating}</div>
          <div className="text-xs text-gray-500">Rating</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
            <Users className="w-3 h-3" />
          </div>
          <div className="text-sm font-bold text-gray-900">{studentsCount}</div>
          <div className="text-xs text-gray-500">Students</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
            <BookOpen className="w-3 h-3" />
          </div>
          <div className="text-sm font-bold text-gray-900">{coursesCount}</div>
          <div className="text-xs text-gray-500">Courses</div>
        </div>
      </div>

      {/* Best Course */}
      {bestCourses && bestCourses.length > 0 && (
        <div className="mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs font-medium text-blue-900 mb-1">Featured Course</div>
            <div className="text-sm font-medium text-gray-900 line-clamp-1">{bestCourses[0].title}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">{bestCourses[0].duration}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-medium">{bestCourses[0].rating}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <button className="w-full bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
        View Courses
      </button>
    </motion.div>
  );
}
