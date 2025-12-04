"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Mic, Puzzle, Heart, Cog, Compass, Shield, Users, BookOpen, Zap, Anchor, Waves, Target, Award, TrendingUp, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { getCategoryStats, getActiveCategories } from "@/lib/api/courseCategories";
import { Loader2 } from "lucide-react";
import { getImageUrl } from "@/lib/utils/imageUtils";
import Link from "next/link";

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
      <section className="relative py-20 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading Training Courses...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state or no categories
  if (error || categories.length === 0) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-10 grid place-items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 border-yellow-500/30 mb-6"
            >
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-700 uppercase tracking-wider">Training Courses</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 bg-clip-text text-transparent mb-4">
              Training Courses
            </h2>
            <p className="text-lg md:text-xl text-gray-600 lg:w-6/12 max-w-3xl">
              Comprehensive vocational training courses designed to enhance your BVT 
              career and develop essential skills for service excellence.
            </p>
            {error && (
              <div className="mt-6 text-center text-red-600 bg-red-50 px-6 py-3 rounded-lg border border-red-200">
                <p className="font-medium">Unable to load categories. Please try again later.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Calculate visible categories (6 at a time, 3 per row)
  const categoriesPerRow = 3;
  const stepSize = 2;
  const totalCategories = categories.length;
  const maxIndex = Math.max(0, totalCategories - 6);
  
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
    <section className="relative py-20 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm px-5 py-2.5 rounded-full border-2 border-yellow-500/30 mb-6 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-yellow-600 animate-pulse" />
            <span className="text-sm font-bold text-yellow-700 uppercase tracking-wider">Training Courses</span>
            <Award className="w-5 h-5 text-yellow-600" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 bg-clip-text text-transparent mb-6">
            Explore Our Training Programs
          </h2>
          <p className="text-lg md:text-xl text-gray-600 lg:w-6/12 max-w-3xl mx-auto leading-relaxed">
            Comprehensive vocational training courses designed to enhance your BVT 
            career and develop essential skills for service excellence.
          </p>

        </motion.div>

        {/* Category Cards - Enhanced Design */}
        {categories.length > 0 && (
          <div className="relative">
            {/* Navigation Indicator - Near Cards */}
            {totalCategories > 6 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-6 lg:mb-8"
              >
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 backdrop-blur-md px-6 py-3 rounded-xl border-2 border-blue-300 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                    <span className="text-sm font-bold text-blue-950">
                      Showing <span className="text-blue-700">{currentIndex + 1}-{Math.min(currentIndex + 6, totalCategories)}</span> of <span className="text-blue-700">{totalCategories}</span> Categories
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Desktop Navigation Arrows - Enhanced */}
            {totalCategories > 6 && (
              <>
                <motion.button
                  onClick={handlePrevious}
                  disabled={!canGoPrevious}
                  whileHover={canGoPrevious ? { scale: 1.15, x: -5 } : {}}
                  whileTap={canGoPrevious ? { scale: 0.95 } : {}}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-8 z-30 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 lg:p-6 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hidden lg:flex items-center justify-center border-4 border-white group ${
                    !canGoPrevious ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  aria-label="Previous categories"
                >
                  <ChevronLeft className="w-7 h-7 lg:w-8 lg:h-8 group-hover:-translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
                
                <motion.button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  whileHover={canGoNext ? { scale: 1.15, x: 5 } : {}}
                  whileTap={canGoNext ? { scale: 0.95 } : {}}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-8 z-30 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 lg:p-6 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hidden lg:flex items-center justify-center border-4 border-white group ${
                    !canGoNext ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  aria-label="Next categories"
                >
                  <ChevronRight className="w-7 h-7 lg:w-8 lg:h-8 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
              </>
            )}


            {/* Category Cards Container */}
            <div className="container mx-auto">
              <div className="flex flex-col gap-8 lg:gap-10">
                {/* Row 1 */}
                {row1Categories.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {row1Categories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <Link key={category.id || `${currentIndex}-${index}`} href={`/courses?category=${category.slug}`}>
                          <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                            whileHover={{ y: -12, scale: 1.03 }}
                            className="group relative h-[380px] lg:h-[420px] overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-yellow-400/50"
                          >
                            {/* Background Image - More Visible */}
                            <div className="absolute inset-0">
                              <img 
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.15]"
                                onError={(e) => {
                                  e.target.src = getCategoryImage(currentIndex + index);
                                }}
                              />
                              {/* Lighter gradient overlay to show image better */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-blue-900/30 to-blue-950/50 group-hover:from-blue-950/30 group-hover:via-blue-900/20 group-hover:to-blue-950/40 transition-all duration-500"></div>
                              {/* Stronger bottom gradient for text readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                              {/* Side gradients for better image visibility */}
                              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
                              {/* Top Icon - Smaller to not block image */}
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className="relative self-start"
                              >
                                <div className="absolute inset-0 bg-yellow-500/30 rounded-2xl blur-xl group-hover:bg-yellow-500/50 transition-all duration-500"></div>
                                <div className="relative bg-gradient-to-br from-yellow-500/30 to-yellow-400/20 backdrop-blur-md p-3 rounded-xl border-2 border-yellow-400/40 group-hover:border-yellow-300/60 transition-all duration-500 shadow-lg">
                                  <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-yellow-300 group-hover:text-yellow-200 transition-colors" />
                                </div>
                              </motion.div>

                              {/* Bottom Content - Enhanced for visibility */}
                              <div className="space-y-4 bg-gradient-to-t from-black/60 via-black/40 to-transparent -mx-6 lg:-mx-8 px-6 lg:px-8 pt-6 pb-4 lg:pt-8 lg:pb-6">
                                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white leading-tight drop-shadow-2xl group-hover:text-yellow-300 transition-colors">
                                  {category.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-full border-2 border-white/30 shadow-lg">
                                    <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
                                    <span className="text-sm lg:text-base font-bold text-white">
                                      {category.courseCount} {category.courseCount === 1 ? 'Course' : 'Courses'}
                                    </span>
                                  </div>
                                  <motion.div
                                    whileHover={{ x: 5, scale: 1.1 }}
                                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-3 rounded-full group-hover:from-yellow-400 group-hover:to-yellow-300 transition-all shadow-lg border-2 border-white/20"
                                  >
                                    <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-blue-950" />
                                  </motion.div>
                                </div>
                              </div>
                            </div>

                            {/* Shine Effect on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Row 2 */}
                {row2Categories.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {row2Categories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <Link key={category.id || `${currentIndex + categoriesPerRow}-${index}`} href={`/courses?category=${category.slug}`}>
                          <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index + 3) * 0.15, duration: 0.6, type: "spring" }}
                            whileHover={{ y: -12, scale: 1.03 }}
                            className="group relative h-[380px] lg:h-[420px] overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-yellow-400/50"
                          >
                            {/* Background Image - More Visible */}
                            <div className="absolute inset-0">
                              <img 
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.15]"
                                onError={(e) => {
                                  e.target.src = getCategoryImage(currentIndex + categoriesPerRow + index);
                                }}
                              />
                              {/* Lighter gradient overlay to show image better */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-blue-900/30 to-blue-950/50 group-hover:from-blue-950/30 group-hover:via-blue-900/20 group-hover:to-blue-950/40 transition-all duration-500"></div>
                              {/* Stronger bottom gradient for text readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                              {/* Side gradients for better image visibility */}
                              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
                              {/* Top Icon - Smaller to not block image */}
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className="relative self-start"
                              >
                                <div className="absolute inset-0 bg-yellow-500/30 rounded-2xl blur-xl group-hover:bg-yellow-500/50 transition-all duration-500"></div>
                                <div className="relative bg-gradient-to-br from-yellow-500/30 to-yellow-400/20 backdrop-blur-md p-3 rounded-xl border-2 border-yellow-400/40 group-hover:border-yellow-300/60 transition-all duration-500 shadow-lg">
                                  <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-yellow-300 group-hover:text-yellow-200 transition-colors" />
                                </div>
                              </motion.div>

                              {/* Bottom Content - Enhanced for visibility */}
                              <div className="space-y-4 bg-gradient-to-t from-black/60 via-black/40 to-transparent -mx-6 lg:-mx-8 px-6 lg:px-8 pt-6 pb-4 lg:pt-8 lg:pb-6">
                                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white leading-tight drop-shadow-2xl group-hover:text-yellow-300 transition-colors">
                                  {category.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-full border-2 border-white/30 shadow-lg">
                                    <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
                                    <span className="text-sm lg:text-base font-bold text-white">
                                      {category.courseCount} {category.courseCount === 1 ? 'Course' : 'Courses'}
                                    </span>
                                  </div>
                                  <motion.div
                                    whileHover={{ x: 5, scale: 1.1 }}
                                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-3 rounded-full group-hover:from-yellow-400 group-hover:to-yellow-300 transition-all shadow-lg border-2 border-white/20"
                                  >
                                    <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-blue-950" />
                                  </motion.div>
                                </div>
                              </div>
                            </div>

                            {/* Shine Effect on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Navigation - Enhanced */}
            <div className="lg:hidden flex flex-col items-center gap-4 mt-8">
              {/* Mobile Indicator - Above buttons */}
              {totalCategories > 6 && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 backdrop-blur-md px-5 py-2.5 rounded-xl border-2 border-blue-300 shadow-lg mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                  <span className="text-sm font-bold text-blue-950">
                    <span className="text-blue-700">{currentIndex + 1}-{Math.min(currentIndex + 6, totalCategories)}</span> of <span className="text-blue-700">{totalCategories}</span> Categories
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handlePrevious}
                  disabled={!canGoPrevious}
                  whileHover={{ scale: canGoPrevious ? 1.15 : 1, x: canGoPrevious ? -3 : 0 }}
                  whileTap={{ scale: canGoPrevious ? 0.9 : 1 }}
                  className={`p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl border-4 border-white transition-all ${
                    !canGoPrevious ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-7 h-7" />
                </motion.button>
                
                <motion.button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  whileHover={{ scale: canGoNext ? 1.15 : 1, x: canGoNext ? 3 : 0 }}
                  whileTap={{ scale: canGoNext ? 0.9 : 1 }}
                  className={`p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl border-4 border-white transition-all ${
                    !canGoNext ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <ChevronRight className="w-7 h-7" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 font-medium">Swipe or use arrows to see more courses</p>
            </div>
          </div>
        )}

        {/* View All Courses CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/courses">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative z-10 flex items-center gap-3">
                <span>View All Training Courses</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
