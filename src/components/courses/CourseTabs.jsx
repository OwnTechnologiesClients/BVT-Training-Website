"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { OnlineCourseCard } from "./index";

export default function CourseTabs({ 
  tabs, 
  courses, 
  searchResults, 
  activeFilters, 
  courseCardComponent: CourseCardComponent = OnlineCourseCard,
  onSearchChange
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [displayedCount, setDisplayedCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  const getFilteredCourses = () => {
    let filteredCourses = courses;

    // Apply search query filter - only search by course name and category
    if (searchQuery) {
      filteredCourses = filteredCourses.filter(course =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // If there are search results, use those instead
    if (searchResults && searchResults.length > 0) {
      filteredCourses = courses.filter(course => 
        searchResults.some(result => result.id === course.id)
      );
    }

    // Apply tab filtering
    if (activeTab === 'all') {
      return filteredCourses;
    }

    // Check if it's a category tab (match by category name)
    const matchingCategory = filteredCourses.find(c => 
      c.category && c.category.toLowerCase().replace(/\s+/g, '-') === activeTab
    );
    if (matchingCategory) {
      return filteredCourses.filter(course => 
        course.category && course.category.toLowerCase().replace(/\s+/g, '-') === activeTab
      );
    }

    // Check standard filters
    switch (activeTab) {
      case "featured":
        return filteredCourses.filter(course => course.isFeatured);
      case "beginner":
        return filteredCourses.filter(course => course.level === "Beginner");
      case "intermediate":
        return filteredCourses.filter(course => course.level === "Intermediate");
      case "advanced":
        return filteredCourses.filter(course => course.level === "Advanced");
      case "certified":
        return filteredCourses.filter(course => course.certificate);
      default:
        return filteredCourses;
    }
  };

  const filteredCourses = getFilteredCourses();
  
  // Separate tabs into categories and other filters
  const categoryTabs = tabs.filter(tab => {
    // Exclude "all", "featured", "certified", and level tabs
    const isLevel = ['beginner', 'intermediate', 'advanced'].includes(tab.id);
    const isSpecial = ['all', 'featured', 'certified'].includes(tab.id);
    return !isLevel && !isSpecial;
  });
  
  const otherTabs = tabs.filter(tab => {
    const isLevel = ['beginner', 'intermediate', 'advanced'].includes(tab.id);
    const isSpecial = ['featured', 'certified'].includes(tab.id);
    return isLevel || isSpecial;
  });
  
  // Reset displayed count when tab changes or search changes
  useEffect(() => {
    setDisplayedCount(6);
  }, [activeTab, searchResults, searchQuery]);

  // Get courses to display (limited by displayedCount)
  const displayedCourses = filteredCourses.slice(0, displayedCount);
  const hasMore = filteredCourses.length > displayedCount;
  
  // Get selected category for dropdown
  const selectedCategory = categoryTabs.find(tab => tab.id === activeTab);
  
  // Handle category dropdown change
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value) {
      setActiveTab(value);
    } else {
      setActiveTab('all');
    }
  };

  // Handle load more
  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + 6);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Training Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of BVT training courses, 
              categorized for easy navigation and discovery.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search courses by name or category..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
            {/* All Courses Button */}
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'all'
                  ? "bg-blue-900 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              All Courses
              <span className="ml-2 text-xs opacity-75">({tabs.find(t => t.id === 'all')?.count || 0})</span>
            </button>

            {/* Category Dropdown */}
            {categoryTabs.length > 0 && (
              <div className="relative">
                <select
                  value={selectedCategory?.id || ''}
                  onChange={handleCategoryChange}
                  className={`appearance-none px-6 py-3 pr-10 rounded-xl font-medium transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    selectedCategory && activeTab === selectedCategory.id
                      ? "bg-blue-900 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <option value="">Select Category</option>
                  {categoryTabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label} ({tab.count})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className={`w-5 h-5 ${selectedCategory && activeTab === selectedCategory.id ? 'text-white' : 'text-gray-500'}`} />
                </div>
              </div>
            )}

            {/* Other Filter Buttons (Levels, Featured, Certified) */}
            {otherTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-900 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid - Full Width */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        {displayedCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course, index) => (
                <CourseCardComponent key={course.id || course._id || index} course={course} index={index} />
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button 
                onClick={handleLoadMore}
                className="bg-blue-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Load More Courses
              </button>
            </div>
          )}
        </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses found in this category.</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
