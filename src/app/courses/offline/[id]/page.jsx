"use client";

import { useState } from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { 
  Star, 
  Clock, 
  Users, 
  Award, 
  Play, 
  MapPin,
  Calendar,
  GraduationCap,
  BookOpen,
  Shield,
  Ship,
  CheckCircle,
  Share2,
  ArrowLeft,
  Phone,
  Mail
} from "lucide-react";

// Sample offline course data
const OFFLINE_COURSE_DATA = {
  id: 1,
  title: "Advanced Naval Engineering Workshop",
  category: "Technical Training",
  lastUpdated: "December 11, 2024",
  rating: 4.9,
  totalRatings: 156,
  image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&h=600&fit=crop",
  price: 2500,
  originalPrice: 3000,
  duration: "5 days",
  startDate: "March 15, 2024",
  endDate: "March 19, 2024",
  location: "Mumbai Naval Base",
  maxStudents: 15,
  currentStudents: 12,
  skillLevel: "Advanced",
  certificate: true,
  description: `The Advanced Naval Engineering Workshop is a comprehensive hands-on training program designed for naval engineers and technical personnel who want to master advanced engineering principles and practical applications in naval systems.

This intensive 5-day workshop combines theoretical knowledge with extensive practical exercises, allowing participants to work directly with cutting-edge naval engineering equipment and systems. You'll learn from experienced naval engineers and gain insights from real-world case studies and scenarios.

The program covers advanced topics including propulsion systems, electrical systems, hydraulic systems, and maintenance protocols. Participants will engage in hands-on workshops, group discussions, and practical exercises that simulate real naval engineering challenges.

By the end of this workshop, you'll have the practical skills and knowledge needed to handle complex naval engineering tasks, troubleshoot advanced systems, and contribute effectively to naval engineering projects.`,
  
  learningOutcomes: [
    "Master advanced naval engineering principles and applications",
    "Develop hands-on skills with naval engineering equipment",
    "Learn advanced troubleshooting and maintenance techniques",
    "Understand safety protocols and best practices",
    "Gain experience with real-world engineering scenarios",
    "Network with fellow naval engineering professionals",
    "Receive certification in advanced naval engineering",
    "Apply engineering knowledge to solve complex problems"
  ],
  
  materials: [
    "Comprehensive workshop manual and reference materials",
    "Hands-on access to naval engineering equipment",
    "Safety equipment and protective gear",
    "Certificate of completion",
    "Digital resources and documentation",
    "Networking opportunities with industry professionals"
  ],
  
  schedule: [
    {
      day: "Day 1",
      title: "Introduction to Advanced Naval Engineering",
      topics: [
        "Welcome and orientation",
        "Overview of naval engineering systems",
        "Safety protocols and procedures",
        "Introduction to workshop equipment"
      ]
    },
    {
      day: "Day 2",
      title: "Propulsion Systems and Power Generation",
      topics: [
        "Advanced propulsion system analysis",
        "Power generation and distribution",
        "Hands-on equipment training",
        "Practical exercises and simulations"
      ]
    },
    {
      day: "Day 3",
      title: "Electrical and Electronic Systems",
      topics: [
        "Naval electrical systems overview",
        "Electronic control systems",
        "Troubleshooting techniques",
        "Practical maintenance exercises"
      ]
    },
    {
      day: "Day 4",
      title: "Hydraulic and Mechanical Systems",
      topics: [
        "Advanced hydraulic systems",
        "Mechanical component analysis",
        "Preventive maintenance strategies",
        "Real-world case studies"
      ]
    },
    {
      day: "Day 5",
      title: "Integration and Final Assessment",
      topics: [
        "System integration exercises",
        "Comprehensive assessment",
        "Certification process",
        "Career development discussion"
      ]
    }
  ],
  
  instructor: {
    name: "Commander James Rodriguez",
    title: "Senior Naval Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 5.0,
    courses: 12,
    students: 450,
    bio: "Commander James Rodriguez is a distinguished naval engineer with over 15 years of experience in naval engineering and systems maintenance. He has served in various capacities including Chief Engineer on multiple naval vessels and has been instrumental in developing advanced engineering training programs for the navy. Commander Rodriguez holds advanced degrees in Mechanical Engineering and Naval Architecture, and has received numerous awards for his contributions to naval engineering education and training.",
    qualifications: [
      "Master's in Mechanical Engineering",
      "Advanced Naval Architecture Certification",
      "15+ years naval engineering experience",
      "Certified Engineering Instructor"
    ]
  },
  
  location: {
    name: "Mumbai Naval Base",
    address: "Mumbai Naval Base, Colaba, Mumbai, Maharashtra 400001",
    facilities: [
      "State-of-the-art engineering laboratories",
      "Advanced simulation equipment",
      "Modern classroom facilities",
      "On-site accommodation available",
      "Cafeteria and dining facilities",
      "Parking and transportation services"
    ],
    mapUrl: "https://maps.google.com/maps?q=Mumbai+Naval+Base"
  }
};

