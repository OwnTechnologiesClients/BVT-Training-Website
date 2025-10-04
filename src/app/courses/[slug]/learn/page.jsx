"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Clock, CheckCircle, Circle, Lock, Menu, X } from "lucide-react";
import Link from "next/link";

const COURSE_CONTENT = {
  modules: [
    {
      id: "getting-started",
      title: "Getting Started",
      completed: 0,
      total: 5,
      lessons: [
        {
          id: 1,
          title: "Intro to Naval Training Course",
          duration: "5:30",
          isCompleted: false,
          type: "video"
        },
        {
          id: 2,
          title: "Getting started with Naval Operations",
          duration: "8:15",
          isCompleted: false,
          type: "video"
        },
        {
          id: 3,
          title: "What is Naval Warfare",
          duration: "12:45",
          isCompleted: false,
          type: "video"
        },
        {
          id: 4,
          title: "Naval FAQs - Essential Knowledge",
          duration: "6:20",
          isCompleted: false,
          type: "video"
        },
        {
          id: 5,
          title: "How to start your Naval Career",
          duration: "15:30",
          isCompleted: false,
          type: "video"
        }
      ]
    },
    {
      id: "the-brief",
      title: "The Brief",
      completed: 0,
      total: 2,
      lessons: [
        {
          id: 6,
          title: "Mission Overview",
          duration: "10:15",
          isCompleted: false,
          type: "video"
        },
        {
          id: 7,
          title: "Strategic Planning",
          duration: "18:30",
          isCompleted: false,
          type: "video"
        }
      ]
    },
    {
      id: "operations",
      title: "Operations & Navigation",
      completed: 0,
      total: 4,
      lessons: [
        {
          id: 8,
          title: "Navigation Fundamentals",
          duration: "22:45",
          isCompleted: false,
          type: "video"
        },
        {
          id: 9,
          title: "Communication Protocols",
          duration: "14:20",
          isCompleted: false,
          type: "video"
        },
        {
          id: 10,
          title: "Emergency Procedures",
          duration: "16:10",
          isCompleted: false,
          type: "video"
        },
        {
          id: 11,
          title: "Team Coordination",
          duration: "19:35",
          isCompleted: false,
          type: "video"
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced Strategies",
      completed: 0,
      total: 3,
      lessons: [
        {
          id: 12,
          title: "Tactical Analysis",
          duration: "25:15",
          isCompleted: false,
          type: "video",
          isLocked: true
        },
        {
          id: 13,
          title: "Leadership in Combat",
          duration: "20:45",
          isCompleted: false,
          type: "video",
          isLocked: true
        },
        {
          id: 14,
          title: "Final Assessment",
          duration: "30:00",
          isCompleted: false,
          type: "quiz",
          isLocked: true
        }
      ]
    }
  ]
};

export default function CourseLearningPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState(["getting-started"]);
  const [currentLessonId, setCurrentLessonId] = useState(1);

  const toggleModule = (moduleId) => {
    const currentLessonModule = COURSE_CONTENT.modules.find(module =>
      module.lessons.some(lesson => lesson.id === currentLessonId)
    );

    // If the clicked module is the one containing the current lesson, do not collapse it
    if (moduleId === currentLessonModule?.id) {
      return;
    }

    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Get all lessons in order
  const allLessons = COURSE_CONTENT.modules.flatMap(module => module.lessons);
  const currentLesson = allLessons.find(lesson => lesson.id === currentLessonId);
  const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);

  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(lesson => lesson.isCompleted).length;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  // Navigation functions
  const goToNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      if (!nextLesson.isLocked) {
        setCurrentLessonId(nextLesson.id);
      }
    }
  };

  const goToPreviousLesson = () => {
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      setCurrentLessonId(prevLesson.id);
    }
  };

  const selectLesson = (lessonId) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    if (!lesson.isLocked) {
      setCurrentLessonId(lessonId);
    }
  };

  // Auto-expand module containing current lesson
  useEffect(() => {
    if (currentLesson) {
      const currentModule = COURSE_CONTENT.modules.find(module => 
        module.lessons.some(lesson => lesson.id === currentLessonId)
      );
      if (currentModule && !expandedModules.includes(currentModule.id)) {
        setExpandedModules(prev => [...prev, currentModule.id]);
      }
    }
  }, [currentLessonId, expandedModules]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Course Content</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{completedLessons}/{totalLessons} lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="flex-1 overflow-y-auto p-4">
          {COURSE_CONTENT.modules.map((module) => (
            <div key={module.id} className="mb-4">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChevronRight 
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      expandedModules.includes(module.id) ? 'rotate-90' : ''
                    }`} 
                  />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{module.title}</div>
                    <div className="text-sm text-gray-500">{module.completed}/{module.total} completed</div>
                  </div>
                </div>
              </button>

              {/* Module Lessons */}
              {expandedModules.includes(module.id) && (
                <div className="mt-2 ml-4 space-y-1">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => selectLesson(lesson.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        lesson.id === currentLessonId 
                          ? 'bg-blue-50 border border-blue-200' 
                          : lesson.isLocked 
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* Lesson Icon */}
                      <div className="flex-shrink-0">
                        {lesson.isLocked ? (
                          <Lock className="w-4 h-4 text-gray-400" />
                        ) : lesson.id === currentLessonId ? (
                          <Play className="w-4 h-4 text-blue-600" />
                        ) : lesson.isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400" />
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium ${
                          lesson.id === currentLessonId ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                          {lesson.type === 'quiz' && (
                            <span className="bg-yellow-100 text-yellow-800 px-1 rounded">Quiz</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link href="/courses" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Back to Courses</span>
              </Link>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              {currentLesson?.title || "Course Learning"}
            </h1>
            <button className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video/Content Area */}
        <div className="flex-1 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Video Thumbnail/Player */}
            <div className="relative w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-navy-900 flex items-center justify-center">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-96 h-96 border-2 border-yellow-500 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-yellow-500 rounded-full"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Learn Naval Operations
                  </h2>
                  <p className="text-xl text-blue-100 mb-8">
                    Master the fundamentals of naval warfare and operations
                  </p>
                </div>

                {/* Play Button */}
                <div className="flex items-center justify-center gap-6">
                  <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3 shadow-lg">
                    <Play className="w-6 h-6" />
                    Start Learning
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-colors flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    Watch Later
                  </button>
                </div>
              </div>

              {/* Instructor Photo */}
              <div className="absolute bottom-8 right-8">
                <div className="w-24 h-24 bg-white rounded-full overflow-hidden shadow-lg">
                  <img 
                    src="/images/instructor.jpg" 
                    alt="Instructor"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={goToPreviousLesson}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 transition-colors ${
                  currentIndex === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Previous</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {currentIndex + 1} of {totalLessons}
              </div>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <span className="text-sm">Share</span>
              </button>
              <button 
                onClick={goToNextLesson}
                disabled={currentIndex === totalLessons - 1 || allLessons[currentIndex + 1]?.isLocked}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  currentIndex === totalLessons - 1 || allLessons[currentIndex + 1]?.isLocked
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-900 text-white hover:bg-blue-800'
                }`}
              >
                Next Lesson
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
