"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  Users,
  Award,
  Play,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Share2,
  User,
  Tag,
  Loader2,
  ShoppingCart,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCourseEnrollment } from "@/hooks/useCourseEnrollment";
import { getCourseBySlug } from "@/lib/api/courses";
import { getAllCourses } from "@/lib/api/courses";
import { getImageUrl } from "@/lib/utils/imageUtils";

// Sample course data (fallback)
const FALLBACK_COURSE_DATA = {
  id: 1,
  title: "Advanced Naval Warfare Strategies",
  slug: "advanced-BVT-warfare-strategies",
  category: "Advanced Warfare",
  lastUpdated: "December 11, 2024",
  rating: 4.9,
  totalRatings: 156,
  image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&h=600&fit=crop",
  price: 799,
  originalPrice: 999,
  lectures: 24,
  duration: "16 weeks",
  skillLevel: "Advanced",
  certificate: true,
  students: 250,
  description: `Mastering Naval Warfare Strategies is a comprehensive course designed for those who want to create professional, fully responsive BVT operations without writing a single line of code. Whether you're a BVT officer, strategist, or military professional looking to build advanced tactical skills or command operations, this course will teach you how to leverage modern BVT warfare principles to bring your strategic vision to life.

In this hands-on course, you'll learn how to plan, execute, and lead BVT operations using advanced strategic frameworks. From creating battle plans and coordinating fleet movements to integrating technology and intelligence, you'll gain the skills needed to produce highly effective and successful BVT campaigns. You'll also dive into best practices for logistics, communication, and mission planning, ensuring your operations succeed in any environment and achieve strategic objectives.

By the end of this course, you'll have the expertise to lead complex BVT operations with confidence, and you'll be prepared to use advanced strategic principles to bring your military leadership vision to life—no prior experience required!`,
  learningOutcomes: [
    "Create responsive BVT operations using modern strategies",
    "Basic tactical planning techniques",
    "Build your own strategic framework",
    "How to optimize operations for maximum effectiveness",
    "Simple communication protocols",
    "Fleet coordination and command structures",
    "Create and manage mission briefings",
    "Deploy & Maintenance of operations"
  ],
  materials: [
    "Hours of on-demand video",
    "90+ articles and texts",
    "Assignments",
    "Certificate of completion"
  ],
  curriculum: [
    {
      section: "Getting Started",
      lessons: [
        { title: "Intro to Naval Warfare Strategy", duration: "15:30" },
        { title: "Getting started with Strategic Planning", duration: "22:45" },
        { title: "What is Modern Naval Warfare", duration: "18:20" },
        { title: "Naval Warfare FAQs", duration: "12:15" },
        { title: "How to plan your first operation", duration: "25:10" }
      ]
    },
    {
      section: "Strategic Planning",
      lessons: [
        { title: "Create your own Strategic Brief", duration: "20:30" },
        { title: "Mission Planning Fundamentals", duration: "28:15" }
      ]
    },
    {
      section: "Tactical Operations",
      lessons: [
        { title: "Command and Control Systems", duration: "32:20" },
        { title: "Fleet Coordination Techniques", duration: "26:45" },
        { title: "Communication Protocols", duration: "19:30" },
        { title: "Production Video 1 – Building Support Operations", duration: "35:15" }
      ]
    },
    {
      section: "Advanced Strategies",
      lessons: [
        { title: "What is Advanced Naval Strategy", duration: "24:30" },
        { title: "How to implement strategic frameworks", duration: "31:20" },
        { title: "Advanced Fleet Operations", duration: "29:45" }
      ]
    }
  ],
  instructor: {
    name: "Admiral Sarah Mitchell",
    title: "Fleet Commander",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    rating: 5.0,
    courses: 8,
    students: 1250,
    bio: "Hi! I'm Admiral Sarah Mitchell, and I'm passionate about BVT excellence. I specialize in strategic BVT operations and have led campaigns for multiple international operations. I use a conversational style in my teaching so that students don't get bored. I aim to teach more like a colleague walking you through the material rather than a jargon-heavy, mundane lecturer. Hope you enjoy my courses!"
  }
};

