"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { Star, Clock, MapPin, Calendar, Users, Award, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function OfflineCourseCard({ course, index }) {
  if (!course) return null;
  
  const imageUrl = getImageUrl(course.image);
  const skills = course.skills || course.learningObjectives || [];
  const instructorImageUrl = course.instructorImage ? getImageUrl(course.instructorImage) : null;
  const courseId = course.id || course._id;
  const courseSlug = course.slug || courseId;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all overflow-hidden"
    >
      {/* Course Image */}
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop';
          }}
        />
        
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute top-4 left-4"
        >
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {course.category || 'Workshop'}
          </span>
        </motion.div>

        {/* Level Badge */}
        {course.level && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
              course.level === 'Beginner' ? 'bg-green-500 text-white' :
              course.level === 'Intermediate' ? 'bg-yellow-500 text-white' :
              course.level === 'Advanced' ? 'bg-red-500 text-white' :
              'bg-blue-500 text-white'
            }`}>
              {course.level}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {course.isFeatured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Award className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Location Badge */}
        {course.location && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-blue-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {course.location}
            </span>
          </div>
        )}
      </div>
      
      {/* Course Content */}
      <div className="p-5 lg:p-6">
        {/* Instructor */}
        <div className="flex items-center gap-3 mb-4">
          {instructorImageUrl ? (
            <motion.img
              src={instructorImageUrl}
              alt={course.instructor || 'Instructor'}
              className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
              whileHover={{ scale: 1.1 }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=face';
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center border-2 border-yellow-400 shadow-lg">
              <span className="text-xs font-bold text-white">
                {course.instructor ? course.instructor.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'IN'}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">{course.instructor || 'Instructor'}</div>
            <div className="text-xs text-gray-500">Expert Instructor</div>
          </div>
        </div>
        
        {/* Course Title */}
        <Link href={`/courses/${courseSlug}`}>
          <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg lg:text-xl hover:text-blue-900 transition-colors cursor-pointer">
            {course.title}
          </h3>
        </Link>
        
        {/* Course Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-900" />
            <span className="font-medium">{course.duration || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-900" />
            <span className="font-medium">{course.studentsCount || course.maxStudents || 0} max</span>
          </div>
          {course.lessons && (
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-900" />
              <span className="font-medium">{course.lessons} sessions</span>
            </div>
          )}
        </div>

        {/* Date Range */}
        {(course.startDate || course.endDate) && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <Calendar className="w-4 h-4 text-blue-900 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-0.5">Training Dates</div>
              <div className="text-sm font-semibold text-gray-900">
                {course.startDate || 'TBA'} - {course.endDate || 'TBA'}
              </div>
            </div>
          </div>
        )}

        {/* Skills/Tags */}
        {skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 2).map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: skillIndex * 0.05 }}
                  className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium border border-blue-200"
                >
                  {skill}
                </motion.span>
              ))}
              {skills.length > 2 && (
                <span className="text-gray-500 text-xs font-medium">+{skills.length - 2} more</span>
              )}
            </div>
          </div>
        )}

        {/* Certificate Badge */}
        {course.certificate && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-50 to-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-bold border border-green-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Certificate Included
            </span>
          </div>
        )}
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            {course.price ? (
              <div>
                <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                  ${course.price}
                </div>
                {course.originalPrice && course.originalPrice > course.price && (
                  <div className="text-xs text-gray-500 line-through">${course.originalPrice}</div>
                )}
              </div>
            ) : (
              <div className="text-base lg:text-lg font-bold text-green-600">Free</div>
            )}
          </div>
          <Link href={`/courses/${courseSlug}`}>
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-4 py-2 rounded-lg text-sm font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-md flex items-center gap-1.5"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
}