export default function OfflineCourseDetailsPage() {
  const [activeTab, setActiveTab] = useState("info");

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
                    <Link href="/courses/offline" className="hover:text-blue-900">Offline Courses</Link>
                    <span>/</span>
                    <span className="text-blue-900">{OFFLINE_COURSE_DATA.title}</span>
                  </div>

                  {/* Back Button */}
                  <Link href="/courses/offline" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Offline Courses</span>
                  </Link>

                  {/* Category Badge */}
                  <div className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {OFFLINE_COURSE_DATA.category}
                  </div>
                  
                  {/* Course Title */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {OFFLINE_COURSE_DATA.title}
                  </h1>

                  {/* Course Metadata */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-3">
                      <img src={OFFLINE_COURSE_DATA.instructor.image} alt={OFFLINE_COURSE_DATA.instructor.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <span className="text-gray-500">Instructor</span>
                        <div className="font-medium text-gray-900">{OFFLINE_COURSE_DATA.instructor.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="text-gray-500">Location</span>
                        <div className="font-medium text-gray-900">{OFFLINE_COURSE_DATA.location.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="text-gray-500">Duration</span>
                        <div className="font-medium text-gray-900">{OFFLINE_COURSE_DATA.startDate} - {OFFLINE_COURSE_DATA.endDate}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{OFFLINE_COURSE_DATA.rating}</div>
                        <div className="text-gray-500 text-xs">({OFFLINE_COURSE_DATA.totalRatings} reviews)</div>
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
                    onClick={() => setActiveTab("schedule")}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === "schedule"
                        ? "text-blue-900 border-b-2 border-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Schedule
                  </button>
                  <button
                    onClick={() => setActiveTab("location")}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === "location"
                        ? "text-blue-900 border-b-2 border-blue-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Location
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "info" && (
                  <div className="space-y-12">
                    {/* About Course */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Workshop</h2>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {OFFLINE_COURSE_DATA.description}
                      </p>
                    </section>

                    {/* What Will You Learn */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">What Will You Learn?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {OFFLINE_COURSE_DATA.learningOutcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Materials Included */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Materials Included</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {OFFLINE_COURSE_DATA.materials.map((material, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{material}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Your Instructor */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructor</h2>
                      <div className="flex items-start gap-6">
                        <img 
                          src={OFFLINE_COURSE_DATA.instructor.image} 
                          alt={OFFLINE_COURSE_DATA.instructor.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{OFFLINE_COURSE_DATA.instructor.name}</h3>
                          <p className="text-blue-900 font-medium mb-4">{OFFLINE_COURSE_DATA.instructor.title}</p>
                          
                          <div className="flex items-center gap-6 mb-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{OFFLINE_COURSE_DATA.instructor.rating} Rating</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{OFFLINE_COURSE_DATA.instructor.courses} Courses</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{OFFLINE_COURSE_DATA.instructor.students} Students</span>
                            </div>
                          </div>

                          {/* Qualifications */}
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Qualifications:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {OFFLINE_COURSE_DATA.instructor.qualifications.map((qual, index) => (
                                <li key={index}>{qual}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <p className="text-gray-600 leading-relaxed">{OFFLINE_COURSE_DATA.instructor.bio}</p>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "schedule" && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Workshop Schedule</h2>
                    <div className="space-y-6">
                      {OFFLINE_COURSE_DATA.schedule.map((day, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{day.day}: {day.title}</h3>
                          <ul className="space-y-2">
                            {day.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "location" && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Workshop Location</h2>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{OFFLINE_COURSE_DATA.location.name}</h3>
                      <p className="text-gray-600 mb-4">{OFFLINE_COURSE_DATA.location.address}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Facilities Available:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {OFFLINE_COURSE_DATA.location.facilities.map((facility, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-gray-600">{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a 
                        href={OFFLINE_COURSE_DATA.location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        View on Map
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Course Image */}
                    <div className="relative">
                      <img 
                        src={OFFLINE_COURSE_DATA.image} 
                        alt={OFFLINE_COURSE_DATA.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    {/* Course Details */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl font-bold text-blue-900">${OFFLINE_COURSE_DATA.price}</div>
                        {OFFLINE_COURSE_DATA.originalPrice && (
                          <div className="text-lg text-gray-500 line-through">${OFFLINE_COURSE_DATA.originalPrice}</div>
                        )}
                      </div>

                      <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors mb-6 shadow-md">
                        Enroll Now
                      </button>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-700 font-medium">Duration</span>
                          </div>
                          <span className="font-bold text-gray-900">{OFFLINE_COURSE_DATA.duration}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-700 font-medium">Start Date</span>
                          </div>
                          <span className="font-bold text-gray-900">{OFFLINE_COURSE_DATA.startDate}</span>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-700 font-medium">Available Spots</span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {OFFLINE_COURSE_DATA.maxStudents - OFFLINE_COURSE_DATA.currentStudents} left
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-blue-900" />
                            <span className="text-gray-700 font-medium">Certificate</span>
                          </div>
                          <span className="font-bold text-green-600">Yes</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-4">
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">Share this course</span>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>+91 256 214 203 215</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>info@bvttraining.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
