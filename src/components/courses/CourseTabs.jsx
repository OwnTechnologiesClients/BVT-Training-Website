"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OnlineCourseCard } from "./index";

export default function CourseTabs({ 
  tabs, 
  courses, 
  searchResults, 
  activeFilters, 
  courseCardComponent: CourseCardComponent = OnlineCourseCard 
}) {
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredCourses = () => {
    let filteredCourses = courses;

    // If there are search results, use those instead
    if (searchResults && searchResults.length > 0) {
      filteredCourses = courses.filter(course => 
        searchResults.some(result => result.id === course.id)
      );
    }

    // Apply tab filtering
    switch (activeTab) {
      case "featured":
        return filteredCourses.filter(course => course.isFeatured);
      case "beginner":
        return filteredCourses.filter(course => course.level === "Beginner");
      case "intermediate":
        return filteredCourses.filter(course => course.level === "Intermediate");
      case "advanced":
        return filteredCourses.filter(course => course.level === "Advanced");
      case "technical":
        return filteredCourses.filter(course => course.category === "Technical Training");
      case "leadership":
        return filteredCourses.filter(course => course.category === "Leadership Development");
      case "security":
        return filteredCourses.filter(course => course.category === "Security & Defense");
      case "certified":
        return filteredCourses.filter(course => course.certificate);
      default:
        return filteredCourses;
    }
  };

  const filteredCourses = getFilteredCourses();

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Training Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of BVT training programs, 
              categorized for easy navigation and discovery.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCardComponent key={course.id} course={course} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Load More Button */}
      <div className="container mx-auto px-4 mt-8">
        <div className="text-center">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-medium transition-colors">
            Load More Courses
          </button>
        </div>
      </div>
    </section>
  );
}
