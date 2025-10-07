"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { Star, Clock, Users, Play } from "lucide-react";

export default function OnlineCourseCard({ course, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      {/* Course Image */}
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
            {course.category}
          </span>
        </div>
        
        {/* Rating */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span className="text-sm font-bold text-gray-900">{course.rating}</span>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="p-6">
        {/* Instructor */}
        <div className="flex items-center gap-3 mb-3">
          <img src={course.instructorImage} alt={course.instructor} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <div className="text-sm font-medium text-gray-900">{course.instructor}</div>
            <div className="text-xs text-gray-500">Instructor</div>
          </div>
        </div>
        
        {/* Course Title */}
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg">{course.title}</h3>
        
        {/* Course Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Play className="w-4 h-4" />
            <span>{course.lessons} Lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students} Students</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">${course.price}</div>
          <Link href={`/courses/${course.slug || course.id}`}>
            <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
