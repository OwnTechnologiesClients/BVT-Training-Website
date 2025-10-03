"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";

const COURSE_TABS = [
  { id: "all", label: "All Courses", count: 400 },
  { id: "featured", label: "Featured", count: 45 },
  { id: "beginner", label: "Beginner", count: 120 },
  { id: "intermediate", label: "Intermediate", count: 180 },
  { id: "advanced", label: "Advanced", count: 100 },
  { id: "certified", label: "Certified", count: 85 }
];

const COURSES_DATA = [
  {
    id: 1,
    title: "Marine Engineering Fundamentals",
    description: "Master the basics of marine engineering, from propulsion systems to electrical operations. Essential training for technical ratings.",
    instructor: "Commander Sarah Johnson",
    duration: "12 weeks",
    level: "Beginner",
    rating: 4.8,
    studentsCount: 150,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    price: 299,
    category: "Marine Engineering",
    isFeatured: true,
    location: "Naval Base Mumbai",
    lessons: 24,
    certificate: true
  },
  {
    id: 2,
    title: "Advanced Navigation Systems",
    description: "Learn modern navigation techniques, GPS systems, and chart plotting. Essential skills for deck officers and navigation specialists.",
    instructor: "Captain Michael Chen",
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.9,
    studentsCount: 120,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    price: 399,
    category: "Navigation",
    isFeatured: true,
    location: "Naval Academy",
    lessons: 16,
    certificate: true
  },
  {
    id: 3,
    title: "Maritime Safety & Security",
    description: "Comprehensive training in safety protocols, emergency response, and security measures for maritime operations.",
    instructor: "Lieutenant Commander David Rodriguez",
    duration: "16 weeks",
    level: "Advanced",
    rating: 4.7,
    studentsCount: 200,
    image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop",
    price: 499,
    category: "Safety & Security",
    isFeatured: false,
    location: "Training Center",
    lessons: 32,
    certificate: true
  },
  {
    id: 4,
    title: "Naval Communications",
    description: "Master naval communication systems, radio operations, and signal procedures essential for fleet operations.",
    instructor: "Chief Petty Officer Lisa Wang",
    duration: "10 weeks",
    level: "Beginner",
    rating: 4.6,
    studentsCount: 180,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    price: 199,
    category: "Communications",
    isFeatured: false,
    location: "Communication Center",
    lessons: 20,
    certificate: true
  },
  {
    id: 5,
    title: "Leadership & Command",
    description: "Develop essential leadership skills, team management, and command principles for advancing your naval career.",
    instructor: "Admiral James Thompson",
    duration: "14 weeks",
    level: "Intermediate",
    rating: 4.9,
    studentsCount: 95,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    price: 599,
    category: "Leadership",
    isFeatured: true,
    location: "Leadership Academy",
    lessons: 28,
    certificate: true
  },
  {
    id: 6,
    title: "Weapons Systems Operations",
    description: "Advanced training in naval weapons systems, targeting, and tactical operations for defense specialists.",
    instructor: "Captain Elena Petrova",
    duration: "20 weeks",
    level: "Advanced",
    rating: 4.8,
    studentsCount: 160,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    price: 699,
    category: "Weapons Systems",
    isFeatured: false,
    location: "Weapons Training Facility",
    lessons: 40,
    certificate: true
  },
  {
    id: 7,
    title: "Submarine Operations",
    description: "Specialized training for submarine crew members, covering underwater navigation, systems operation, and emergency procedures.",
    instructor: "Commander Robert Kim",
    duration: "24 weeks",
    level: "Advanced",
    rating: 4.9,
    studentsCount: 75,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    price: 799,
    category: "Submarine Operations",
    isFeatured: true,
    location: "Submarine Training Center",
    lessons: 48,
    certificate: true
  },
  {
    id: 8,
    title: "Aircraft Carrier Operations",
    description: "Comprehensive training for aircraft carrier crew, including flight deck operations, aircraft handling, and logistics.",
    instructor: "Captain Maria Gonzalez",
    duration: "18 weeks",
    level: "Intermediate",
    rating: 4.7,
    studentsCount: 110,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    price: 549,
    category: "Aircraft Operations",
    isFeatured: false,
    location: "Carrier Training Facility",
    lessons: 36,
    certificate: true
  },
  {
    id: 9,
    title: "Cyber Security in Naval Operations",
    description: "Modern cybersecurity training for naval personnel, covering threat detection, network security, and digital warfare.",
    instructor: "Lieutenant Alex Turner",
    duration: "12 weeks",
    level: "Intermediate",
    rating: 4.8,
    studentsCount: 140,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    price: 449,
    category: "Cyber Security",
    isFeatured: true,
    location: "Cyber Training Center",
    lessons: 24,
    certificate: true
  }
];

export default function CourseTabs({ searchResults, activeFilters }) {
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredCourses = () => {
    let courses = COURSES_DATA;

    // If there are search results, use those instead
    if (searchResults && searchResults.length > 0) {
      courses = COURSES_DATA.filter(course => 
        searchResults.some(result => result.id === course.id)
      );
    }

    // Apply tab filtering
    switch (activeTab) {
      case "featured":
        return courses.filter(course => course.isFeatured);
      case "beginner":
        return courses.filter(course => course.level === "Beginner");
      case "intermediate":
        return courses.filter(course => course.level === "Intermediate");
      case "advanced":
        return courses.filter(course => course.level === "Advanced");
      case "certified":
        return courses.filter(course => course.certificate);
      default:
        return courses;
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
              Explore our comprehensive collection of naval training programs, 
              categorized for easy navigation and discovery.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {COURSE_TABS.map((tab) => (
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
            <CourseCard key={course.id} course={course} index={index} />
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
