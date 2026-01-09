"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Award, TrendingUp, Loader2, ArrowRight, Sparkles, BookOpen, Star, Play } from "lucide-react";
import { getFeaturedCourses } from "@/lib/api/courses";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";

export default function ExploreCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        // Only fetch featured courses
        const response = await getFeaturedCourses();
        
        if (response.success && response.data && response.data.length > 0) {
          const transformedCourses = response.data.map(course => ({
            id: course._id || course.id,
            title: course.title,
            description: course.description || '',
            duration: course.duration || 'N/A',
            level: course.level || 'Beginner',
            image: getImageUrl(course.image),
            maxStudents: course.maxStudents || 100,
            slug: course.slug || course._id || course.id
          }));
          
          setCourses(transformedCourses);
        } else {
          // No featured courses available
          setCourses([]);
        }
      } catch (err) {
        setError(err.message || 'Failed to load featured courses');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="relative py-12 bg-gradient-to-b from-white via-blue-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading Featured Courses...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && courses.length === 0) {
    return (
      <section className="relative py-12 bg-gradient-to-b from-white via-blue-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 border-yellow-500/30 mb-4 shadow-lg"
            >
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-700 uppercase tracking-wider">Training Courses</span>
            </motion.div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 bg-clip-text text-transparent mb-3">
              Explore Training Courses
            </h2>
            <p className="text-red-600 bg-red-50 px-6 py-3 rounded-lg border border-red-200 inline-block">
              Unable to load courses. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 bg-gradient-to-b from-white via-blue-50/50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/10 to-yellow-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border-2 border-yellow-500/30 mb-4 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-yellow-600 animate-pulse" />
            <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">
              {courses.length > 0 ? `${courses.length}+ Featured Courses` : 'Featured Courses'}
            </span>
            <Star className="w-4 h-4 text-yellow-600" />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 bg-clip-text text-transparent mb-4">
            Explore Training Courses
          </h2>
          <p className="text-sm md:text-base text-gray-600 lg:w-6/12 max-w-3xl mx-auto leading-relaxed">
            Browse through our comprehensive BVT vocational training courses and find the perfect path 
            for your career advancement.
          </p>
        </motion.div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-10 ">
            {courses.map((course, idx) => (
              <Link key={idx} href={`/courses/${course.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ 
                    default: { delay: idx * 0.1, duration: 0.6, type: "spring" },
                    hover: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  className="group relative h-full bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-yellow-400/50"
                  style={{ willChange: 'transform' }}
                >
                  {/* Course Image - Clear and Prominent */}
                  <div className="relative h-48 lg:h-56 overflow-hidden">
                    {course.image ? (
                      <img 
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover brightness-100 group-hover:brightness-110"
                        style={{ 
                          transform: 'scale(1)',
                          transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), brightness 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const placeholder = e.target.nextElementSibling;
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <ImagePlaceholder 
                      type="course" 
                      className={`w-full h-full ${course.image ? 'hidden' : 'flex'}`}
                      iconClassName="w-12 h-12"
                    />
                    {/* Minimal overlay - only at bottom 30% for text readability, rest of image stays clear */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none"></div>
                    
                    {/* Level Badge - Enhanced */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-yellow-400 px-3 py-1.5 rounded-lg border-2 border-white shadow-xl z-10"
                    >
                      <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                        {course.level}
                      </span>
                    </motion.div>

                    {/* Course Number Badge - Top Left */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-gray-200 shadow-lg z-10">
                      <span className="text-sm font-extrabold text-gray-900">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Play Icon Overlay - Center - Only on hover */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-r from-yellow-500/95 to-yellow-400/95 backdrop-blur-sm p-3 rounded-full shadow-2xl border-3 border-white"
                      >
                        <Play className="w-5 h-5 text-blue-950 fill-blue-950" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4 lg:p-5 bg-gradient-to-b from-white to-blue-50/30">
                    {/* Meta Info - Enhanced */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-900">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-semibold text-green-900">Certificate</span>
                      </div>
                    </div>

                    {/* Course Title */}
                    <h3 className="mb-2 text-base lg:text-lg font-extrabold text-gray-900 leading-tight group-hover:text-blue-900 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    
                    {/* Course Description */}
                    <p className="mb-3 text-xs lg:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    {/* CTA Button - Enhanced */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-4 py-2 rounded-lg font-bold text-sm hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all shadow-lg flex items-center justify-center gap-1.5 group/btn relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                      <span className="relative z-10 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>View Course</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </motion.div>
                  </div>

                    {/* Shine Effect on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 pointer-events-none overflow-hidden"
                    >
                      <motion.div
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      ></motion.div>
                    </motion.div>

                    {/* Decorative Corner Accent */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full"
                    ></motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto text-center py-10"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border-2 border-gray-200 shadow-lg">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 font-medium">No featured courses available at the moment.</p>
            </div>
          </motion.div>
        )}

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl lg:rounded-3xl p-8 lg:p-12 border-2 border-blue-200 shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Explore our complete catalog of training courses
            </p>
            <Link href="/courses">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  <span>View All Courses</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
