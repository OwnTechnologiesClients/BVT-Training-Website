"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Clock, Users, Award, MapPin, Calendar, Play, Sparkles, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function FeaturedCourses({ courses }) {
  const { isAuthenticated } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter out any invalid courses
  const validCourses = courses?.filter(course => course && course.title) || [];

  // Reset index if it's out of bounds when courses change
  useEffect(() => {
    if (currentIndex >= validCourses.length && validCourses.length > 0) {
      setCurrentIndex(0);
    }
  }, [validCourses.length, currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying || validCourses.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === validCourses.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, validCourses.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    if (validCourses.length === 0) return;
    setCurrentIndex(currentIndex === 0 ? validCourses.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    if (validCourses.length === 0) return;
    setCurrentIndex(currentIndex === validCourses.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    if (index >= 0 && index < validCourses.length) {
      setCurrentIndex(index);
    }
  };

  if (!validCourses || validCourses.length === 0) return null;

  const currentCourse = validCourses[currentIndex];
  
  if (!currentCourse || !currentCourse.title) return null;
  
  const imageUrl = getImageUrl(currentCourse.image) || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop';

  return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-br from-white via-blue-50/50 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-blue-950" />
                </div>
              </motion.div>
              <div className="bg-blue-100 px-3 py-1.5 rounded-full border border-blue-200">
                <span className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Featured Courses</span>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Elite Training Courses
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-3"></div>
            <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most prestigious and highly-rated BVT training courses.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Navigation Arrows - Smaller */}
            <motion.button
              onClick={goToPrevious}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-[-20px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 rounded-full shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition-all flex items-center justify-center border-2 border-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-[-20px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 rounded-full shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition-all flex items-center justify-center border-2 border-white"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Course Cards Container */}
            <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden h-[420px] lg:h-[380px]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                    {/* Course Image */}
                    <div className="relative h-48 lg:h-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-950">
                      <img
                        src={imageUrl}
                        alt={currentCourse.title || 'Course'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop';
                        }}
                        loading="eager"
                        fetchPriority="high"
                      />
                      
                      {/* Badges Overlay */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
                        >
                          <Award className="w-3 h-3" />
                          Featured
                        </motion.span>
                        {currentCourse.level && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                            currentCourse.level === 'Advanced' ? 'bg-red-500 text-white' :
                            currentCourse.level === 'Intermediate' ? 'bg-yellow-500 text-white' :
                            'bg-green-500 text-white'
                          }`}>
                            {currentCourse.level}
                          </span>
                        )}
                      </div>

                      {/* Category Badge */}
                      {currentCourse.category && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm text-blue-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {currentCourse.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Course Details */}
                    <div className="p-4 lg:p-6 flex flex-col justify-between h-full">
                      {/* Top Section */}
                      <div className="flex-1 flex flex-col">
                        {/* Title */}
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                          {currentCourse.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-4 line-clamp-2">
                          {currentCourse.description && currentCourse.description.length > 100
                            ? `${currentCourse.description.substring(0, 100)}...`
                            : currentCourse.description || 'No description available'}
                        </p>

                        {/* Instructor */}
                        <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <span className="text-xs font-bold text-white">
                              {currentCourse.instructor?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'IN'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500 mb-0.5">Instructor</div>
                            <div className="text-sm font-semibold text-gray-900 truncate">
                              {currentCourse.instructor || 'TBA'}
                            </div>
                          </div>
                        </div>

                        {/* Course Stats */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                            <Clock className="w-4 h-4 text-blue-900 mx-auto mb-1" />
                            <div className="text-sm font-bold text-gray-900">{currentCourse.duration || 'N/A'}</div>
                            <div className="text-xs text-gray-500">Duration</div>
                          </div>
                          <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                            <MapPin className="w-4 h-4 text-blue-900 mx-auto mb-1" />
                            <div className="text-sm font-bold text-gray-900">
                              {currentCourse.isOnline ? 'Online' : 'Offline'}
                            </div>
                            <div className="text-xs text-gray-500">Location</div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section - Price and CTA in Same Line */}
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-shrink-0">
                            {currentCourse.price ? (
                              <>
                                <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                                  ${currentCourse.price}
                                </div>
                                {currentCourse.originalPrice && currentCourse.originalPrice > currentCourse.price && (
                                  <div className="text-xs text-gray-500 line-through">${currentCourse.originalPrice}</div>
                                )}
                              </>
                            ) : (
                              <div className="text-lg lg:text-xl font-bold text-green-600">Free</div>
                            )}
                          </div>
                          <Link href={`/courses/${currentCourse.slug || currentCourse.id}`} className="flex-shrink-0">
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-6 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                            >
                              {currentCourse.isOnline ? "Enroll Now" : "Register Now"}
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator - Smaller */}
            <div className="flex justify-center mt-4 gap-2">
              {validCourses.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 scale-125 shadow-md'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Course Counter */}
            <div className="text-center mt-4">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 border border-gray-200 shadow-sm">
                {currentIndex + 1} of {validCourses.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
