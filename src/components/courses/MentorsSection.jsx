"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import MentorCard from "./MentorCard";
import { getActiveInstructors } from "@/lib/api/instructors";
import { apiRequest } from "@/lib/api";
import Link from "next/link";

export default function MentorsSection({ mentors: propMentors, showLocations = false }) {
  const [instructors, setInstructors] = useState(propMentors || []);
  const [loading, setLoading] = useState(!propMentors || propMentors.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if no mentors were provided as props
    if (propMentors && propMentors.length > 0) {
      setInstructors(propMentors);
      setLoading(false);
      return;
    }

    const fetchInstructors = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getActiveInstructors();
        
        if (response.success && response.data) {
          // Transform backend instructor data to match component expectations
          const transformedInstructors = await Promise.all(
            response.data.map(async (instructor) => {
              let coursesCount = 0;
              let studentsCount = 0;
              
              try {
                // Fetch courses for this instructor
                const coursesResponse = await apiRequest(`/courses/instructor/${instructor._id}`, {
                  method: 'GET',
                });
                
                if (coursesResponse.success && coursesResponse.data) {
                  coursesCount = coursesResponse.data.length;
                  
                  // Calculate total students from all courses
                  studentsCount = coursesResponse.data.reduce((total, course) => {
                    return total + (course.studentsCount || 0);
                  }, 0);
                }
              } catch (err) {
                // Error fetching courses for instructor
              }
              
              return {
                id: instructor._id,
                _id: instructor._id,
                slug: instructor.slug || instructor._id,
                userId: instructor.userId,
                name: instructor.userId 
                  ? `${instructor.userId.firstName || ''} ${instructor.userId.lastName || ''}`.trim()
                  : 'Instructor',
                profilePic: instructor.profilePic,
                image: instructor.profilePic,
                bio: instructor.bio || '',
                experience: instructor.experience || 0,
                specializations: instructor.specializations || '',
                department: instructor.department || '',
                rating: instructor.rating || 5,
                achievements: instructor.achievements || [],
                certifications: instructor.certifications || [],
                locations: instructor.locations || [],
                studentsCount: studentsCount,
                coursesCount: coursesCount,
                workshopsCount: showLocations ? coursesCount : 0
              };
            })
          );
          
          setInstructors(transformedInstructors);
        }
      } catch (err) {
        setError(err.message || 'Failed to load instructors');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, [propMentors]);

  return (
    <section id="instructors" className="relative py-10 lg:py-12 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-blue-950" />
                </div>
              </motion.div>
              <div className="bg-blue-100 px-4 py-2 rounded-full border border-blue-200">
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                  {showLocations ? "Expert Workshop Instructors" : "Expert Instructors"}
                </span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Learn from Expert Instructors
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our instructors are distinguished BVT officers with decades of real-world experience. 
              {showLocations ? " Learn hands-on skills from the best in state-of-the-art facilities." : " Learn from the best and advance your career with proven strategies and techniques."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Instructors Grid - Enhanced */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-600">{error}</p>
            </div>
          ) : instructors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {instructors.map((instructor, index) => (
                <MentorCard key={instructor.id || instructor._id} mentor={instructor} index={index} showLocations={showLocations} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">No instructors available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action - Enhanced */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
          </motion.div>
        </div>
      </div>
    </section>
  );
}
