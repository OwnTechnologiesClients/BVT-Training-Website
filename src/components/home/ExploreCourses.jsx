"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Award, TrendingUp, Loader2 } from "lucide-react";
import { getFeaturedCourses } from "@/lib/api/courses";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";

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
            image: getImageUrl(course.image) || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
            maxStudents: course.maxStudents || 100,
            slug: course.slug || course._id || course.id
          }));
          
          setCourses(transformedCourses);
        } else {
          // No featured courses available
          setCourses([]);
        }
      } catch (err) {
        console.error('Error fetching featured courses:', err);
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
      <section className="px-8 py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && courses.length === 0) {
    return (
      <section className="px-8 py-20 bg-gray-50">
        <div className="container mx-auto mb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-blue-900" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
              Training Courses
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Training Courses
          </h2>
          <p className="text-red-600">Unable to load courses. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-20 bg-gray-50">
      <div className="container mx-auto mb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
          <Award className="w-4 h-4 text-blue-900" />
          <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
            {courses.length > 0 ? `${courses.length}+ Training Courses` : 'Training Courses'}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore Training Courses
        </h2>
        <p className="mt-2 mx-auto w-full px-4 text-lg text-gray-500 lg:w-6/12 lg:px-8">
          Browse through our comprehensive BVT vocational training courses and find the perfect path 
          for your career advancement.
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all border border-gray-200"
          >
            {/* Course Image with Overlay */}
            <div className={`relative h-56 overflow-hidden`}>
              <img 
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Level Badge - Right Side */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-blue-900 uppercase">{course.level}</span>
              </div>

              {/* Center Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-8xl font-bold">
                  {idx + 1}
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.maxStudents} Max</span>
                </div>
              </div>

              <Link
                href={`/courses/${course.slug}`}
                className="text-gray-900 transition-colors hover:text-blue-900"
              >
                <h3 className="mb-3 text-xl font-bold leading-tight">
                  {course.title}
                </h3>
              </Link>
              
              <p className="mb-6 font-normal text-gray-600 line-clamp-2">
                {course.description}
              </p>
              <Link href={`/courses/${course.slug}`}>
                <button className="w-full bg-gradient-to-r from-blue-900 to-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 group">
                  View Course
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
          </motion.div>
          ))}
        </div>
      ) : (
        <div className="container mx-auto text-center">
          <p className="text-gray-600">No courses available at the moment.</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-gray-600 mb-6">Can't find what you're looking for?</p>
        <Link href="/courses">
          <button className="bg-white border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-900 hover:text-white transition-colors shadow-lg">
            View All Courses
          </button>
        </Link>
      </div>
    </section>
  );
}