const FALLBACK_RELATED_COURSES = [
  {
    id: 2,
    title: "Submarine Command Operations",
    slug: "submarine-command-operations",
    instructor: "Commander James Rodriguez",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    category: "Submarine Operations",
    lessons: 20,
    students: 85,
    rating: 4.8,
    price: 999,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Leadership Excellence Program",
    slug: "leadership-excellence-program",
    instructor: "Vice Admiral Michael Thompson",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    category: "Leadership",
    lessons: 18,
    students: 120,
    rating: 4.9,
    price: 899,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  }
];

export default function CourseDetailsPage({ params }) {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;

  const [courseData, setCourseData] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [expandedSections, setExpandedSections] = useState([]);
  const [curriculum, setCurriculum] = useState([]);

  // Get enrollment status (only for authenticated users)
  // This won't block the page load if user is not authenticated
  // Extract courseId from courseData when available
  const courseId = courseData?._id || courseData?.id;
  const { isEnrolled, enrollment, loading: enrollmentLoading } = useCourseEnrollment(
    isAuthenticated && courseId ? courseId : null
  );

  // Debug: Log enrollment status
  useEffect(() => {
    if (courseId && isAuthenticated) {
    }
  }, [courseId, isAuthenticated, isEnrolled, enrollment]);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);
        const response = await getCourseBySlug(slug);

        if (response.success && response.data) {
          const course = response.data;
          setCourseData(course);

          // Expand first section if curriculum exists
          if (course.curriculum && course.curriculum.length > 0) {
            setExpandedSections([course.curriculum[0].section || course.curriculum[0].title]);
            setCurriculum(course.curriculum);
          } else if (course.chapters && Array.isArray(course.chapters)) {
            // If backend returns chapters, transform to curriculum format
            const transformedCurriculum = course.chapters.map((chapter, index) => ({
              section: chapter.title || `Chapter ${index + 1}`,
              lessons: chapter.lessons || []
            }));
            setCurriculum(transformedCurriculum);
            if (transformedCurriculum.length > 0) {
              setExpandedSections([transformedCurriculum[0].section]);
            }
          }

          // Fetch related courses (same category or fallback to all courses)
          try {
            let relatedResponse;
            const categoryId = course.category?._id || course.category;
            
            if (categoryId) {
              // Try to fetch by category first
              try {
                relatedResponse = await getAllCourses({
                  category: categoryId,
                  limit: 6
                });
              } catch (catErr) {
                console.error('Error fetching by category:', catErr);
                relatedResponse = null;
              }
            }
            
            // If category fetch failed or returned no results, fetch all courses
            if (!relatedResponse || !relatedResponse.success || !relatedResponse.data || relatedResponse.data.length === 0) {
              try {
                relatedResponse = await getAllCourses({
                  limit: 6
                });
              } catch (allErr) {
                console.error('Error fetching all courses:', allErr);
                relatedResponse = null;
              }
            }
            
            if (relatedResponse && relatedResponse.success && relatedResponse.data) {
              // Filter out current course
              const currentId = course._id || course.id;
              const filtered = relatedResponse.data.filter(c => {
                const courseId = c._id || c.id;
                return courseId && courseId !== currentId;
              });
              
              if (filtered.length > 0) {
                setRelatedCourses(filtered.slice(0, 3));
              } else {
                // Use fallback if no courses found after filtering
                setRelatedCourses(FALLBACK_RELATED_COURSES);
              }
            } else {
              // Use fallback if API call failed
              setRelatedCourses(FALLBACK_RELATED_COURSES);
            }
          } catch (err) {
            console.error('Error fetching related courses:', err);
            // Use fallback on error
            setRelatedCourses(FALLBACK_RELATED_COURSES);
          }
        } else {
          setError('Course not found');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const toggleSection = (sectionTitle) => {
    setExpandedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const handleCTAClick = () => {
    if (!courseData) return;

    if (!isAuthenticated) {
      // Redirect to login with return URL
      router.push(`/login?redirect=${encodeURIComponent(`/courses/${slug}`)}`);
      return;
    }

    // Check if course is offline
    const isOffline = courseData.isOnline === false;

    if (isEnrolled) {
      if (isOffline) {
        // Offline courses don't have learning pages
        // Message will be shown in the UI instead
        return;
      }
      // Go to learning page for online courses
      router.push(`/courses/${slug}/learn`);
    } else {
      // User not enrolled - redirect to billing page
      router.push(`/courses/${slug}/billing`);
    }
  };

  // Loading state - don't wait for enrollment check, only wait for course data
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The course you are looking for does not exist.'}</p>
          <Link href="/courses">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Browse All Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Get instructor info
  const instructor = courseData.instructor?.userId || courseData.instructor || {};
  const instructorName = instructor.firstName && instructor.lastName
    ? `${instructor.firstName} ${instructor.lastName}`
    : instructor.name || 'Instructor';
  // Get instructor profilePic from instructor model (not userId) and convert to full URL
  const instructorImageUrl = courseData.instructor?.profilePic
    ? getImageUrl(courseData.instructor.profilePic)
    : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
  // Get instructor bio from instructor model
  const instructorBio = courseData.instructor?.bio || null;

  // Get category name
  const categoryName = courseData.category?.name || courseData.category || 'Uncategorized';

  // Format date
  const lastUpdated = courseData.updatedAt
    ? new Date(courseData.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date(courseData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Determine CTA button
  const getCTAButton = () => {
    const isOffline = courseData.isOnline === false;

    if (!isAuthenticated) {
      return {
        text: courseData.price ? `Buy Course - $${courseData.price}` : 'Buy Course',
        icon: <ShoppingCart className="w-5 h-5 mr-2" />,
        action: handleCTAClick
      };
    }

    // Check if user is enrolled (status can be 'active', 'completed', or just enrolled)
    if (isEnrolled) {
      // For offline courses, show enrollment message instead of learning button
      if (isOffline) {
        return null; // Return null to show custom message instead
      }
      const progress = enrollment?.progress || 0;
      return {
        text: progress > 0 ? 'Continue Learning' : 'Start Learning',
        icon: <Play className="w-5 h-5 mr-2" />,
        action: handleCTAClick
      };
    }

    return {
      text: courseData.price ? `Buy Course - $${courseData.price}` : 'Enroll Now',
      icon: <ShoppingCart className="w-5 h-5 mr-2" />,
      action: handleCTAClick
    };
  };

  const ctaButton = getCTAButton();
  const displayCurriculum = curriculum.length > 0 ? curriculum : [];
  const learningOutcomes = courseData.learningObjectives || [];
  const materials = courseData.materials || [];


  const courseImage = getImageUrl(courseData.image) || 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&h=600&fit=crop';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-6 lg:py-8 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Course Header with Gradient */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl lg:rounded-3xl shadow-xl border-2 border-gray-200 p-5 lg:p-6 mb-4 lg:mb-6 relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-2 right-2 w-16 h-16 border border-blue-600 rounded-full"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Link href="/courses" className="hover:text-blue-900 font-medium transition-colors">Courses</Link>
                      <span>/</span>
                      <span className="text-blue-900 font-medium">{categoryName}</span>
                      <span>/</span>
                      <span className="text-blue-900 font-bold">{courseData.title}</span>
                    </div>

                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      {categoryName}
                    </div>

                    {/* Course Title */}
                    <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 leading-tight">
                      <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                        {courseData.title}
                      </span>
                    </h1>

                    {/* Course Metadata */}
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm mb-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      {instructorName && (
                        <div className="flex items-center gap-3">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            src={instructorImageUrl}
                            alt={instructorName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 shadow-lg"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
                            }}
                          />
                          <div>
                            <span className="text-blue-700 text-xs font-medium">Instructor</span>
                            <div className="font-bold text-gray-900">{instructorName}</div>
                          </div>
                        </div>
                      )}

                      {courseData.rating && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(courseData.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                  }`}
                              />
                            ))}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{courseData.rating.toFixed(1)}</div>
                            <div className="text-blue-700 text-xs">
                              ({courseData.studentsCount || courseData.totalRatings || 0} reviews)
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Navigation Tabs */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-lg border-2 border-gray-200"
                >
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`flex-1 px-6 py-3 font-bold rounded-lg transition-all ${activeTab === "info"
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    Course Info
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex-1 px-6 py-3 font-bold rounded-lg transition-all ${activeTab === "reviews"
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    Reviews
                  </button>
                </motion.div> */}

                {/* Tab Content */}
                {activeTab === "info" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="space-y-5 lg:space-y-6"
                  >
                    {/* About Course */}
                    <section id="about-course" className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 p-5 lg:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">About Course</h2>
                      </div>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base lg:text-lg">
                        {courseData.description || 'No description available.'}
                      </p>
                    </section>

                    {/* What Will You Learn */}
                    {learningOutcomes.length > 0 && (
                      <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 p-5 lg:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">What Will You Learn?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {learningOutcomes.map((outcome, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200"
                            >
                              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 font-medium">{outcome}</span>
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Material Includes */}
                    {materials.length > 0 && (
                      <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 p-5 lg:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">Material Includes</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {materials.map((material, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200"
                            >
                              <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 font-medium">{material}</span>
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Course Curriculum */}
                    {displayCurriculum.length > 0 && (
                      <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 p-5 lg:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">Course Curriculum</h2>
                        </div>
                        <div className="space-y-4">
                          {displayCurriculum.map((section, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-yellow-400 transition-all"
                            >
                              <button
                                onClick={() => toggleSection(section.section)}
                                className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all flex items-center justify-between"
                              >
                                <h3 className="font-bold text-gray-900 text-lg">{section.section}</h3>
                                <motion.div
                                  animate={{ rotate: expandedSections.includes(section.section) ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronDown className="w-5 h-5 text-blue-900" />
                                </motion.div>
                              </button>

                              {expandedSections.includes(section.section) && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="bg-white"
                                >
                                  {section.lessons && section.lessons.length > 0 ? (
                                    section.lessons.map((lesson, lessonIndex) => (
                                      <div key={lessonIndex} className="border-t border-gray-100 px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                            <Play className="w-4 h-4 text-white" />
                                          </div>
                                          <span className="text-gray-900 font-medium">{lesson.title}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          {lesson.duration && (
                                            <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">{lesson.duration}</span>
                                          )}
                                          {!isEnrolled && (
                                            <Lock className="w-4 h-4 text-gray-400" />
                                          )}
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="px-6 py-4 text-gray-500 text-sm">
                                      No lessons in this section yet.
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Your Instructors */}
                    {instructorName && (
                      <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 p-5 lg:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">Your Instructor</h2>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                          <motion.img
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.3 }}
                            src={instructorImageUrl}
                            alt={instructorName}
                            className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow-xl"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{instructorName}</h3>
                            {instructor.email && (
                              <p className="text-blue-900 font-medium mb-2">{instructor.email}</p>
                            )}

                            {instructorBio && (
                              <div className="text-gray-700 mb-3 leading-relaxed whitespace-pre-wrap text-sm">
                                {instructorBio}
                              </div>
                            )}

                            {!instructorBio && (
                              <p className="text-gray-500 text-sm italic">No biography available.</p>
                            )}
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Ratings & Reviews */}
                    {/* <section className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 p-5 lg:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">Ratings & Reviews</h2>
                      </div>
                      <div className="text-center py-8">
                        <div className="text-6xl mb-3">📮</div>
                        <p className="text-gray-500 text-lg font-medium">No Review Yet</p>
                      </div>
                    </section> */}

                  </motion.div>
                )}

                {/* {activeTab === "reviews" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-gray-200 p-5 lg:p-6"
                  >
                    <div className="text-center py-8">
                      <div className="text-6xl mb-3">📮</div>
                      <p className="text-gray-500 text-lg font-medium">No Review Yet</p>
                    </div>
                  </motion.div>
                )} */}
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="sticky top-6"
                >
                  <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200 hover:border-yellow-400 transition-all">
                    {/* Course Thumbnail */}
                    <div className="relative h-56 lg:h-64 overflow-hidden">
                      <img
                        src={courseImage}
                        alt={courseData.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors shadow-xl">
                          <Play className="w-8 h-8 text-blue-900" />
                        </div>
                      </motion.button>
                    </div>

                    {/* Course Details */}
                    <div className="p-5">
                      {ctaButton ? (
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={ctaButton.action}
                          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all mb-4 shadow-lg flex items-center justify-center gap-2"
                          disabled={enrollmentLoading}
                        >
                          {enrollmentLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            <>
                              {ctaButton.icon}
                              {ctaButton.text}
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      ) : (
                        // Offline course enrolled message
                        <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-blue-900 font-bold mb-1">You have enrolled for this course</p>
                              <p className="text-blue-700 text-sm">Check your mail for further instructions.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3 mb-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        {(courseData.lessons || courseData.lectures) && (
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                <Play className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-gray-700 font-bold">Lectures</span>
                            </div>
                            <span className="font-bold text-gray-900 text-lg">{courseData.lessons || courseData.lectures}</span>
                          </div>
                        )}

                        {courseData.level && (
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                                <Award className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-gray-700 font-bold">Skill Level</span>
                            </div>
                            <span className="font-bold text-gray-900 text-lg">{courseData.level}</span>
                          </div>
                        )}

                        {courseData.duration && (
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                                <Clock className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-gray-700 font-bold">Duration</span>
                            </div>
                            <span className="font-bold text-gray-900 text-lg">{courseData.duration}</span>
                          </div>
                        )}

                        {courseData.certificate !== undefined && (
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-r ${courseData.certificate ? 'from-green-500 to-green-600' : 'from-gray-400 to-gray-500'} rounded-lg flex items-center justify-center shadow-lg`}>
                                <Award className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-gray-700 font-bold">Certificate</span>
                            </div>
                            <span className={`font-bold text-lg ${courseData.certificate ? 'text-green-600' : 'text-gray-400'}`}>
                              {courseData.certificate ? 'Yes' : 'No'}
                            </span>
                          </div>
                        )}

                        {courseData.price && (
                          <div className="flex items-center justify-between py-3 border-t-2 border-blue-200 pt-3 mt-2">
                            <span className="text-gray-700 font-bold text-lg">Price</span>
                            <div className="text-right">
                              {courseData.originalPrice && courseData.originalPrice > courseData.price && (
                                <span className="text-sm text-gray-500 line-through mr-2">${courseData.originalPrice}</span>
                              )}
                              <span className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">${courseData.price}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center gap-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 border-2 border-gray-200"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="font-bold">Share this course</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses - Full Width */}
      <section id="related-courses" className="relative py-6 lg:py-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 lg:mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
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
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Related Courses</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Related Courses
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore more courses that might interest you
            </p>
          </motion.div>

          {relatedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {relatedCourses.map((course, index) => {
                const courseId = course._id || course.id;
                const courseSlug = course.slug || courseId;
                const courseTitle = course.title || 'Untitled Course';
                const courseImage = getImageUrl(course.image) || 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop';
                const courseCategory = course.category?.name || course.category || 'Uncategorized';
                const instructor = course.instructor?.userId || course.instructor || {};
                const instructorName = instructor.firstName && instructor.lastName
                  ? `${instructor.firstName} ${instructor.lastName}`
                  : instructor.name || 'Instructor';
                // Get instructor profilePic from instructor model (not userId) and convert to full URL
                const instructorImage = course.instructor?.profilePic
                  ? getImageUrl(course.instructor.profilePic)
                  : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
                const courseDuration = course.duration || null;
                const courseLevel = course.level || null;

                return (
                  <motion.div
                    key={courseId}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative bg-white rounded-2xl lg:rounded-3xl shadow-xl border-2 border-gray-200 hover:border-yellow-400 overflow-hidden hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Course Image */}
                    <Link href={`/courses/${courseSlug}`}>
                      <div className="relative h-52 lg:h-56 overflow-hidden cursor-pointer">
                        <img 
                          src={courseImage} 
                          alt={courseTitle} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300"></div>
                        
                        {/* Play Button Overlay on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl"
                          >
                            <Play className="w-8 h-8 text-blue-900 ml-1" fill="currentColor" />
                          </motion.div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm border border-yellow-300/50">
                            {courseCategory}
                          </motion.span>
                        </div>

                        {/* Rating Badge */}
                        {course.rating && (
                          <div className="absolute top-4 right-4 z-10">
                            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl border border-white/50">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-bold text-gray-900">{course.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Course Content */}
                    <div className="p-5 lg:p-6">
                      {/* Instructor */}
                      {instructorName && (
                        <Link href={`/courses/${courseSlug}`}>
                          <div className="flex items-center gap-3 mb-4 group/instructor cursor-pointer">
                            <motion.img 
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              src={instructorImage} 
                              alt={instructorName} 
                              className="w-11 h-11 rounded-full object-cover border-2 border-yellow-400 shadow-md transition-all duration-300" 
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold text-gray-900 group-hover/instructor:text-blue-900 transition-colors truncate">{instructorName}</div>
                              <div className="text-xs text-gray-500">Instructor</div>
                            </div>
                          </div>
                        </Link>
                      )}

                      {/* Course Title */}
                      <Link href={`/courses/${courseSlug}`}>
                        <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 text-lg lg:text-xl hover:text-blue-900 transition-colors cursor-pointer leading-tight group-hover:underline">
                          {courseTitle}
                        </h3>
                      </Link>

                      {/* Course Stats */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {(course.lessons || course.lectures) && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                            <BookOpen className="w-4 h-4 text-blue-700" />
                            <span className="text-xs font-semibold text-gray-700">{course.lessons || course.lectures} Lessons</span>
                          </div>
                        )}
                        {course.studentsCount && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100">
                            <Users className="w-4 h-4 text-green-700" />
                            <span className="text-xs font-semibold text-gray-700">{course.studentsCount}</span>
                          </div>
                        )}
                        {courseDuration && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-100">
                            <Clock className="w-4 h-4 text-purple-700" />
                            <span className="text-xs font-semibold text-gray-700">{courseDuration}</span>
                          </div>
                        )}
                        {courseLevel && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-lg border border-orange-100">
                            <Award className="w-4 h-4 text-orange-700" />
                            <span className="text-xs font-semibold text-gray-700">{courseLevel}</span>
                          </div>
                        )}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                        {course.price ? (
                          <>
                            <div className="flex flex-col">
                              {course.originalPrice && course.originalPrice > course.price && (
                                <span className="text-xs text-gray-400 line-through mb-0.5">${course.originalPrice}</span>
                              )}
                              <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                                ${course.price}
                              </span>
                            </div>
                            <Link href={`/courses/${courseSlug}`}>
                              <motion.button
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-5 py-2.5 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-sm"
                              >
                                View Course
                                <ArrowRight className="w-4 h-4" />
                              </motion.button>
                            </Link>
                          </>
                        ) : (
                          <Link href={`/courses/${courseSlug}`} className="w-full">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-5 py-2.5 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm"
                            >
                              View Course
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4">📚</div>
              <p className="text-gray-500 text-lg font-medium">No related courses found at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">Check back later for more courses!</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
