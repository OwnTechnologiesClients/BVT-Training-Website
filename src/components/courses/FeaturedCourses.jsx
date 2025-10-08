"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Clock, Users, Award, MapPin, Calendar } from "lucide-react";

export default function FeaturedCourses({ courses }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === courses.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, courses.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? courses.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === courses.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentCourse = courses[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">
                Featured Programs
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Elite Training Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most prestigious and highly-rated BVT training programs, 
              designed for the next generation of BVT leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Container - In Container */}
      <div className="container mx-auto px-4">
        <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-blue-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Course Cards Container */}
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  {/* Course Image */}
                  <div className="relative">
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={currentCourse.image}
                        alt={currentCourse.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Play Button Overlay for Online courses */}
                      {currentCourse.location === "Online" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-6 transition-all duration-300 hover:scale-110">
                            <Play className="w-12 h-12 text-white fill-white" />
                          </button>
                        </div>
                      )}

                      {/* Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {currentCourse.badge}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-bold text-gray-900">{currentCourse.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-6">
                    {/* Category & Level */}
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {currentCourse.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currentCourse.level === 'Advanced' ? 'bg-red-100 text-red-800' :
                        currentCourse.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {currentCourse.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                      {currentCourse.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {currentCourse.description}
                    </p>

                    {/* Instructor */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {currentCourse.instructor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Instructor</div>
                        <div className="text-gray-600">{currentCourse.instructor}</div>
                      </div>
                    </div>

                    {/* Location & Date for Offline courses */}
                    {currentCourse.location !== "Online" && (
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-blue-900" />
                          <span>{currentCourse.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-blue-900" />
                          <span>{currentCourse.startDate} - {currentCourse.endDate}</span>
                        </div>
                      </div>
                    )}

                    {/* Course Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{currentCourse.duration}</div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{currentCourse.studentsCount}</div>
                        <div className="text-sm text-gray-500">
                          {currentCourse.location === "Online" ? "Students" : "Max Students"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
                          {currentCourse.location === "Online" ? (
                            <Play className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {currentCourse.location === "Online" ? currentCourse.lessons : "Hands-on"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {currentCourse.location === "Online" ? "Lessons" : "Training"}
                        </div>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="text-3xl font-bold text-gray-900">${currentCourse.price}</div>
                        <div className="text-sm text-gray-500">
                          {currentCourse.location === "Online" ? "One-time payment" : "Workshop fee"}
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-blue-900 to-blue-950 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-800 hover:to-blue-900 hover:scale-105 transition-all shadow-xl flex items-center gap-2">
                        {currentCourse.location === "Online" ? "Enroll Now" : "Register Now"}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 gap-2">
              {courses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-blue-900 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      {/* View All Button */}
      <div className="container mx-auto px-4 mt-12">
        <div className="text-center">
          <button className="bg-white border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-900 hover:text-white transition-colors shadow-lg">
            View All Featured Courses
          </button>
        </div>
      </div>
    </section>
  );
}
