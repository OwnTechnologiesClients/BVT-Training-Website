"use client";

import { motion } from "framer-motion";
import { Clock, Users, Star, BookOpen, Award, MapPin } from "lucide-react";
import Link from "next/link";

export default function CourseCard({ course, index }) {
  const {
    id,
    title,
    description,
    instructor,
    duration,
    level,
    rating,
    studentsCount,
    image,
    price,
    category,
    isFeatured,
    location,
    lessons,
    certificate
  } = course;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300 border border-gray-100 relative overflow-hidden"
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
        <div className="flex flex-col gap-3 px-6">
          <Link href={`/courses/${id}`} className="block">
            <button className="w-full bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
              View Details
            </button>
          </Link>
          <Link href={`/courses/${id}/learn`} className="block">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-lg">
              Start Learning
            </button>
          </Link>
        </div>
      </div>

      {/* Horizontal Layout */}
        <div className="flex h-64 p-2">
        {/* Course Image - Full Height Left Side */}
        <div className="relative w-52 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Level Badge */}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
              level === 'Beginner' ? 'bg-green-500 text-white' :
              level === 'Intermediate' ? 'bg-yellow-500 text-white' :
              level === 'Advanced' ? 'bg-red-500 text-white' :
              'bg-blue-500 text-white'
            }`}>
              {level}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-bold text-gray-900">{rating}</span>
          </div>
        </div>

        {/* Course Content */}
        <div className="flex-1 min-w-0 p-2 flex flex-col justify-between">
          {/* Top Content */}
          <div>
          {/* Header Row */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <span className="text-blue-900 text-xs font-medium bg-blue-50 px-2 py-1 rounded">
                {category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-blue-900 transition-colors line-clamp-2">
                {title}
              </h3>
            </div>
            {/* Price */}
            <div className="ml-2 text-right">
              {price ? (
                <div>
                  <span className="text-xl font-bold text-gray-900">${price}</span>
                </div>
              ) : (
                <span className="text-sm font-semibold text-green-600">Free</span>
              )}
            </div>
          </div>

            {/* Instructor */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {instructor.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-sm text-gray-600 truncate">by {instructor}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>

            {/* Course Stats */}
            <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{studentsCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>{lessons}</span>
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div>
            {/* Certificate Badge */}
            {certificate && (
              <div className="mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  <Award className="w-3 h-3" />
                  Certificate
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
