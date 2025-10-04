"use client";

import { motion } from "framer-motion";
import { Star, Users, BookOpen, Award, MapPin, Calendar } from "lucide-react";

export default function MentorCard({ mentor, index, showLocations = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
    >
      {/* Mentor Image */}
      <div className="relative mb-6">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100"
        />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-medium">
            {mentor.experience}+ years
          </div>
        </div>
      </div>

      {/* Mentor Info */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h3>
        <p className="text-blue-900 font-medium mb-2">{mentor.title}</p>
        <p className="text-sm text-gray-600 mb-3">{mentor.specialization}</p>
        
        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm font-medium text-gray-700 ml-2">{mentor.rating}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-gray-900">{mentor.studentsCount}</div>
          <div className="text-xs text-gray-500">Students</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-gray-900">{mentor.coursesCount || mentor.workshopsCount}</div>
          <div className="text-xs text-gray-500">{showLocations ? "Workshops" : "Courses"}</div>
        </div>
      </div>

      {/* Location Info for Offline */}
      {showLocations && mentor.availableLocations && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4 text-blue-900" />
            <span className="font-medium">Available Locations:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {mentor.availableLocations.slice(0, 2).map((location, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs">
                {location}
              </span>
            ))}
            {mentor.availableLocations.length > 2 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                +{mentor.availableLocations.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bio */}
      <p className="text-sm text-gray-600 mb-6 line-clamp-3">{mentor.bio}</p>

      {/* Achievements */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h4>
        <ul className="space-y-1">
          {mentor.achievements.slice(0, 2).map((achievement, idx) => (
            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
              <Award className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      {/* Best Courses/Workshops */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Featured {showLocations ? "Workshops" : "Courses"}:</h4>
        <div className="space-y-2">
          {(mentor.bestCourses || mentor.bestWorkshops).slice(0, 2).map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-xs font-medium text-gray-900 truncate">{item.title}</h5>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{item.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{item.students} students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
        View {showLocations ? "Workshops" : "Courses"}
      </button>
    </motion.div>
  );
}
