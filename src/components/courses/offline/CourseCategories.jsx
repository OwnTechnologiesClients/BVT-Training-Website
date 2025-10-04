"use client";

import { motion } from "framer-motion";
import { 
  Cog, 
  Users, 
  Shield, 
  MapPin,
  BookOpen,
  TrendingUp,
  Award,
  ChevronRight,
  GraduationCap,
  Ship,
  Target,
  Zap
} from "lucide-react";

const OFFLINE_CATEGORIES = [
  {
    id: "technical-workshops",
    title: "Technical Workshops",
    description: "Hands-on engineering workshops with real equipment and systems",
    icon: Cog,
    coursesCount: 15,
    studentsCount: 300,
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
    featured: true
  },
  {
    id: "leadership-bootcamps",
    title: "Leadership Bootcamps",
    description: "Intensive leadership training with practical exercises",
    icon: Users,
    coursesCount: 12,
    studentsCount: 240,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    featured: true
  },
  {
    id: "security-training",
    title: "Security & Defense",
    description: "Specialized security training with real-world scenarios",
    icon: Shield,
    coursesCount: 10,
    studentsCount: 180,
    color: "from-red-500 to-red-600",
    bgColor: "from-red-50 to-red-100",
    featured: true
  },
  {
    id: "naval-operations",
    title: "Naval Operations",
    description: "Comprehensive naval operations training on actual vessels",
    icon: Ship,
    coursesCount: 8,
    studentsCount: 160,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50 to-indigo-100",
    featured: false
  },
  {
    id: "weapons-systems",
    title: "Weapons Systems",
    description: "Advanced weapons training with live equipment",
    icon: Target,
    coursesCount: 6,
    studentsCount: 120,
    color: "from-gray-500 to-gray-600",
    bgColor: "from-gray-50 to-gray-100",
    featured: false
  },
  {
    id: "communications",
    title: "Communications",
    description: "Radio and communication systems training",
    icon: Zap,
    coursesCount: 7,
    studentsCount: 140,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "from-yellow-50 to-yellow-100",
    featured: false
  },
  {
    id: "certification",
    title: "Certification Programs",
    description: "Professional certification courses with exams",
    icon: GraduationCap,
    coursesCount: 9,
    studentsCount: 200,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100",
    featured: false
  }
];

export default function OfflineCourseCategories() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-blue-900" />
              <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                Offline Training Categories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hands-On Training by Location
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive offline training programs at various naval facilities. 
              Experience real-world training with expert instructors and state-of-the-art equipment.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Categories - Full Width */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-900" />
          <h3 className="text-xl font-bold text-gray-900">Featured Training Programs</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {OFFLINE_CATEGORIES.filter(cat => cat.featured).map((category, index) => {
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
                        <span>{category.coursesCount} programs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{category.studentsCount} students</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-gray-100 hover:bg-blue-900 hover:text-white text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                      View Training Programs
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
          <h3 className="text-xl font-bold text-gray-900">All Training Categories</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {OFFLINE_CATEGORIES.map((category, index) => {
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
                          <span>{category.coursesCount} programs</span>
                          <span>•</span>
                          <span>{category.studentsCount} students</span>
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

      {/* Training Locations */}
      <div className="container mx-auto px-4 mt-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Training Locations
            </h3>
            <p className="text-gray-600 mb-6">
              Our offline training programs are conducted at various naval bases and training centers across the country, 
              providing convenient access to world-class facilities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <MapPin className="w-4 h-4 text-blue-900" />
                <span>Mumbai Naval Base</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <MapPin className="w-4 h-4 text-blue-900" />
                <span>Delhi Training Center</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <MapPin className="w-4 h-4 text-blue-900" />
                <span>Kochi Naval Academy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
