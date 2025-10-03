"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Clock, Users, Award, Play } from "lucide-react";

const FEATURED_COURSES = [
  {
    id: 1,
    title: "Advanced Naval Warfare Strategies",
    description: "Master the art of naval warfare with cutting-edge strategies, tactical planning, and modern combat techniques.",
    instructor: "Admiral Sarah Mitchell",
    duration: "16 weeks",
    studentsCount: 250,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=600&h=400&fit=crop",
    price: 799,
    category: "Advanced Warfare",
    badge: "Most Popular",
    lessons: 32,
    certificate: true,
    level: "Advanced"
  },
  {
    id: 2,
    title: "Submarine Command Operations",
    description: "Comprehensive training for submarine commanders covering underwater navigation, crew management, and tactical operations.",
    instructor: "Commander James Rodriguez",
    duration: "20 weeks",
    studentsCount: 85,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    price: 999,
    category: "Submarine Operations",
    badge: "Elite Training",
    lessons: 40,
    certificate: true,
    level: "Advanced"
  },
  {
    id: 3,
    title: "Cyber Defense for Naval Networks",
    description: "Protect naval communications and systems from cyber threats with advanced security protocols and digital warfare techniques.",
    instructor: "Lieutenant Commander Elena Chen",
    duration: "12 weeks",
    studentsCount: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    price: 649,
    category: "Cyber Security",
    badge: "Hot Course",
    lessons: 24,
    certificate: true,
    level: "Intermediate"
  },
  {
    id: 4,
    title: "Leadership Excellence Program",
    description: "Develop exceptional leadership skills with our comprehensive program designed for senior naval officers and future commanders.",
    instructor: "Vice Admiral Michael Thompson",
    duration: "18 weeks",
    studentsCount: 120,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    price: 899,
    category: "Leadership",
    badge: "Executive Level",
    lessons: 36,
    certificate: true,
    level: "Advanced"
  },
  {
    id: 5,
    title: "Aircraft Carrier Flight Operations",
    description: "Master the complex world of aircraft carrier operations including flight deck management, aircraft handling, and logistics coordination.",
    instructor: "Captain Lisa Wang",
    duration: "14 weeks",
    studentsCount: 95,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    price: 749,
    category: "Flight Operations",
    badge: "Specialized",
    lessons: 28,
    certificate: true,
    level: "Intermediate"
  }
];

export default function FeaturedCourses() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === FEATURED_COURSES.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? FEATURED_COURSES.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === FEATURED_COURSES.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

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
              Discover our most prestigious and highly-rated naval training programs, 
              designed for the next generation of naval leaders.
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
                        src={FEATURED_COURSES[currentIndex].image}
                        alt={FEATURED_COURSES[currentIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-6 transition-all duration-300 hover:scale-110">
                          <Play className="w-12 h-12 text-white fill-white" />
                        </button>
                      </div>

                      {/* Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {FEATURED_COURSES[currentIndex].badge}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-bold text-gray-900">{FEATURED_COURSES[currentIndex].rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-6">
                    {/* Category & Level */}
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {FEATURED_COURSES[currentIndex].category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        FEATURED_COURSES[currentIndex].level === 'Advanced' ? 'bg-red-100 text-red-800' :
                        FEATURED_COURSES[currentIndex].level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {FEATURED_COURSES[currentIndex].level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                      {FEATURED_COURSES[currentIndex].title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {FEATURED_COURSES[currentIndex].description}
                    </p>

                    {/* Instructor */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {FEATURED_COURSES[currentIndex].instructor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Instructor</div>
                        <div className="text-gray-600">{FEATURED_COURSES[currentIndex].instructor}</div>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{FEATURED_COURSES[currentIndex].duration}</div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{FEATURED_COURSES[currentIndex].studentsCount}</div>
                        <div className="text-sm text-gray-500">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-900 mb-1">
                          <Play className="w-4 h-4" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{FEATURED_COURSES[currentIndex].lessons}</div>
                        <div className="text-sm text-gray-500">Lessons</div>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="text-3xl font-bold text-gray-900">${FEATURED_COURSES[currentIndex].price}</div>
                        <div className="text-sm text-gray-500">One-time payment</div>
                      </div>
                      <button className="bg-gradient-to-r from-blue-900 to-blue-950 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-800 hover:to-blue-900 hover:scale-105 transition-all shadow-xl flex items-center gap-2">
                        Enroll Now
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
              {FEATURED_COURSES.map((_, index) => (
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
