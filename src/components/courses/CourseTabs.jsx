"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, Sparkles, Filter, X } from "lucide-react";
import CourseCard from "./CourseCard";

export default function CourseTabs({ 
  tabs, 
  courses, 
  allCourses = [], // All courses (both online and offline) for filtering
  searchResults, 
  activeFilters, 
  courseType = 'online',
  onCourseTypeChange,
  onlineCount = 0,
  offlineCount = 0,
  onSearchChange
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [displayedCount, setDisplayedCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  // Get filtered courses for a specific type (online/offline) based on current filters
  const getFilteredCoursesByType = (type) => {
    // Start with all courses (both online and offline) for filtering
    let filteredCourses = allCourses.length > 0 ? allCourses : courses;

    // Apply search query filter
    if (searchQuery) {
      filteredCourses = filteredCourses.filter(course =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // If there are search results, use those instead
    if (searchResults && searchResults.length > 0) {
      filteredCourses = (allCourses.length > 0 ? allCourses : courses).filter(course => 
        searchResults.some(result => result.id === course.id)
      );
    }

    // Apply tab filtering
    if (activeTab === 'all') {
      // Filter by course type
      return filteredCourses.filter(course => 
        type === 'online' ? course.isOnline !== false : course.isOnline === false
      );
    }

    // Check if it's a category tab
    const matchingCategory = filteredCourses.find(c => 
      c.category && c.category.toLowerCase().replace(/\s+/g, '-') === activeTab
    );
    if (matchingCategory) {
      const categoryFiltered = filteredCourses.filter(course => 
        course.category && course.category.toLowerCase().replace(/\s+/g, '-') === activeTab
      );
      // Filter by course type
      return categoryFiltered.filter(course => 
        type === 'online' ? course.isOnline !== false : course.isOnline === false
      );
    }

    // Check standard filters
    let result = filteredCourses;
    switch (activeTab) {
      case "featured":
        result = filteredCourses.filter(course => course.isFeatured);
        break;
      case "beginner":
        result = filteredCourses.filter(course => course.level === "Beginner");
        break;
      case "intermediate":
        result = filteredCourses.filter(course => course.level === "Intermediate");
        break;
      case "advanced":
        result = filteredCourses.filter(course => course.level === "Advanced");
        break;
      case "certified":
        result = filteredCourses.filter(course => course.certificate);
        break;
      default:
        result = filteredCourses;
    }
    
    // Filter by course type
    return result.filter(course => 
      type === 'online' ? course.isOnline !== false : course.isOnline === false
    );
  };

  // Calculate filtered counts for online and offline tabs
  const filteredOnlineCount = getFilteredCoursesByType('online').length;
  const filteredOfflineCount = getFilteredCoursesByType('offline').length;

  const getFilteredCourses = () => {
    // Start with all courses (both online and offline) for filtering
    let filteredCourses = allCourses.length > 0 ? allCourses : courses;

    // Apply search query filter
    if (searchQuery) {
      filteredCourses = filteredCourses.filter(course =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // If there are search results, use those instead
    if (searchResults && searchResults.length > 0) {
      filteredCourses = (allCourses.length > 0 ? allCourses : courses).filter(course => 
        searchResults.some(result => result.id === course.id)
      );
    }

    // Apply tab filtering
    if (activeTab === 'all') {
      // Filter by course type after applying other filters
      return filteredCourses.filter(course => 
        courseType === 'online' ? course.isOnline !== false : course.isOnline === false
      );
    }

    // Check if it's a category tab
    const matchingCategory = filteredCourses.find(c => 
      c.category && c.category.toLowerCase().replace(/\s+/g, '-') === activeTab
    );
    if (matchingCategory) {
      const categoryFiltered = filteredCourses.filter(course => 
        course.category && course.category.toLowerCase().replace(/\s+/g, '-') === activeTab
      );
      // Filter by course type
      return categoryFiltered.filter(course => 
        courseType === 'online' ? course.isOnline !== false : course.isOnline === false
      );
    }

    // Check standard filters
    let result = filteredCourses;
    switch (activeTab) {
      case "featured":
        result = filteredCourses.filter(course => course.isFeatured);
        break;
      case "beginner":
        result = filteredCourses.filter(course => course.level === "Beginner");
        break;
      case "intermediate":
        result = filteredCourses.filter(course => course.level === "Intermediate");
        break;
      case "advanced":
        result = filteredCourses.filter(course => course.level === "Advanced");
        break;
      case "certified":
        result = filteredCourses.filter(course => course.certificate);
        break;
      default:
        result = filteredCourses;
    }
    
    // Filter by course type
    return result.filter(course => 
      courseType === 'online' ? course.isOnline !== false : course.isOnline === false
    );
  };

  const filteredCourses = getFilteredCourses();
  
  // Separate tabs into categories and other filters
  const categoryTabs = tabs.filter(tab => {
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
    setDisplayedCount(8);
  }, [activeTab, searchQuery]);
  
  // Reset search when course type changes
  useEffect(() => {
    setSearchQuery('');
    if (onSearchChange) {
      onSearchChange('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseType]);

  // Get courses to display
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
    setDisplayedCount(prev => prev + 8);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  return (
    <section className="relative py-10 lg:py-12 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
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
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Browse Courses</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Browse Training Courses
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive collection of BVT training courses, 
              categorized for easy navigation and discovery.
            </p>
          </motion.div>

          {/* Search Bar - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 max-w-3xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <Search className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search courses by name or category..."
                className="w-full pl-14 pr-12 py-4 lg:py-5 rounded-2xl bg-white border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-lg text-gray-900 text-base lg:text-lg transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center z-10"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
              )}
            </div>
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-sm text-gray-600 text-center"
              >
                Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </motion.p>
            )}
          </motion.div>

          {/* Tab Navigation - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-4">
              {/* All Courses Button */}
              <motion.button
                onClick={() => setActiveTab('all')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === 'all'
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 border-2 border-gray-200 hover:border-yellow-400"
                }`}
              >
                All Courses
                <span className={`ml-2 text-xs lg:text-sm ${activeTab === 'all' ? 'opacity-90' : 'opacity-75'}`}>
                  ({tabs.find(t => t.id === 'all')?.count || 0})
                </span>
              </motion.button>

              {/* Category Dropdown */}
              {categoryTabs.length > 0 && (
                <div className="relative">
                  <select
                    value={selectedCategory?.id || ''}
                    onChange={handleCategoryChange}
                    className={`appearance-none px-6 py-3 lg:px-8 lg:py-4 pr-12 rounded-xl lg:rounded-2xl font-bold transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 border-2 ${
                      selectedCategory && activeTab === selectedCategory.id
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 shadow-lg border-yellow-600"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-yellow-400"
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categoryTabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label} ({tab.count})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown className={`w-5 h-5 ${selectedCategory && activeTab === selectedCategory.id ? 'text-blue-950' : 'text-gray-500'}`} />
                  </div>
                </div>
              )}

              {/* Other Filter Buttons */}
              {otherTabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 shadow-lg transform scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 border-2 border-gray-200 hover:border-yellow-400"
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 text-xs lg:text-sm ${activeTab === tab.id ? 'opacity-90' : 'opacity-75'}`}>
                    ({tab.count})
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Course Type Tabs - Online/Offline - Below Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8"
          >
            <div className="flex justify-center items-center gap-4">
              <motion.button
                onClick={() => onCourseTypeChange && onCourseTypeChange('online')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 lg:px-10 lg:py-4 rounded-xl lg:rounded-2xl font-bold transition-all duration-300 ${
                  courseType === 'online'
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 border-2 border-gray-200 hover:border-blue-400"
                }`}
              >
                Online Courses
                <span className={`ml-2 text-xs lg:text-sm ${courseType === 'online' ? 'opacity-90' : 'opacity-75'}`}>
                  ({filteredOnlineCount})
                </span>
              </motion.button>
              <motion.button
                onClick={() => onCourseTypeChange && onCourseTypeChange('offline')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 lg:px-10 lg:py-4 rounded-xl lg:rounded-2xl font-bold transition-all duration-300 ${
                  courseType === 'offline'
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 border-2 border-gray-200 hover:border-yellow-400"
                }`}
              >
                Offline Courses
                <span className={`ml-2 text-xs lg:text-sm ${courseType === 'offline' ? 'opacity-90' : 'opacity-75'}`}>
                  ({filteredOfflineCount})
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Course Grid - Full Width */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {displayedCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {displayedCourses.map((course, index) => (
                <CourseCard key={course.id || course._id || index} course={course} index={index} />
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12 lg:mt-16"
            >
              <motion.button
                onClick={handleLoadMore}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-8 lg:px-12 py-4 lg:py-5 rounded-xl lg:rounded-2xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl"
              >
                Load More Courses ({filteredCourses.length - displayedCount} remaining)
              </motion.button>
            </motion.div>
          )}
        </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 lg:py-16"
          >
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border-2 border-gray-200 max-w-md mx-auto">
              <p className="text-gray-500 text-lg lg:text-xl mb-4">No courses found in this category.</p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-blue-900 hover:text-blue-700 font-semibold underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
