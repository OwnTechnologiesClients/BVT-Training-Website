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
  ChevronRight,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Ship,
  MapPin,
  Building2
} from "lucide-react";
import Link from "next/link";

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
    description: "Master BVT communication systems and signal procedures",
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
    description: "Advanced training in BVT weapons and tactical operations",
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
    description: "Modern cybersecurity training for BVT personnel",
    icon: Shield,
    coursesCount: 20,
    studentsCount: 1100,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100",
    featured: true
  }
];

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
    id: "BVT-operations",
    title: "Naval Operations",
    description: "Comprehensive BVT operations training on actual vessels",
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

const TRAINING_LOCATIONS = [
  {
    name: "Mumbai Naval Base",
    address: "Mumbai, Maharashtra",
    programs: 15,
    icon: Building2,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Delhi Training Center",
    address: "New Delhi, Delhi",
    programs: 12,
    icon: Building2,
    color: "from-green-500 to-green-600"
  },
  {
    name: "Kochi Naval Academy",
    address: "Kochi, Kerala",
    programs: 10,
    icon: Building2,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Vishakhapatnam Base",
    address: "Vishakhapatnam, Andhra Pradesh",
    programs: 8,
    icon: Building2,
    color: "from-yellow-500 to-yellow-600"
  }
];

export default function CourseCategories({ courseType = 'online' }) {
  const isOnline = courseType === 'online';
  const categories = isOnline ? ONLINE_CATEGORIES : OFFLINE_CATEGORIES;
  
  // Text content based on course type
  const content = {
    badge: isOnline ? "Course Categories" : "Training Categories",
    title: "Hands-On Training by Specialization",
    description: isOnline 
      ? "Explore our comprehensive online training programs organized by specialized areas. Learn at your own pace with expert-led video courses and interactive content."
      : "Explore our comprehensive offline training programs at various BVT facilities. Experience real-world training with expert instructors and state-of-the-art equipment.",
    featuredTitle: isOnline ? "Featured Online Categories" : "Featured Training Programs",
    allTitle: "All Training Categories",
    courseLabel: isOnline ? "courses" : "programs",
    ctaText: isOnline ? "Explore Courses" : "View Programs",
    ctaTitle: isOnline ? "Need Custom Online Training?" : "Ready for Hands-On Training?",
    ctaDescription: isOnline
      ? "We can create customized online training programs for your organization. Contact us to discuss your specific requirements."
      : "Experience world-class offline training at our state-of-the-art facilities. Learn from expert instructors with real equipment and practical exercises.",
    ctaButton: isOnline ? "Request Custom Training" : "Browse All Workshops"
  };

  return (
    <section className="relative py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
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
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">{content.badge}</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                {content.title}
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* All Categories - Enhanced */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <Award className="w-6 h-6 text-blue-900" />
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{content.allTitle}</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-md border-2 border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-2 right-2 w-16 h-16 border border-blue-600 rounded-full"></div>
                      </div>

                  <div className="relative z-10 flex items-center gap-3">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                      <h4 className="text-sm lg:text-base font-bold text-gray-900 group-hover:text-blue-900 transition-colors truncate mb-1">
                          {category.title}
                        </h4>
                      <div className="flex items-center gap-3 text-xs lg:text-sm text-gray-500">
                        <span className="font-medium">{category.coursesCount} {content.courseLabel}</span>
                          <span>•</span>
                        <span className="font-medium">{category.studentsCount} students</span>
                        </div>
                      </div>

                      {/* Arrow */}
                    <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Training Locations - Only for Offline */}
      {!isOnline && (
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-900" />
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Training Locations</h3>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-base lg:text-lg">
                Our offline training programs are conducted at various BVT bases and training centers across the country, 
                providing convenient access to world-class facilities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {TRAINING_LOCATIONS.map((location, index) => {
                const Icon = location.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group relative bg-white rounded-xl lg:rounded-2xl p-5 lg:p-6 shadow-lg border-2 border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all text-center"
                  >
                    {/* Icon */}
                    <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${location.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                    </div>

                    {/* Location Info */}
                    <h4 className="text-base lg:text-lg font-bold text-gray-900 mb-2">{location.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{location.address}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-blue-900 font-semibold">
                      <BookOpen className="w-4 h-4" />
                      <span>{location.programs} Programs</span>
                    </div>
                  </motion.div>
                );
              })}
        </div>
          </div>
        </div>
      )}

      {/* Call to Action - Enhanced */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: isOnline ? 0.4 : 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border-2 border-yellow-400/30">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
      </div>

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">{content.ctaTitle}</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                  {content.ctaDescription}
            </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-8 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
                >
                  {content.ctaButton}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
