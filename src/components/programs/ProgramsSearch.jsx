"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { SAMPLE_PROGRAMS } from "./ProgramCard";

export default function ProgramsSearch({ onSearchResults, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [filteredResults, setFilteredResults] = useState(SAMPLE_PROGRAMS);

  const categories = ["Technical", "Leadership", "Security", "Navigation", "Safety"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const durations = ["Under 4 weeks", "4-8 weeks", "8-12 weeks", "12+ weeks"];

  // Filter programs based on search and filters
  useEffect(() => {
    let results = SAMPLE_PROGRAMS;

    // Apply search query
    if (searchQuery) {
      results = results.filter(program =>
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply level filter
    if (selectedFilter !== "all") {
      results = results.filter(program => 
        program.level.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      results = results.filter(program =>
        selectedCategories.includes(program.category)
      );
    }

    // Apply duration filter
    if (selectedDuration) {
      results = results.filter(program => {
        const duration = program.duration;
        switch (selectedDuration) {
          case "Under 4 weeks":
            return parseInt(duration) < 4;
          case "4-8 weeks":
            return parseInt(duration) >= 4 && parseInt(duration) <= 8;
          case "8-12 weeks":
            return parseInt(duration) >= 8 && parseInt(duration) <= 12;
          case "12+ weeks":
            return parseInt(duration) > 12;
          default:
            return true;
        }
      });
    }

    // Apply level filter
    if (selectedLevel) {
      results = results.filter(program =>
        program.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    setFilteredResults(results);
  }, [searchQuery, selectedFilter, selectedCategories, selectedDuration, selectedLevel]);

  // Separate effect for notifying parent components
  useEffect(() => {
    if (onSearchResults) onSearchResults(filteredResults);
    if (onFilterChange) onFilterChange({ selectedFilter, selectedCategories, selectedDuration, selectedLevel, searchQuery });
  }, [filteredResults, selectedFilter, selectedCategories, selectedDuration, selectedLevel, searchQuery]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFilter("all");
    setSelectedCategories([]);
    setSelectedDuration("");
    setSelectedLevel("");
  };

  const hasActiveFilters = searchQuery || selectedFilter !== "all" || selectedCategories.length > 0 || selectedDuration || selectedLevel;

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search programs, categories, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter Programs
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any Duration</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any Difficulty</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{filteredResults.length}</span> programs found
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


