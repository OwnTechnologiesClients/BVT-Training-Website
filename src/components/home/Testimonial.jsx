"use client";

import { useState, useEffect } from "react";
import { User, Clock, Users, Award, Loader2, ChevronLeft, ChevronRight, Play, MapPin, Calendar } from "lucide-react";
import { getFeaturedCourses } from "@/lib/api/courses";
import { getImageUrl } from "@/lib/utils/imageUtils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonial() {
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        setLoading(true);
        const response = await getFeaturedCourses();
        
        if (response.success && response.data && response.data.length > 0) {
          const transformedCourses = response.data.map(course => ({
            id: course._id || course.id,
            title: course.title,
            description: course.description || '',
            duration: course.duration || 'N/A',
            level: course.level || 'Beginner',
            image: getImageUrl(course.image) || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
            instructor: course.instructor?.userId 
              ? `${course.instructor.userId.firstName || ''} ${course.instructor.userId.lastName || ''}`.trim()
              : course.instructor?.name || 'TBA',
            instructorImage: course.instructor?.profilePic ? getImageUrl(course.instructor.profilePic) : null,
            slug: course.slug || course._id || course.id,
            category: course.category?.name || 'Training',
            studentsCount: course.studentsCount || 0,
            location: course.location || (course.isOnline ? 'Online' : 'Offline'),
            price: course.price || 0,
            lessons: course.lessons?.length || course.lessonCount || 0,
            badge: course.isFeatured ? 'Featured' : null,
            startDate: course.startDate
          }));
          
          setCourses(transformedCourses);
          setFeaturedCourse(transformedCourses[0]);
        }
      } catch (err) {
        console.error('Error fetching featured courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      setFeaturedCourse(courses[currentIndex]);
    }
  }, [currentIndex, courses]);

  const nextCourse = () => {
    setCurrentIndex((prev) => (prev + 1) % courses.length);
  };

  const prevCourse = () => {
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  if (loading) {
    return (
      <section className="px-8 py-40 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
          </div>
        </div>
      </section>
    );
  }

  if (!featuredCourse) {
    return null;
  }

  return (
    <section className="px-8 py-40 bg-white">
      <div className="container mx-auto">
        <div className="col-span-full gap-10 place-items-center overflow-visible grid grid-cols-1 lg:grid-cols-4 relative">
          {/* Navigation Arrows */}
          {courses.length > 1 && (
            <>
              <button
                onClick={prevCourse}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 hidden lg:flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextCourse}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 hidden lg:flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Section */}
          <div className="w-full xl:w-[600px] flex items-center overflow-hidden rounded-xl justify-center col-span-2 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredCourse.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[400px] rounded-xl overflow-hidden border-2 border-yellow-600/30"
              >
              <img 
                  src={featuredCourse.image}
                  alt={featuredCourse.title}
                className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop';
                  }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-3xl font-bold">{featuredCourse.title}</div>
                <div className="text-sm text-yellow-500 mt-1">Professional Training Program</div>
              </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content Section */}
          <div className="col-span-2 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredCourse.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
            <p className="mb-4 text-sm font-bold text-blue-900 uppercase tracking-wide">
                  FEATURED COURSE
            </p>
            
            <h3 className="mb-4 font-bold text-3xl text-gray-900">
                  {featuredCourse.title}
            </h3>
            
                <p className="mb-1 w-full font-normal text-gray-500 line-clamp-3">
                  {featuredCourse.description || 'Become a versatile BVT professional by combining technical expertise with operational knowledge. Master all aspects of modern BVT operations.'}
            </p>

                <div className="grid mb-4 mt-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 bg-gray-500 rounded-full" />
                <p className="w-full font-normal text-gray-500">
                      {featuredCourse.category} Training
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 bg-gray-500 rounded-full" />
                <p className="w-full font-normal text-gray-500">
                      {featuredCourse.duration} Duration
                    </p>
                  </div>
                  {featuredCourse.studentsCount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 bg-gray-500 rounded-full" />
                      <p className="w-full font-normal text-gray-500">
                        {featuredCourse.studentsCount} Students Enrolled
                </p>
              </div>
                  )}
            </div>

            <div className="flex items-center mt-8 gap-4">
                  {featuredCourse.instructorImage ? (
                    <img 
                      src={featuredCourse.instructorImage}
                      alt={featuredCourse.instructor}
                      className="w-12 h-12 rounded-full object-cover border-2 border-yellow-600"
                    />
                  ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center border-2 border-yellow-600">
                <User className="w-6 h-6 text-yellow-500" />
              </div>
                  )}
              <div>
                <h4 className="mb-0.5 text-lg font-bold text-gray-900">
                      {featuredCourse.instructor}
                </h4>
                <p className="font-normal text-sm text-gray-500">
                      Course Instructor
                </p>
              </div>
            </div>

                <div className="mt-6">
                  <Link href={`/courses/${featuredCourse.slug}`}>
                    <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                      View Course Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            {courses.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {courses.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-blue-900 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

