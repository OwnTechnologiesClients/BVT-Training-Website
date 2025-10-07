"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X, Calendar } from "lucide-react";
import { SAMPLE_EVENTS } from "./EventCard";

export default function EventsSearch({ onSearchResults, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [filteredResults, setFilteredResults] = useState(SAMPLE_EVENTS);

  const categories = ["Conference", "Workshop", "Symposium", "Training", "Drill", "Seminar"];
  const dateRanges = ["This Week", "This Month", "Next Month", "Next 3 Months"];
  const priceRanges = ["Free", "Under $100", "$100-$300", "$300+"];

  // Filter events based on search and filters
  useEffect(() => {
    let results = SAMPLE_EVENTS;

    // Apply search query
    if (searchQuery) {
      results = results.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      results = results.filter(event => 
        event.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply date range filter
    if (selectedDateRange) {
      const today = new Date();
      results = results.filter(event => {
        const eventDate = new Date(event.date);
        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (selectedDateRange) {
          case "This Week":
            return diffDays >= 0 && diffDays <= 7;
          case "This Month":
            return diffDays >= 0 && diffDays <= 30;
          case "Next Month":
            return diffDays > 30 && diffDays <= 60;
          case "Next 3 Months":
            return diffDays > 30 && diffDays <= 90;
          default:
            return true;
        }
      });
    }

    // Apply price filter
    if (selectedPrice) {
      results = results.filter(event => {
        if (event.price === "Free") {
          return selectedPrice === "Free";
        }
        
        const price = parseInt(event.price.replace("$", ""));
        switch (selectedPrice) {
          case "Free":
            return event.price === "Free";
          case "Under $100":
            return price < 100;
          case "$100-$300":
            return price >= 100 && price <= 300;
          case "$300+":
            return price > 300;
          default:
            return true;
        }
      });
    }

    setFilteredResults(results);
  }, [searchQuery, selectedCategory, selectedDateRange, selectedPrice]);

  // Separate effect for notifying parent components
  useEffect(() => {
    if (onSearchResults) onSearchResults(filteredResults);
    if (onFilterChange) onFilterChange({ selectedCategory, selectedDateRange, selectedPrice, searchQuery });
  }, [filteredResults, selectedCategory, selectedDateRange, selectedPrice, searchQuery]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDateRange("");
    setSelectedPrice("");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedDateRange || selectedPrice;

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
              placeholder="Search events, locations, or keywords..."
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
                Filter Events
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
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any Date</option>
                  {dateRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any Price</option>
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{filteredResults.length}</span> events found
                </div>
              </div>
            </div>

            {/* Quick Date Filters */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quick Filters
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDateRange("This Week")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedDateRange === "This Week"
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  This Week
                </button>
                <button
                  onClick={() => setSelectedDateRange("This Month")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedDateRange === "This Month"
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  This Month
                </button>
                <button
                  onClick={() => setSelectedPrice("Free")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedPrice === "Free"
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Free Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


