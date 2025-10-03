"use client";

import { useState, useEffect } from "react";
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
  Tag
} from "lucide-react";

// Sample course data
const COURSE_DATA = {
  id: 1,
  title: "Advanced Naval Warfare Strategies",
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
  description: `Mastering Naval Warfare Strategies is a comprehensive course designed for those who want to create professional, fully responsive naval operations without writing a single line of code. Whether you're a naval officer, strategist, or military professional looking to build advanced tactical skills or command operations, this course will teach you how to leverage modern naval warfare principles to bring your strategic vision to life.

In this hands-on course, you'll learn how to plan, execute, and lead naval operations using advanced strategic frameworks. From creating battle plans and coordinating fleet movements to integrating technology and intelligence, you'll gain the skills needed to produce highly effective and successful naval campaigns. You'll also dive into best practices for logistics, communication, and mission planning, ensuring your operations succeed in any environment and achieve strategic objectives.

By the end of this course, you'll have the expertise to lead complex naval operations with confidence, and you'll be prepared to use advanced strategic principles to bring your military leadership vision to life—no prior experience required!`,
  learningOutcomes: [
    "Create responsive naval operations using modern strategies",
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
    bio: "Hi! I'm Admiral Sarah Mitchell, and I'm passionate about naval excellence. I specialize in strategic naval operations and have led campaigns for multiple international operations. I use a conversational style in my teaching so that students don't get bored. I aim to teach more like a colleague walking you through the material rather than a jargon-heavy, mundane lecturer. Hope you enjoy my courses!"
  }
};

const RELATED_COURSES = [
  {
    id: 2,
    title: "Submarine Command Operations",
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

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState("info");
  const [expandedSections, setExpandedSections] = useState(["Getting Started"]);
  const [isSticky, setIsSticky] = useState(false);

  const toggleSection = (sectionTitle) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const aboutSection = document.querySelector('#about-course');
          const relatedSection = document.querySelector('#related-courses');
          
          if (aboutSection && relatedSection) {
            const aboutTop = aboutSection.offsetTop;
            const relatedTop = relatedSection.offsetTop;
            const scrollY = window.scrollY;
            
            // Sidebar behavior:
            // 1. Scroll normally until About Course section
            // 2. Stick when About Course section starts
            // 3. When approaching Related Courses (within 200px), start scrolling again
            setIsSticky(scrollY >= aboutTop - 100 && scrollY < relatedTop - 300);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                    <span>Courses</span>
                    <span>/</span>
                    <span className="text-blue-900">{COURSE_DATA.category}</span>
                    <span>/</span>
                    <span className="text-blue-900">{COURSE_DATA.title}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {COURSE_DATA.category}
                  </div>
                  
                  {/* Course Title */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {COURSE_DATA.title}
                  </h1>

                  {/* Course Metadata */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-3">
                      <img src={COURSE_DATA.instructor.image} alt={COURSE_DATA.instructor.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <span className="text-gray-500">Teacher</span>
                        <div className="font-medium text-gray-900">{COURSE_DATA.instructor.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="text-gray-500">Category</span>
                        <div className="font-medium text-gray-900">{COURSE_DATA.category}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="text-gray-500">Last Updated</span>
                        <div className="font-medium text-gray-900">{COURSE_DATA.lastUpdated}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{COURSE_DATA.rating}</div>
                        <div className="text-gray-500 text-xs">({COURSE_DATA.totalRatings} reviews)</div>
                      </div>
                    </div>
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
                        {COURSE_DATA.description}
                      </p>
                      <button className="text-blue-900 font-medium mt-2">Show More</button>
                    </section>

                    {/* What Will You Learn */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">What Will You Learn?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {COURSE_DATA.learningOutcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Material Includes */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Material Includes</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {COURSE_DATA.materials.map((material, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{material}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Course Curriculum */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                      <div className="space-y-4">
                        {COURSE_DATA.curriculum.map((section, index) => (
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
                                {section.lessons.map((lesson, lessonIndex) => (
                                  <div key={lessonIndex} className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <Play className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-900">{lesson.title}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                                      <div className="w-4 h-4 text-gray-400">👁</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Your Instructors */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructors</h2>
                      <div className="flex items-start gap-6">
                        <img 
                          src={COURSE_DATA.instructor.image} 
                          alt={COURSE_DATA.instructor.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{COURSE_DATA.instructor.name}</h3>
                          <p className="text-blue-900 font-medium mb-4">{COURSE_DATA.instructor.title}</p>
                          
                          <div className="flex items-center gap-6 mb-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{COURSE_DATA.instructor.rating} Rating</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{COURSE_DATA.instructor.courses} Courses</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{COURSE_DATA.instructor.students} Students</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 leading-relaxed">{COURSE_DATA.instructor.bio}</p>
                        </div>
                      </div>
                    </section>

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
                <div className={`${isSticky ? 'sticky top-6' : ''} transition-all duration-500 ease-in-out`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Course Thumbnail */}
                    <div className="relative">
                      <img 
                        src={COURSE_DATA.image} 
                        alt={COURSE_DATA.title}
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
                      <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors mb-6 shadow-md">
                        Start Learning
                      </button>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <Play className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-700 font-medium">Lectures</span>
                          </div>
                          <span className="font-bold text-gray-900">{COURSE_DATA.lectures}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-700 font-medium">Skill Level</span>
                          </div>
                          <span className="font-bold text-gray-900">{COURSE_DATA.skillLevel}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-700 font-medium">Certificate</span>
                          </div>
                          <span className="font-bold text-green-600">Yes</span>
                        </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RELATED_COURSES.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                {/* Course Image */}
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
                      {course.category}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                  </div>
                </div>
                
                {/* Course Content */}
                <div className="p-6">
                  {/* Instructor */}
                  <div className="flex items-center gap-3 mb-3">
                    <img src={course.instructorImage} alt={course.instructor} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.instructor}</div>
                      <div className="text-xs text-gray-500">Instructor</div>
                    </div>
                  </div>
                  
                  {/* Course Title */}
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg">{course.title}</h3>
                  
                  {/* Course Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} Students</span>
                    </div>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">${course.price}</div>
                    <button className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
