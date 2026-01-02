"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { getImageUrl } from "@/lib/utils/imageUtils";
import {
  CoursesHero,
  CourseTabs,
  FeaturedCourses,
  MentorsSection,
  CourseCategories
} from "@/components/courses";
import { getAllCourses, getFeaturedCourses } from "@/lib/api/courses";

export default function CoursesPage() {
  const [onlineCourses, setOnlineCourses] = useState([]);
  const [offlineCourses, setOfflineCourses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [activeFilters, setActiveFilters] = useState(null);
  const [courseType, setCourseType] = useState('online'); // 'online' or 'offline'

  // Transform course data helper
  const transformCourse = (course, isOnline) => ({
            id: course._id || course.id,
            _id: course._id,
            title: course.title,
            description: course.description || '',
            instructor: course.instructor?.userId?.firstName && course.instructor?.userId?.lastName
              ? `${course.instructor.userId.firstName} ${course.instructor.userId.lastName}`
              : course.instructor?.name || 'Instructor',
            instructorImage: course.instructor?.profilePic || null,
            duration: course.duration || 'N/A',
            level: course.level || 'Beginner',
            rating: course.rating || 0,
            studentsCount: course.studentsCount || 0,
            image: getImageUrl(course.image),
            price: course.price || 0,
            originalPrice: course.originalPrice,
            category: course.category?.name || course.category || 'Uncategorized',
            isFeatured: course.isFeatured || false,
    location: isOnline ? 'Online' : (course.location || 'Offline'),
            lessons: course.lessons || course.lectures || 0,
            certificate: course.certificate || false,
            slug: course.slug || course._id || course.id,
            badge: course.isFeatured ? 'Featured' : 'Popular',
            learningObjectives: course.learningObjectives || [],
    skills: course.learningObjectives || [],
    // Offline-specific fields
    maxStudents: course.maxStudents || course.studentsCount || 0,
    startDate: course.startDate || null,
    endDate: course.endDate || null,
    isOnline: isOnline
  });

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
          
        // Fetch both online and offline courses
        const [onlineResponse, offlineResponse] = await Promise.all([
          getAllCourses({ 
            page: 1, 
            limit: 100,
            status: 'active',
            isOnline: 'true'
          }),
          getAllCourses({ 
            page: 1, 
            limit: 100,
            status: 'active',
            isOnline: 'false'
          })
        ]);

        // Process online courses
        if (onlineResponse.success && onlineResponse.data) {
          const onlineCoursesData = onlineResponse.data.filter(course => course.isOnline === true);
          const transformedOnline = onlineCoursesData.map(course => transformCourse(course, true));
          setOnlineCourses(transformedOnline);
        }

        // Process offline courses
        if (offlineResponse.success && offlineResponse.data) {
          const offlineCoursesData = offlineResponse.data.filter(course => course.isOnline === false);
          const transformedOffline = offlineCoursesData.map(course => transformCourse(course, false));
          setOfflineCourses(transformedOffline);
        }

        // Fetch featured courses (both types)
        try {
          const featuredResponse = await getFeaturedCourses();
          if (featuredResponse.success && featuredResponse.data) {
            const transformedFeatured = featuredResponse.data.map(course => 
              transformCourse(course, course.isOnline === true)
            );
            setFeaturedCourses(transformedFeatured);
          }
        } catch (err) {
          console.error('Error fetching featured courses:', err);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle hash navigation (e.g., /courses#instructors)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#instructors') {
      setTimeout(() => {
        const element = document.getElementById('instructors');
        if (element) {
          const offsetTop = element.offsetTop - 100;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  // Combine all courses for filtering
  const allCourses = [...onlineCourses, ...offlineCourses];
  
  // Get current courses based on selected type
  const currentCourses = courseType === 'online' ? onlineCourses : offlineCourses;

  // Generate tabs based on ALL courses (both online and offline) for filtering
  const generateTabs = () => {
    const tabs = [
      { id: 'all', label: 'All Courses', count: allCourses.length }
    ];

    // Add category tabs from all courses
    const categories = [...new Set(allCourses.map(c => c.category))].filter(Boolean);
    categories.forEach(category => {
      const count = allCourses.filter(c => c.category === category).length;
      if (count > 0) {
        tabs.push({ id: category.toLowerCase().replace(/\s+/g, '-'), label: category, count });
      }
    });

    // Add level tabs from all courses
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    levels.forEach(level => {
      const count = allCourses.filter(c => c.level === level).length;
      if (count > 0) {
        tabs.push({ id: level.toLowerCase(), label: level, count });
      }
    });

    // Add featured tab from all courses
    const featuredCount = allCourses.filter(c => c.isFeatured).length;
    if (featuredCount > 0) {
      tabs.push({ id: 'featured', label: 'Featured', count: featuredCount });
    }

    // Add certified tab from all courses
    const certifiedCount = allCourses.filter(c => c.certificate).length;
    if (certifiedCount > 0) {
      tabs.push({ id: 'certified', label: 'Certified', count: certifiedCount });
    }

    return tabs;
  };

  const tabs = generateTabs();

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  const handleFilterChange = useCallback((filters) => {
    setActiveFilters(filters);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && onlineCourses.length === 0 && offlineCourses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Courses</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Get featured courses (both online and offline) - filter out invalid courses
  const allFeaturedCourses = featuredCourses.filter(course => course && course.title);

  return (
    <>
      <CoursesHero content={null} />
      <CourseTabs 
        tabs={tabs}
        courses={currentCourses}
        allCourses={allCourses}
        searchResults={searchResults} 
        activeFilters={activeFilters}
        courseType={courseType}
        onCourseTypeChange={setCourseType}
        onlineCount={onlineCourses.length}
        offlineCount={offlineCourses.length}
        onSearchChange={(query) => {
          if (query) {
            const results = allCourses.filter(course =>
              course.title?.toLowerCase().includes(query.toLowerCase()) ||
              course.category?.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
          } else {
            setSearchResults(null);
          }
        }}
      />
      {allFeaturedCourses.length > 0 && (
        <FeaturedCourses courses={allFeaturedCourses} />
      )}
      <MentorsSection mentors={[]} showLocations={courseType === 'offline'} />
      <CourseCategories courseType={courseType} />
    </>
  );
}
