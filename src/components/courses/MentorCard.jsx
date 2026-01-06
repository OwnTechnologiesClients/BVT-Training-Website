"use client";

import { motion } from "framer-motion";
import { Star, BookOpen, Award, MapPin, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";

export default function MentorCard({ mentor, index, showLocations = false }) {
  // Transform backend instructor data to match component expectations
  const instructorName = mentor.userId 
    ? `${mentor.userId.firstName || ''} ${mentor.userId.lastName || ''}`.trim()
    : mentor.name || 'Instructor';
  
  const instructorImageUrl = mentor.profilePic ? getImageUrl(mentor.profilePic) : null;
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative bg-white rounded-2xl lg:rounded-3xl p-6 shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all overflow-hidden cursor-pointer h-full flex flex-col"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 border-2 border-blue-600 rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Instructor Image */}
          <div className="relative mb-6 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full mx-auto overflow-hidden border-4 border-gradient-to-r from-yellow-400 to-yellow-600 bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5">
                {instructorImageUrl ? (
                  <img
                    src={instructorImageUrl}
                    alt={instructorName}
                    className="w-full h-full rounded-full object-cover bg-white"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const placeholder = e.target.nextElementSibling;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-full h-full rounded-full ${instructorImageUrl ? 'hidden' : 'flex'}`}>
                  <ImagePlaceholder type="instructor" className="w-full h-full rounded-full" iconClassName="w-8 h-8" />
                </div>
              </div>
              {experience > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border-2 border-white">
                    {experience}+ years
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Instructor Info */}
          <div className="text-center mb-6 flex-1">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{instructorName}</h3>
            {department && (
              <p className="text-blue-900 font-semibold mb-2 text-sm lg:text-base">{getDepartmentName(department)}</p>
            )}
            {specializations && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{specializations}</p>
            )}
            
            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + i * 0.05 }}
                >
                  <Star className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                </motion.div>
              ))}
              <span className="text-sm font-semibold text-gray-700 ml-2">{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold text-gray-900">{mentor.coursesCount || mentor.workshopsCount || 0}</div>
                <div className="text-xs text-gray-600 font-medium">{showLocations ? "Workshops" : "Courses"}</div>
              </div>
              {mentor.studentsCount > 0 && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
                    <Star className="w-4 h-4" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">{mentor.studentsCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 font-medium">Students</div>
                </div>
              )}
            </div>
          </div>

          {/* Location Info for Offline */}
          {showLocations && mentor.locations && mentor.locations.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 text-blue-900" />
                <span className="font-semibold">Available Locations:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mentor.locations.slice(0, 2).map((location, idx) => (
                  <span key={idx} className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                    {typeof location === 'object' ? location.name : location}
                  </span>
                ))}
                {mentor.locations.length > 2 && (
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    +{mentor.locations.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bio */}
          {bio && (
            <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-1">{bio}</p>
          )}

          {/* Achievements */}
          {mentor.achievements && mentor.achievements.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Key Achievements:
              </h4>
              <ul className="space-y-1.5">
                {mentor.achievements.slice(0, 2).map((achievement, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{typeof achievement === 'object' ? achievement.title : achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* View Details CTA */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-auto bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg text-center flex items-center justify-center gap-2"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </motion.div>
    </Link>
  );
}
