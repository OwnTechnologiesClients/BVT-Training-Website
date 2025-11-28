"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { Star, Clock, MapPin, Calendar } from "lucide-react";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function OfflineCourseCard({ course, index }) {
  if (!course) return null;
  
  const imageUrl = getImageUrl(course.image);
  const skills = course.skills || course.learningObjectives || [];
  const instructorImageUrl = course.instructorImage ? getImageUrl(course.instructorImage) : null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      {/* Course Image */}
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={course.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
            {course.category}
          </span>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="p-6">
        {/* Instructor */}
        <div className="flex items-center gap-3 mb-3">
          {instructorImageUrl ? (
            <img 
              src={instructorImageUrl} 
              alt={course.instructor || 'Instructor'} 
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=face';
              }}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {course.instructor ? course.instructor.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'IN'}
              </span>
            </div>
          )}
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
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{course.location || 'Offline'}</span>
          </div>
        </div>

        {/* Date Range - Only show if dates exist */}
        {(course.startDate || course.endDate) && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{course.startDate || 'TBA'} - {course.endDate || 'TBA'}</span>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, skillIndex) => (
                <span 
                  key={skillIndex}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="text-gray-500 text-xs">+{skills.length - 3} more</span>
              )}
            </div>
          </div>
        )}
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-900">${course.price}</div>
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
