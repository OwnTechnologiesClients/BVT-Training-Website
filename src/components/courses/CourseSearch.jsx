"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X, Clock, Users, Star, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseSearch({ 
  searchContent, 
  sampleCourses, 
  onSearchResults, 
  onFilterChange 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredResults, setFilteredResults] = useState(sampleCourses);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedFilter("all");
    setSelectedCategories([]);
    setSelectedDuration("");
    setSearchQuery("");
  };

  // Search and filter functionality
  useEffect(() => {
    let results = sampleCourses;

    // Apply search query
    if (searchQuery) {
      results = results.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.location && course.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply level/category filter
    if (selectedFilter !== "all") {
      results = results.filter(course => 
        course.level?.toLowerCase() === selectedFilter.toLowerCase() ||
        course.category?.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      results = results.filter(course =>
        selectedCategories.includes(course.category) ||
        selectedCategories.includes(course.location)
      );
    }

    // Apply duration filter
    if (selectedDuration) {
      results = results.filter(course => {
        const duration = course.duration;
        switch (selectedDuration) {
          case "Under 4 weeks":
            return parseInt(duration) < 4;
          case "4-8 weeks":
            return parseInt(duration) >= 4 && parseInt(duration) <= 8;
          case "8-16 weeks":
            return parseInt(duration) >= 8 && parseInt(duration) <= 16;
          case "16+ weeks":
            return parseInt(duration) > 16;
          case "1-3 days":
            return parseInt(duration) >= 1 && parseInt(duration) <= 3;
          case "4-5 days":
            return parseInt(duration) >= 4 && parseInt(duration) <= 5;
          case "6-7 days":
            return parseInt(duration) >= 6 && parseInt(duration) <= 7;
          case "1+ weeks":
            return parseInt(duration) >= 7;
          default:
            return true;
        }
      });
    }

    setFilteredResults(results);
  }, [searchQuery, selectedFilter, selectedCategories, selectedDuration, sampleCourses]);

  // Separate effect for notifying parent components
  useEffect(() => {
    if (onSearchResults) onSearchResults(filteredResults);
    if (onFilterChange) onFilterChange({ selectedFilter, selectedCategories, selectedDuration, searchQuery });
  }, [filteredResults, selectedFilter, selectedCategories, selectedDuration, searchQuery, onSearchResults, onFilterChange]);

  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchContent.placeholder}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-4 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-colors font-medium"
            >
              <Filter className="w-5 h-5" />
              Filters
              {(selectedCategories.length > 0 || selectedDuration) && (
                <span className="bg-yellow-500 text-blue-900 px-2 py-1 rounded-full text-xs font-bold">
                  {selectedCategories.length + (selectedDuration ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {searchContent.filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === filter.id
                    ? "bg-blue-900 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {filter.label}
                <span className="ml-2 text-xs opacity-75">({filter.count})</span>
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl p-6 mb-8 shadow-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Categories or Locations */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    {searchContent.locations ? "Training Locations" : "Categories"}
                  </h4>
                  <div className="space-y-2">
                    {(searchContent.locations || searchContent.categories).map((item) => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(item)}
                          onChange={() => toggleCategory(item)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    {searchContent.locations ? "Workshop Duration" : "Duration"}
                  </h4>
                  <div className="space-y-2">
                    {searchContent.durationFilters.map((duration) => (
                      <label key={duration} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="duration"
                          checked={selectedDuration === duration}
                          onChange={() => setSelectedDuration(duration)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">More Options</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Certified Programs</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">
                        {searchContent.locations ? "Hands-on Equipment" : "Online Available"}
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">
                        {searchContent.locations ? "Accommodation Available" : "Hands-on Training"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedDuration) && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {category}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="ml-1 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedDuration && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {selectedDuration}
                  <button
                    onClick={() => setSelectedDuration("")}
                    className="ml-1 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredResults.length} courses</span> for your search
            </p>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Most Popular</option>
              <option>Newest First</option>
              <option>Highest Rated</option>
              <option>Shortest Duration</option>
              {searchContent.locations && <option>By Location</option>}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
