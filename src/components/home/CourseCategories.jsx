"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Mic, Puzzle, Heart, Cog, Compass, Shield, Users, BookOpen, Zap, Anchor, Waves, Target, Award, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { getCategoryStats, getActiveCategories } from "@/lib/api/courseCategories";
import { Loader2 } from "lucide-react";
import { getImageUrl } from "@/lib/utils/imageUtils";

// Icon mapping based on category name keywords
const getCategoryIcon = (categoryName) => {
  const name = categoryName.toLowerCase();
  if (name.includes('technical') || name.includes('engineering') || name.includes('marine engineering')) return Cog;
  if (name.includes('navigation') || name.includes('seamanship') || name.includes('operations')) return Compass;
  if (name.includes('safety') || name.includes('security') || name.includes('defense')) return Shield;
  if (name.includes('leadership') || name.includes('management') || name.includes('command')) return Users;
  if (name.includes('communication')) return Mic;
  if (name.includes('weapon') || name.includes('tactical')) return Target;
  if (name.includes('submarine')) return Waves;
  if (name.includes('naval') || name.includes('basics') || name.includes('foundation')) return Anchor;
  return BookOpen; // Default icon
};

// Default images for categories
const getCategoryImage = (index) => {
  const images = [
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  ];
  return images[index % images.length];
};

export default function CourseCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both active categories and stats
        const [categoriesResponse, statsResponse] = await Promise.all([
          getActiveCategories(),
          getCategoryStats()
        ]);
        
        if (categoriesResponse.success && categoriesResponse.data) {
          // Create a map of course counts from stats
          const courseCountMap = {};
          if (statsResponse.success && statsResponse.data?.categoriesWithCourseCount) {
            statsResponse.data.categoriesWithCourseCount.forEach(cat => {
              courseCountMap[cat._id?.toString()] = cat.courseCount || 0;
            });
          }
          
          // Map all active categories with their course counts
          const allCategories = categoriesResponse.data
            .map((cat, index) => ({
              id: cat._id,
              name: cat.name,
              slug: cat.slug,
              courseCount: courseCountMap[cat._id?.toString()] || 0,
              icon: getCategoryIcon(cat.name),
              image: getCategoryImage(index)
            }));
          
          setCategories(allCategories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="px-8 py-12">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
          </div>
        </div>
      </section>
    );
  }

  // Error state or no categories
  if (error || categories.length === 0) {
    return (
      <section className="px-8 py-12">
        <div className="container mx-auto">
          <div className="mb-10 grid place-items-center text-center">
            <h2 className="my-3 text-4xl font-bold text-gray-900">
              Training Courses
            </h2>
            <p className="text-lg text-gray-500 lg:w-6/12">
              Comprehensive vocational training courses designed to enhance your BVT 
              career and develop essential skills for service excellence.
            </p>
          </div>
          {error && (
            <div className="text-center text-red-600">
              <p>Unable to load categories. Please try again later.</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Calculate visible categories (6 at a time, 3 per row)
  const categoriesPerRow = 3;
  const stepSize = 2; // Move 2 categories at a time (1 per row)
  const totalCategories = categories.length;
  
  // Calculate max index: we can scroll until we can't show 6 more categories
  // If we have 10 categories, we can show: [0-5], [2-7], [4-9] = max index 4
  const maxIndex = Math.max(0, totalCategories - 6);
  
  // Get visible categories for each row
  // Row 1: starts at currentIndex, shows 3
  // Row 2: starts at currentIndex + 3, shows 3
  const row1Start = currentIndex;
  const row2Start = currentIndex + categoriesPerRow;
  
  const row1Categories = categories.slice(row1Start, row1Start + categoriesPerRow);
  const row2Categories = categories.slice(row2Start, row2Start + categoriesPerRow);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - stepSize));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + stepSize));
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section className="px-8 py-12">
      <div className="container mx-auto">
        <div className="mb-10 grid place-items-center text-center">
          <h2 className="my-3 text-4xl font-bold text-gray-900">
            Training Courses
          </h2>
          <p className="text-lg text-gray-500 lg:w-6/12">
            Comprehensive vocational training courses designed to enhance your BVT 
            career and develop essential skills for service excellence.
          </p>
        </div>
      </div>

      {/* Category Cards - 2 Rows with Pagination */}
      {categories.length > 0 && (
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 hidden lg:flex items-center justify-center ${
              !canGoPrevious ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 hidden lg:flex items-center justify-center ${
              !canGoNext ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label="Next categories"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Category Cards Container */}
          <div className="container mx-auto">
            <div className="flex flex-col gap-6">
              {/* Row 1 */}
              {row1Categories.length > 0 && (
                <div className="flex gap-6 justify-center">
                  {row1Categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id || `${currentIndex}-${index}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="relative grid min-h-[14rem] w-[400px] flex-shrink-0 overflow-hidden rounded-xl"
                      >
                          <img 
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = getCategoryImage(currentIndex + index);
                          }}
                          />
                          <div className="absolute inset-0 h-full w-full bg-black/70" />
                          <div className="relative flex flex-col justify-between p-6">
                            <Icon className="h-8 w-8 text-white" />
                            <div>
                              <h4 className="mb-1 text-xl font-bold text-white">
                                {category.name}
                              </h4>
                              <p className="text-xs font-bold opacity-50 text-white">
                                {category.courseCount} {category.courseCount === 1 ? 'Course' : 'Courses'}
                              </p>
                            </div>
                          </div>
                      </motion.div>
                    );
                  })}
                  {/* Fill empty slots to maintain layout */}
                  {row1Categories.length < categoriesPerRow && 
                    Array.from({ length: categoriesPerRow - row1Categories.length }).map((_, i) => (
                      <div key={`empty-1-${i}`} className="w-[400px] flex-shrink-0" />
                    ))
                  }
                </div>
              )}

              {/* Row 2 */}
              {row2Categories.length > 0 && (
                <div className="flex gap-6 justify-center">
                  {row2Categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id || `${currentIndex + categoriesPerRow}-${index}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="relative grid min-h-[14rem] w-[400px] flex-shrink-0 overflow-hidden rounded-xl"
                      >
                          <img 
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = getCategoryImage(currentIndex + categoriesPerRow + index);
                          }}
                          />
                          <div className="absolute inset-0 h-full w-full bg-black/70" />
                          <div className="relative flex flex-col justify-between p-6">
                            <Icon className="h-8 w-8 text-white" />
                            <div>
                              <h4 className="mb-1 text-xl font-bold text-white">
                                {category.name}
                              </h4>
                              <p className="text-xs font-bold opacity-50 text-white">
                                {category.courseCount} {category.courseCount === 1 ? 'Course' : 'Courses'}
                              </p>
                            </div>
                          </div>
                      </motion.div>
                    );
                  })}
                  {/* Fill empty slots to maintain layout */}
                  {row2Categories.length < categoriesPerRow && 
                    Array.from({ length: categoriesPerRow - row2Categories.length }).map((_, i) => (
                      <div key={`empty-2-${i}`} className="w-[400px] flex-shrink-0" />
                    ))
                  }
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className={`p-2 rounded-full ${!canGoPrevious ? 'opacity-50' : 'bg-white shadow-lg'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`p-2 rounded-full ${!canGoNext ? 'opacity-50' : 'bg-white shadow-lg'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
