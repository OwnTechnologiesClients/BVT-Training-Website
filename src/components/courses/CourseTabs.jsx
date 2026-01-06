"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown, Sparkles, Filter, X } from "lucide-react";
import CourseCard from "./CourseCard";

export default function CourseTabs({ 
  tabs, 
  courses, 
  allCourses = [], // All courses (both online and offline) for filtering
  allCoursesForTabs = [], // All courses without category filter for "All Courses" tab
  searchResults, 
  activeFilters, 
  courseType = 'online',
  onCourseTypeChange,
  onlineCount = 0,
  offlineCount = 0,
  onSearchChange,
  selectedCategorySlug = null,
  selectedCategoryName = null
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromUrl = searchParams.get('category');
  
  // Initialize activeTab from URL category if present
  const getInitialTab = () => {
    if (categoryFromUrl) {
      // Find matching tab by slug or name
      const matchingTab = tabs.find(tab => 
        tab.id === categoryFromUrl || 
        tab.label.toLowerCase().replace(/\s+/g, '-') === categoryFromUrl.toLowerCase()
      );
      if (matchingTab) {
        return matchingTab.id;
      }
      // Try to match by category name in courses
      const matchingCourse = allCourses.find(c => 
        c.category && (c.category.toLowerCase().replace(/\s+/g, '-') === categoryFromUrl.toLowerCase() ||
        c.category.toLowerCase() === categoryFromUrl.toLowerCase())
      );
      if (matchingCourse) {
        return matchingCourse.category.toLowerCase().replace(/\s+/g, '-');
      }
    }
    return "all";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [displayedCount, setDisplayedCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  // Update activeTab when category from URL changes
  useEffect(() => {
    // Priority 1: Use selectedCategorySlug if provided (from parent)
    if (selectedCategorySlug) {
      // Find matching tab by slug
      const matchingTab = tabs.find(tab => 
        tab.id === selectedCategorySlug.toLowerCase() || 
        tab.id === selectedCategorySlug
      );
      if (matchingTab) {
        setActiveTab(matchingTab.id);
        return;
      }
      // If no matching tab, use the slug directly
      setActiveTab(selectedCategorySlug.toLowerCase());
      return;
    }
    
    // Priority 2: Use categoryFromUrl from URL params
    if (categoryFromUrl) {
      // First, try to find matching tab by slug or name
      const matchingTab = tabs.find(tab => 
        tab.id === categoryFromUrl.toLowerCase() || 
        tab.id === categoryFromUrl ||
        tab.label.toLowerCase().replace(/\s+/g, '-') === categoryFromUrl.toLowerCase()
      );
      if (matchingTab) {
        setActiveTab(matchingTab.id);
        return;
      }
      
      // Try to match by category slug in courses - use categorySlug if available
      const matchingCourse = allCourses.find(c => {
        // Use categorySlug from transformed course if available
        if (c.categorySlug) {
          return c.categorySlug === categoryFromUrl.toLowerCase();
        }
        
        if (!c.category) return false;
        
        // If category is an object
        if (typeof c.category === 'object') {
          const catSlug = c.category.slug || c.category.name?.toLowerCase().replace(/\s+/g, '-');
          return catSlug === categoryFromUrl.toLowerCase();
        }
        
        // If category is a string (name), convert to slug
        const catSlug = c.category.toLowerCase().replace(/\s+/g, '-');
        return catSlug === categoryFromUrl.toLowerCase();
      });
      
      if (matchingCourse) {
        // Use categorySlug if available, otherwise derive from category
        const categoryValue = matchingCourse.categorySlug || 
          (typeof matchingCourse.category === 'object' 
            ? (matchingCourse.category.slug || matchingCourse.category.name?.toLowerCase().replace(/\s+/g, '-'))
            : matchingCourse.category.toLowerCase().replace(/\s+/g, '-'));
        setActiveTab(categoryValue);
      } else if (allCourses.length > 0) {
        // If courses are already filtered by backend, get category from first course
        const firstCourse = allCourses[0];
        if (firstCourse.categorySlug) {
          setActiveTab(firstCourse.categorySlug);
        } else if (firstCourse.category) {
          const categoryValue = typeof firstCourse.category === 'object' 
            ? (firstCourse.category.slug || firstCourse.category.name?.toLowerCase().replace(/\s+/g, '-'))
            : firstCourse.category.toLowerCase().replace(/\s+/g, '-');
          setActiveTab(categoryValue);
        }
      }
    } else {
      // Check if all courses have the same category (indicating backend filtering)
      if (allCourses.length > 0) {
        const firstCourse = allCourses[0];
        // Use categorySlug if available
        if (firstCourse.categorySlug) {
          // Check if all courses have the same category slug
          const allSameCategory = allCourses.every(course => {
            return course.categorySlug === firstCourse.categorySlug;
          });
          
          if (allSameCategory) {
            setActiveTab(firstCourse.categorySlug);
            return;
          }
        } else if (firstCourse.category) {
          const firstCategory = typeof firstCourse.category === 'object' 
            ? (firstCourse.category.slug || firstCourse.category.name?.toLowerCase().replace(/\s+/g, '-'))
            : firstCourse.category.toLowerCase().replace(/\s+/g, '-');
          
          // Check if all courses have the same category
          const allSameCategory = allCourses.every(course => {
            if (!course.category) return false;
            const courseCategory = typeof course.category === 'object' 
              ? (course.category.slug || course.category.name?.toLowerCase().replace(/\s+/g, '-'))
              : course.category.toLowerCase().replace(/\s+/g, '-');
            return courseCategory === firstCategory;
          });
          
          // If all courses have same category, it means backend filtered them
          if (allSameCategory && firstCategory) {
            setActiveTab(firstCategory);
            return;
          }
        }
      }
      setActiveTab("all");
    }
  }, [categoryFromUrl, selectedCategorySlug, tabs, allCourses]);

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

    // Check if it's a category tab - match against category slug or name
    const matchingCategory = filteredCourses.find(c => {
      if (!c.category) return false;
      
      // If category is an object
      if (typeof c.category === 'object') {
        const catSlug = c.category.slug || c.category.name?.toLowerCase().replace(/\s+/g, '-');
        const catName = c.category.name?.toLowerCase().replace(/\s+/g, '-');
        return catSlug === activeTab || catName === activeTab;
      }
      
      // If category is a string (name)
      const catSlug = c.category.toLowerCase().replace(/\s+/g, '-');
      return catSlug === activeTab;
    });
    
    if (matchingCategory) {
      const categoryFiltered = filteredCourses.filter(course => {
        // Use categorySlug if available (from transformed course)
        if (course.categorySlug) {
          return course.categorySlug === activeTab || course.categorySlug === activeTab.toLowerCase();
        }
        
        if (!course.category) return false;
        
        // If category is an object
        if (typeof course.category === 'object') {
          const catSlug = course.category.slug || course.category.name?.toLowerCase().replace(/\s+/g, '-');
          return catSlug === activeTab || catSlug === activeTab.toLowerCase();
        }
        
        // If category is a string (name), convert to slug
        const catSlug = course.category.toLowerCase().replace(/\s+/g, '-');
        return catSlug === activeTab || catSlug === activeTab.toLowerCase();
      });
      
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
    // If "All Courses" or "Featured" is selected and category is in URL, use allCoursesForTabs
    // Otherwise, use the filtered courses from backend
    let filteredCourses;
    if ((activeTab === 'all' || activeTab === 'featured' || activeTab === 'certified') && categoryFromUrl && allCoursesForTabs.length > 0) {
      // Use all courses when "All Courses" or "Featured" is selected to show all courses, not just filtered ones
      filteredCourses = allCoursesForTabs;
    } else {
      filteredCourses = allCourses.length > 0 ? allCourses : courses;
    }

    // If category is in URL, courses are already filtered by backend - skip category filtering
    const isCategoryFilteredFromUrl = categoryFromUrl && categoryFromUrl !== 'all';

    // Apply search query filter
    if (searchQuery) {
      filteredCourses = filteredCourses.filter(course =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof course.category === 'object' 
          ? course.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          : course.category?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // If there are search results, use those instead
    if (searchResults && searchResults.length > 0) {
      filteredCourses = (allCourses.length > 0 ? allCourses : courses).filter(course => 
        searchResults.some(result => result.id === course.id)
      );
    }

    // Apply tab filtering - but skip if already filtered by backend category
    if (activeTab === 'all' || (isCategoryFilteredFromUrl && activeTab !== 'all')) {
      // If category filtered from URL, just filter by course type
      // Otherwise, filter by course type after applying other filters
      return filteredCourses.filter(course => 
        courseType === 'online' ? course.isOnline !== false : course.isOnline === false
      );
    }

    // Check if it's a category tab - match against category slug or name
    // Only do this if NOT already filtered by backend
    if (!isCategoryFilteredFromUrl) {
      const matchingCategory = filteredCourses.find(c => {
        if (!c.category) return false;
        
        // If category is an object
        if (typeof c.category === 'object') {
          const catSlug = c.category.slug || c.category.name?.toLowerCase().replace(/\s+/g, '-');
          const catName = c.category.name?.toLowerCase().replace(/\s+/g, '-');
          return catSlug === activeTab || catName === activeTab;
        }
        
        // If category is a string (name)
        const catSlug = c.category.toLowerCase().replace(/\s+/g, '-');
        return catSlug === activeTab;
      });
      
      if (matchingCategory) {
        const categoryFiltered = filteredCourses.filter(course => {
          if (!course.category) return false;
          
          // If category is an object
          if (typeof course.category === 'object') {
            const catSlug = course.category.slug || course.category.name?.toLowerCase().replace(/\s+/g, '-');
            const catName = course.category.name?.toLowerCase().replace(/\s+/g, '-');
            return catSlug === activeTab || catName === activeTab;
          }
          
          // If category is a string (name)
          const catSlug = course.category.toLowerCase().replace(/\s+/g, '-');
          return catSlug === activeTab;
        });
        
        // Filter by course type
        return categoryFiltered.filter(course => 
          courseType === 'online' ? course.isOnline !== false : course.isOnline === false
        );
      }
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
  
  // Get selected category for dropdown - check if activeTab is a category or use selectedCategoryName
  const selectedCategory = categoryTabs.find(tab => tab.id === activeTab);
  // If no category tab matches but we have selectedCategoryName or selectedCategorySlug, find it
  const displayCategory = selectedCategory || 
    (selectedCategorySlug && categoryTabs.find(tab => tab.id === selectedCategorySlug)) ||
    (selectedCategoryName && categoryTabs.find(tab => 
      tab.label === selectedCategoryName || tab.label.toLowerCase().replace(/\s+/g, '-') === selectedCategorySlug
    ));
  
  // Handle category dropdown change - update URL and let parent handle fetching
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value && value !== 'all') {
      setActiveTab(value);
      // Update URL with category slug using Next.js router
      const categorySlug = value; // tab.id is already the slug format
      router.push(`/courses?category=${categorySlug}#courses-section`);
    } else {
      setActiveTab('all');
      // Clear category from URL to show all courses
      router.push('/courses#courses-section');
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
    <section id="courses-list" className="relative py-10 lg:py-12 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
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
                onClick={() => {
                  setActiveTab('all');
                  // Clear category from URL to show all courses
                  if (categoryFromUrl) {
                    router.push('/courses#courses-section');
                  }
                }}
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
                    value={displayCategory?.id || (activeTab !== 'all' && categoryTabs.find(t => t.id === activeTab)?.id) || ''}
                    onChange={handleCategoryChange}
                    className={`appearance-none px-6 py-3 lg:px-8 lg:py-4 pr-12 rounded-xl lg:rounded-2xl font-bold transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 border-2 ${
                      (displayCategory && activeTab === displayCategory.id) || (activeTab !== 'all' && categoryTabs.find(t => t.id === activeTab))
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
                    <ChevronDown className={`w-5 h-5 ${(displayCategory && activeTab === displayCategory.id) || (activeTab !== 'all' && categoryTabs.find(t => t.id === activeTab)) ? 'text-blue-950' : 'text-gray-500'}`} />
                  </div>
                </div>
              )}

              {/* Other Filter Buttons */}
              {otherTabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Clear category from URL for "Featured" and other special tabs to show all
                    if (categoryFromUrl && (tab.id === 'featured' || tab.id === 'certified')) {
                      router.push('/courses#courses-section');
                    }
                  }}
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
