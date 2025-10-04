"use client";

import { motion } from "framer-motion";
import { 
  Cog, 
  Compass, 
  Users, 
  Shield, 
  Zap, 
  Anchor, 
  Waves, 
  Target,
  BookOpen,
  TrendingUp,
  Award,
  ChevronRight
} from "lucide-react";

const ONLINE_CATEGORIES = [
  {
    id: "marine-engineering",
    title: "Marine Engineering",
    description: "Master propulsion systems, power generation, and mechanical operations",
    icon: Cog,
    coursesCount: 45,
    studentsCount: 2800,
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
    featured: true
  },
  {
    id: "navigation",
    title: "Navigation & Seamanship",
    description: "Learn modern navigation techniques, GPS systems, and chart plotting",
    icon: Compass,
    coursesCount: 38,
    studentsCount: 2200,
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100",
    featured: true
  },
  {
    id: "leadership",
    title: "Leadership & Command",
    description: "Develop essential leadership skills and command principles",
    icon: Users,
    coursesCount: 32,
    studentsCount: 1900,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    featured: false
  },
  {
    id: "safety-security",
    title: "Safety & Security",
    description: "Comprehensive training in safety protocols and security measures",
    icon: Shield,
    coursesCount: 28,
    studentsCount: 1600,
    color: "from-red-500 to-red-600",
    bgColor: "from-red-50 to-red-100",
    featured: false
  },
  {
    id: "communications",
    title: "Communications",
    description: "Master naval communication systems and signal procedures",
    icon: Zap,
    coursesCount: 25,
    studentsCount: 1400,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "from-yellow-50 to-yellow-100",
    featured: false
  },
  {
    id: "weapons-systems",
    title: "Weapons Systems",
    description: "Advanced training in naval weapons and tactical operations",
    icon: Target,
    coursesCount: 22,
    studentsCount: 1200,
    color: "from-gray-500 to-gray-600",
    bgColor: "from-gray-50 to-gray-100",
    featured: false
  },
  {
    id: "submarine-operations",
    title: "Submarine Operations",
    description: "Specialized training for underwater navigation and operations",
    icon: Waves,
    coursesCount: 18,
    studentsCount: 850,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50 to-indigo-100",
    featured: true
  },
  {
    id: "aviation",
    title: "Naval Aviation",
    description: "Flight operations, carrier management, and aviation safety",
    icon: Anchor,
    coursesCount: 35,
    studentsCount: 2100,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "from-cyan-50 to-cyan-100",
    featured: false
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    description: "Modern cybersecurity training for naval personnel",
    icon: Shield,
    coursesCount: 20,
    studentsCount: 1100,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100",
    featured: true
  }
];

export default function OnlineCourseCategories() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-blue-900" />
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                Online Course Categories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learn Online by Specialization
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive online training programs organized by specialized areas. 
              Learn at your own pace with expert-led video courses and interactive content.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Categories - Full Width */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-900" />
          <h3 className="text-xl font-bold text-gray-900">Featured Online Categories</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ONLINE_CATEGORIES.filter(cat => cat.featured).map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 cursor-pointer"
                  >
                    {/* Category Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Category Info */}
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                      {category.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{category.coursesCount} courses</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{category.studentsCount.toLocaleString()} students</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-gray-100 hover:bg-blue-900 hover:text-white text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                      Explore Online Courses
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

      {/* All Categories - Full Width */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-blue-900" />
          <h3 className="text-xl font-bold text-gray-900">All Online Categories</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ONLINE_CATEGORIES.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-102 transition-all duration-300 border border-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-900 transition-colors truncate">
                          {category.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span>{category.coursesCount} courses</span>
                          <span>•</span>
                          <span>{category.studentsCount.toLocaleString()} students</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 mt-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Custom Online Training?
            </h3>
            <p className="text-gray-600 mb-6">
              We can create customized online training programs for your organization. 
              Contact us to discuss your specific requirements.
            </p>
            <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg">
              Request Custom Training
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
