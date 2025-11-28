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
  Calendar,
  User,
  Tag,
  Loader2,
  ShoppingCart,
  Lock
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
      console.log('📚 Enrollment check:', {
        courseId,
        isEnrolled,
        enrollmentStatus: enrollment?.status,
        enrollment
      });
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
          
          // Debug: Log course data to see what we're getting
          console.log('Course data received:', course);
          console.log('Course chapters:', course.chapters);
          
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
            console.log('Transformed curriculum:', transformedCurriculum);
            setCurriculum(transformedCurriculum);
            if (transformedCurriculum.length > 0) {
              setExpandedSections([transformedCurriculum[0].section]);
            }
          } else {
            console.log('No curriculum or chapters found in course data');
          }

          // Fetch related courses (same category)
          if (course.category) {
            try {
              const relatedResponse = await getAllCourses({ 
                category: course.category._id || course.category,
                limit: 4 
              });
              if (relatedResponse.success && relatedResponse.data) {
                // Filter out current course
                const filtered = relatedResponse.data.filter(c => 
                  c._id !== course._id && c.id !== course.id
                );
                setRelatedCourses(filtered.slice(0, 3));
              }
            } catch (err) {
              console.error('Error fetching related courses:', err);
            }
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


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Course Header with Gradient */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-gray-50 p-8 rounded-2xl mb-8">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Link href="/courses" className="hover:text-blue-900">Courses</Link>
                    <span>/</span>
                    <span className="text-blue-900">{categoryName}</span>
                    <span>/</span>
                    <span className="text-blue-900">{courseData.title}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {categoryName}
                  </div>
                  
                  {/* Course Title */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {courseData.title}
                  </h1>

                  {/* Course Metadata */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                    {instructorName && (
                      <div className="flex items-center gap-3">
                        <img 
                          src={instructorImageUrl} 
                          alt={instructorName} 
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
                          }}
                        />
                        <div>
                          <span className="text-gray-500">Teacher</span>
                          <div className="font-medium text-gray-900">{instructorName}</div>
                        </div>
                      </div>
                    )}
                    
                    {categoryName && (
                      <div className="flex items-center gap-3">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-500">Category</span>
                          <div className="font-medium text-gray-900">{categoryName}</div>
                        </div>
                      </div>
                    )}
                    
                    {lastUpdated && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-gray-500">Last Updated</span>
                          <div className="font-medium text-gray-900">{lastUpdated}</div>
                        </div>
                      </div>
                    )}
                    
                    {courseData.rating && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(courseData.rating) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{courseData.rating.toFixed(1)}</div>
                          <div className="text-gray-500 text-xs">
                            ({courseData.studentsCount || courseData.totalRatings || 0} {courseData.studentsCount || courseData.totalRatings ? 'students' : 'reviews'})
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === "info"
                        ? "text-blue-900 border-b-2 border-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Course Info
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === "reviews"
                        ? "text-blue-900 border-b-2 border-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Reviews
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "info" && (
                  <div className="space-y-12">
                    {/* About Course */}
                    <section id="about-course">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About Course</h2>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {courseData.description || 'No description available.'}
                      </p>
                    </section>

                    {/* What Will You Learn */}
                    {learningOutcomes.length > 0 && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">What Will You Learn?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {learningOutcomes.map((outcome, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Material Includes */}
                    {materials.length > 0 && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Material Includes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {materials.map((material, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{material}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Course Curriculum */}
                    {displayCurriculum.length > 0 && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                        <div className="space-y-4">
                          {displayCurriculum.map((section, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleSection(section.section)}
                              className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                            >
                              <h3 className="font-medium text-gray-900">{section.section}</h3>
                              {expandedSections.includes(section.section) ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                            </button>
                            
                            {expandedSections.includes(section.section) && (
                              <div className="bg-white">
                                {section.lessons && section.lessons.length > 0 ? (
                                  section.lessons.map((lesson, lessonIndex) => (
                                    <div key={lessonIndex} className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <Play className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-900">{lesson.title}</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        {lesson.duration && (
                                          <span className="text-sm text-gray-500">{lesson.duration}</span>
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
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                    )}

                    {/* Your Instructors */}
                    {instructorName && (
                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructors</h2>
                        <div className="flex items-start gap-6">
                          <img 
                            src={instructorImageUrl} 
                            alt={instructorName}
                            className="w-20 h-20 rounded-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{instructorName}</h3>
                            {instructor.email && (
                              <p className="text-blue-900 font-medium mb-3">{instructor.email}</p>
                            )}
                            
                            {instructorBio && (
                              <div className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
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
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ratings & Reviews</h2>
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📮</div>
                        <p className="text-gray-500 text-lg">No Review Yet</p>
                      </div>
                    </section>

                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📮</div>
                    <p className="text-gray-500 text-lg">No Review Yet</p>
                  </div>
                )}
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Course Thumbnail */}
                    <div className="relative">
                      <img 
                        src={courseData.image || 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&h=600&fit=crop'} 
                        alt={courseData.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <button className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors">
                          <Play className="w-8 h-8 text-blue-900" />
                        </div>
                      </button>
                    </div>

                    {/* Course Details */}
                    <div className="p-6">
                      {ctaButton ? (
                        <button 
                          onClick={ctaButton.action}
                          className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors mb-6 shadow-md flex items-center justify-center"
                          disabled={enrollmentLoading}
                        >
                          {enrollmentLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            <>
                              {ctaButton.icon}
                              {ctaButton.text}
                            </>
                          )}
                        </button>
                      ) : (
                        // Offline course enrolled message
                        <div className="w-full bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-blue-900 font-semibold mb-1">You have enrolled for this course</p>
                              <p className="text-blue-700 text-sm">Check your mail for further instructions.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-4 mb-6">
                        {(courseData.lessons || courseData.lectures) && (
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <Play className="w-5 h-5 text-blue-900" />
                              <span className="text-gray-700 font-medium">Lectures</span>
                            </div>
                            <span className="font-bold text-gray-900">{courseData.lessons || courseData.lectures}</span>
                          </div>
                        )}
                        
                        {courseData.level && (
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <Award className="w-5 h-5 text-blue-900" />
                              <span className="text-gray-700 font-medium">Skill Level</span>
                            </div>
                            <span className="font-bold text-gray-900">{courseData.level}</span>
                          </div>
                        )}
                        
                        {courseData.duration && (
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-blue-900" />
                              <span className="text-gray-700 font-medium">Duration</span>
                            </div>
                            <span className="font-bold text-gray-900">{courseData.duration}</span>
                          </div>
                        )}
                        
                        {courseData.certificate !== undefined && (
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <Award className="w-5 h-5 text-blue-900" />
                              <span className="text-gray-700 font-medium">Certificate</span>
                            </div>
                            <span className={`font-bold ${courseData.certificate ? 'text-green-600' : 'text-gray-400'}`}>
                              {courseData.certificate ? 'Yes' : 'No'}
                            </span>
                          </div>
                        )}

                        {courseData.price && (
                          <div className="flex items-center justify-between py-2 border-t border-gray-200 pt-2">
                            <span className="text-gray-700 font-medium">Price</span>
                            <div className="text-right">
                              {courseData.originalPrice && courseData.originalPrice > courseData.price && (
                                <span className="text-sm text-gray-500 line-through mr-2">${courseData.originalPrice}</span>
                              )}
                              <span className="text-2xl font-bold text-blue-900">${courseData.price}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">Share this course</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses - Full Width */}
      <section id="related-courses" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Courses</h2>
            <p className="text-lg text-gray-500">10,000+ unique online course list designs</p>
          </div>
          
          {relatedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCourses.map((course) => {
                const courseId = course._id || course.id;
                const courseSlug = course.slug || courseId;
                const courseTitle = course.title || 'Untitled Course';
                const courseImage = course.image || 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop';
                const courseCategory = course.category?.name || course.category || 'Uncategorized';
                const instructor = course.instructor?.userId || course.instructor || {};
                const instructorName = instructor.firstName && instructor.lastName 
                  ? `${instructor.firstName} ${instructor.lastName}`
                  : instructor.name || 'Instructor';
                // Get instructor profilePic from instructor model (not userId) and convert to full URL
                const instructorImage = course.instructor?.profilePic 
                  ? getImageUrl(course.instructor.profilePic)
                  : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';

                return (
                  <div key={courseId} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    {/* Course Image */}
                    <div className="relative">
                      <img src={courseImage} alt={courseTitle} className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
                          {courseCategory}
                        </span>
                      </div>
                      
                      {/* Rating */}
                      {course.rating && (
                        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-sm font-bold text-gray-900">{course.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Course Content */}
                    <div className="p-6">
                      {/* Instructor */}
                      {instructorName && (
                        <div className="flex items-center gap-3 mb-3">
                          <img src={instructorImage} alt={instructorName} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{instructorName}</div>
                            <div className="text-xs text-gray-500">Instructor</div>
                          </div>
                        </div>
                      )}
                      
                      {/* Course Title */}
                      <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg">{courseTitle}</h3>
                      
                      {/* Course Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        {(course.lessons || course.lectures) && (
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.lessons || course.lectures} Lessons</span>
                          </div>
                        )}
                        {course.studentsCount && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course.studentsCount} Students</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        {course.price ? (
                          <>
                            <div className="text-2xl font-bold text-gray-900">${course.price}</div>
                            <Link href={`/courses/${courseSlug}`}>
                              <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                                View Course
                              </button>
                            </Link>
                          </>
                        ) : (
                          <Link href={`/courses/${courseSlug}`} className="w-full">
                            <button className="w-full bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                              View Course
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No related courses found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
