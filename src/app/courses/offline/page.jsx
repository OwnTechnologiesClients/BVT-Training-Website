"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import {
  CoursesHero,
  CourseTabs,
  FeaturedCourses,
  MentorsSection,
  OfflineCourseCategories,
  OfflineCourseCard
} from "@/components/courses";
import { getAllCourses, getFeaturedCourses } from "@/lib/api/courses";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function OfflineCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [activeFilters, setActiveFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Fetch offline courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch offline courses (isOnline: false)
        const coursesResponse = await getAllCourses({ 
          page: 1, 
          limit: 100,
          status: 'active',
          isOnline: 'false'
        });

        if (coursesResponse.success && coursesResponse.data) {
          // Transform backend data to match frontend format
          // Backend should already filter by isOnline=false, but filter again as fallback
          const offlineCourses = coursesResponse.data.filter(course => course.isOnline === false);
          const transformedCourses = offlineCourses.map(course => ({
            id: course._id || course.id,
            _id: course._id,
            title: course.title,
            description: course.description || '',
            instructor: course.instructor?.userId?.firstName && course.instructor?.userId?.lastName
              ? `${course.instructor.userId.firstName} ${course.instructor.userId.lastName}`
              : course.instructor?.name || 'Instructor',
            duration: course.duration || 'N/A',
            level: course.level || 'Beginner',
            rating: course.rating || 0,
            studentsCount: course.studentsCount || course.maxStudents || 0,
            image: getImageUrl(course.image),
            price: course.price || 0,
            originalPrice: course.originalPrice,
            category: course.category?.name || course.category || 'Uncategorized',
            isFeatured: course.isFeatured || false,
            location: course.isOnline ? 'Online' : course.location || 'Offline',
            lessons: course.lessons || course.lectures || 0,
            certificate: course.certificate || false,
            slug: course.slug || course._id || course.id,
            badge: course.isFeatured ? 'Featured' : 'Popular',
            skills: course.learningObjectives || course.skills || [],
            students: course.maxStudents || course.studentsCount || 0,
            instructorImage: course.instructor?.profilePic || null,
            startDate: course.startDate || null,
            endDate: course.endDate || null
          }));

          setCourses(transformedCourses);
          
          // Check if there are more pages
          if (coursesResponse.pagination) {
            setHasMore(
              coursesResponse.pagination.page < coursesResponse.pagination.totalPages
            );
          }
        }

        // Fetch featured offline courses
        try {
          const featuredResponse = await getFeaturedCourses();
          if (featuredResponse.success && featuredResponse.data) {
            // Filter only offline courses
            const offlineFeatured = featuredResponse.data.filter(course => !course.isOnline);
            const transformedFeatured = offlineFeatured.map(course => ({
              id: course._id || course.id,
              _id: course._id,
              title: course.title,
              description: course.description || '',
              instructor: course.instructor?.userId?.firstName && course.instructor?.userId?.lastName
                ? `${course.instructor.userId.firstName} ${course.instructor.userId.lastName}`
                : course.instructor?.name || 'Instructor',
              duration: course.duration || 'N/A',
              level: course.level || 'Beginner',
              rating: course.rating || 0,
              studentsCount: course.studentsCount || course.maxStudents || 0,
              image: getImageUrl(course.image),
              price: course.price || 0,
              category: course.category?.name || course.category || 'Uncategorized',
              isFeatured: true,
              lessons: course.lessons || course.lectures || 0,
              certificate: course.certificate || false,
              slug: course.slug || course._id || course.id,
              badge: 'Featured',
              location: course.location || 'Offline',
              skills: course.learningObjectives || course.skills || [],
              students: course.maxStudents || course.studentsCount || 0,
              instructorImage: course.instructor?.profilePic || null,
              startDate: course.startDate || null,
              endDate: course.endDate || null
            }));
            setFeaturedCourses(transformedFeatured);
          }
        } catch (err) {
          console.error('Error fetching featured offline courses:', err);
          // Don't fail the whole page if featured courses fail
        }
      } catch (err) {
        console.error('Error fetching offline courses:', err);
        setError(err.message || 'Failed to load offline courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Generate tabs based on actual course data
  const generateTabs = () => {
    const tabs = [
      { id: 'all', label: 'All Courses', count: courses.length }
    ];

    // Add category tabs
    const categories = [...new Set(courses.map(c => c.category))].filter(Boolean);
    categories.forEach(category => {
      const count = courses.filter(c => c.category === category).length;
      if (count > 0) {
        tabs.push({ id: category.toLowerCase().replace(/\s+/g, '-'), label: category, count });
      }
    });

    // Add level tabs
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    levels.forEach(level => {
      const count = courses.filter(c => c.level === level).length;
      if (count > 0) {
        tabs.push({ id: level.toLowerCase(), label: level, count });
      }
    });

    // Add featured tab
    const featuredCount = courses.filter(c => c.isFeatured).length;
    if (featuredCount > 0) {
      tabs.push({ id: 'featured', label: 'Featured', count: featuredCount });
    }

    // Add certified tab
    const certifiedCount = courses.filter(c => c.certificate).length;
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
          <p className="text-gray-600">Loading offline courses...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && courses.length === 0) {
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

  return (
    <>
      <CoursesHero content={null} />
      <CourseTabs 
        tabs={tabs}
        courses={courses}
        searchResults={searchResults} 
        activeFilters={activeFilters}
        courseCardComponent={OfflineCourseCard}
        onSearchChange={(query) => {
          if (query) {
            const results = courses.filter(course =>
              course.title?.toLowerCase().includes(query.toLowerCase()) ||
              course.category?.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
          } else {
            setSearchResults(null);
          }
        }}
      />
      {featuredCourses.length > 0 && (
        <FeaturedCourses courses={featuredCourses} />
      )}
      <MentorsSection mentors={[]} showLocations={true} />
      <OfflineCourseCategories />
    </>
  );
}