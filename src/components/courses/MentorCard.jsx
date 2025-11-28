"use client";

import { motion } from "framer-motion";
import { Star, BookOpen, Award, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default function MentorCard({ mentor, index, showLocations = false }) {
  // Transform backend instructor data to match component expectations
  const instructorName = mentor.userId 
    ? `${mentor.userId.firstName || ''} ${mentor.userId.lastName || ''}`.trim()
    : mentor.name || 'Instructor';
  
  const instructorImage = mentor.profilePic || mentor.image || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
  const experience = mentor.experience || 0;
  const rating = mentor.rating || 5;
  const bio = mentor.bio || '';
  const specializations = mentor.specializations || '';
  const department = mentor.department || '';
  const instructorId = mentor._id || mentor.id;
  const instructorSlug = mentor.slug;
  
  // Get department display name
  const getDepartmentName = (dept) => {
    const deptMap = {
      'marine-engineering': 'Marine Engineering',
      'navigation': 'Navigation',
      'maritime-safety': 'Maritime Safety',
      'naval-operations': 'Naval Operations',
      'submarine-operations': 'Submarine Operations'
    };
    return deptMap[dept] || dept;
  };

  return (
    <Link href={`/instructors/details/${instructorSlug || instructorId}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 cursor-pointer h-full"
      >
      {/* Instructor Image */}
      <div className="relative mb-6">
        <img
          src={instructorImage}
          alt={instructorName}
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100"
        />
        {experience > 0 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-medium">
              {experience}+ years
            </div>
          </div>
        )}
      </div>

      {/* Instructor Info */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{instructorName}</h3>
        {department && (
          <p className="text-blue-900 font-medium mb-2">{getDepartmentName(department)}</p>
        )}
        {specializations && (
          <p className="text-sm text-gray-600 mb-3">{specializations}</p>
        )}
        
        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm font-medium text-gray-700 ml-2">{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-gray-900">{mentor.coursesCount || mentor.workshopsCount || 0}</div>
          <div className="text-xs text-gray-500">{showLocations ? "Workshops" : "Courses"}</div>
        </div>
      </div>

      {/* Location Info for Offline */}
      {showLocations && mentor.locations && mentor.locations.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4 text-blue-900" />
            <span className="font-medium">Available Locations:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {mentor.locations.slice(0, 2).map((location, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs">
                {typeof location === 'object' ? location.name : location}
              </span>
            ))}
            {mentor.locations.length > 2 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                +{mentor.locations.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bio */}
      {bio && (
        <p className="text-sm text-gray-600 mb-6 line-clamp-3">{bio}</p>
      )}

      {/* Achievements */}
      {mentor.achievements && mentor.achievements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h4>
          <ul className="space-y-1">
            {mentor.achievements.slice(0, 2).map((achievement, idx) => (
              <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                <Award className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                {typeof achievement === 'object' ? achievement.title : achievement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* View Details CTA */}
      <div className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors text-center">
        View Details
      </div>
      </motion.div>
    </Link>
  );
}
