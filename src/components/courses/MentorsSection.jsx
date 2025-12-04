"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Award, Star, BookOpen, MapPin, TrendingUp, Loader2, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
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
                console.error(`Error fetching courses for instructor ${instructor._id}:`, err);
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
        console.error('Error fetching instructors:', err);
        setError(err.message || 'Failed to load instructors');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, [propMentors]);

  const stats = showLocations ? [
    { icon: Users, value: "15+", label: "Expert Instructors", color: "from-blue-500 to-blue-600" },
    { icon: MapPin, value: "6+", label: "Training Locations", color: "from-green-500 to-green-600" },
    { icon: Star, value: "4.8/5", label: "Average Rating", color: "from-yellow-500 to-yellow-600" },
    { icon: BookOpen, value: "50+", label: "Workshops Available", color: "from-purple-500 to-purple-600" }
  ] : [
    { icon: Users, value: "15+", label: "Expert Instructors", color: "from-blue-500 to-blue-600" },
    { icon: Award, value: "200+", label: "Years Combined Experience", color: "from-yellow-500 to-yellow-600" },
    { icon: Star, value: "4.8/5", label: "Average Instructor Rating", color: "from-green-500 to-green-600" },
    { icon: BookOpen, value: "1,200+", label: "Courses Taught", color: "from-purple-500 to-purple-600" }
  ];

  return (
    <section id="instructors" className="relative py-16 lg:py-20 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
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

      {/* Mentor Stats - Enhanced */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group text-center p-4 lg:p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all"
                >
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-1">{stat.value}</div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
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
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border-2 border-yellow-400/30">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  {showLocations ? "Ready to Learn Hands-On?" : "Ready to Learn from the Best?"}
                </h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                  {showLocations ? 
                    "Join hundreds of BVT personnel who have advanced their careers through our expert-led offline training programs. Experience real-world training with state-of-the-art equipment." :
                    "Join thousands of BVT personnel who have advanced their careers through our expert-led training programs. Start your journey with world-class instructors."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/instructors">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-8 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <Users className="w-5 h-5" />
                      Meet All Instructors
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link href="/courses">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-yellow-600 text-yellow-500 px-8 py-4 rounded-xl font-bold hover:bg-yellow-600 hover:text-blue-950 transition-all flex items-center justify-center gap-2"
                    >
                      <TrendingUp className="w-5 h-5" />
                      {showLocations ? "Browse Workshops" : "Browse Courses"}
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
