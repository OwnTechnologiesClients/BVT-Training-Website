"use client";

import { useState, use } from "react";
import { ChevronLeft, ChevronRight, Play, Clock, CheckCircle, Circle, Lock, Menu, X, Video, FileText, Award } from "lucide-react";
import Link from "next/link";
import VideoPlayer from "../../../../components/VideoPlayer";

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
          title: "Intro to BVT Training Course",
          duration: "5:30",
          isCompleted: false,
          type: "video",
          videoSrc: "/200993-914924518.mp4",
          textContent: {
            introduction: "Welcome to the BVT (Basic Warfare Training) course. This comprehensive program will equip you with the fundamental knowledge and skills required for naval warfare operations.",
            objectives: [
              "Understand the core principles of BVT",
              "Learn essential naval warfare concepts",
              "Master basic operational procedures",
              "Develop tactical thinking skills"
            ],
            content: "BVT Training Course provides a structured approach to learning naval warfare fundamentals. The course covers everything from basic maritime operations to advanced tactical maneuvers. You'll learn about ship systems, navigation protocols, communication procedures, and combat readiness standards.\n\nThis introductory lesson sets the foundation for your entire training journey. Pay close attention to the key concepts presented, as they will be referenced throughout the course. The material is designed to build upon itself, so each lesson prepares you for the next level of complexity.",
            keyPoints: [
              "BVT covers fundamental naval warfare principles",
              "Structured learning approach with progressive complexity",
              "Practical application of theoretical concepts",
              "Real-world scenarios and case studies"
            ],
            conclusion: "By the end of this course, you'll have a solid understanding of BVT principles and be ready to apply them in real operational scenarios. Remember, consistent practice and attention to detail are key to mastering these concepts."
          }
        },
        {
          id: 2,
          title: "Getting started with BVT Operations",
          duration: "8:15",
          isCompleted: false,
          type: "video",
          videoSrc: "/200993-914924518.mp4",
          textContent: {
            introduction: "BVT Operations form the backbone of naval warfare effectiveness. This lesson introduces you to the fundamental operational procedures and protocols that every naval personnel must master.",
            objectives: [
              "Learn basic operational procedures",
              "Understand command and control structures",
              "Master communication protocols",
              "Develop operational awareness"
            ],
            content: "BVT Operations encompass a wide range of activities that ensure mission success and personnel safety. These operations include standard operating procedures (SOPs), emergency protocols, communication systems, and tactical coordination.\n\nKey operational areas include:\n• Pre-mission planning and preparation\n• Real-time mission execution\n• Post-mission debriefing and analysis\n• Continuous improvement processes\n\nEach operation follows a structured approach that maximizes efficiency while maintaining the highest safety standards. Understanding these procedures is crucial for effective team coordination and mission accomplishment.",
            keyPoints: [
              "Standard Operating Procedures (SOPs) are essential",
              "Communication protocols ensure coordination",
              "Safety standards must be maintained at all times",
              "Continuous improvement drives operational excellence"
            ],
            conclusion: "Mastering BVT Operations requires dedication and attention to detail. These procedures have been developed through years of experience and are designed to ensure mission success while protecting personnel and equipment."
          }
        },
        {
          id: 3,
          title: "What is BVT Warfare",
          duration: "12:45",
          isCompleted: false,
          type: "video",
          videoSrc: "/200993-914924518.mp4",
          textContent: {
            introduction: "BVT Warfare represents the comprehensive approach to naval combat operations, combining traditional naval tactics with modern technological capabilities to achieve strategic objectives.",
            objectives: [
              "Define BVT Warfare principles",
              "Understand naval combat tactics",
              "Learn strategic warfare concepts",
              "Master tactical decision-making"
            ],
            content: "BVT Warfare is a sophisticated approach to naval combat that emphasizes:\n\n**Strategic Planning**: Every operation begins with comprehensive planning that considers multiple scenarios and outcomes. This includes threat assessment, resource allocation, and contingency planning.\n\n**Tactical Execution**: Once plans are established, precise tactical execution becomes critical. This involves coordination between different naval units, real-time decision making, and adaptive responses to changing conditions.\n\n**Technology Integration**: Modern BVT Warfare leverages advanced technologies including radar systems, communication networks, and precision weapons to maintain tactical superiority.\n\n**Human Element**: Despite technological advances, the human element remains central to BVT Warfare. Leadership, teamwork, and decision-making under pressure are essential skills.\n\nThe video demonstrates these principles in action, showing how BVT Warfare tactics are applied in real-world scenarios.",
            keyPoints: [
              "Strategic planning is the foundation of BVT Warfare",
              "Tactical execution requires precision and coordination",
              "Technology enhances but doesn't replace human judgment",
              "Adaptability is key to mission success"
            ],
            conclusion: "BVT Warfare represents the evolution of naval combat, combining proven tactics with modern capabilities. Success requires mastery of both technical skills and strategic thinking."
          }
        },
        {
          id: 4,
          title: "BVT FAQs - Essential Knowledge",
          duration: "6:20",
          isCompleted: false,
          type: "video",
          videoSrc: "/200993-914924518.mp4"
        },
        {
          id: 5,
          title: "How to start your BVT Career",
          duration: "15:30",
          isCompleted: false,
          type: "video",
          videoSrc: "/200993-914924518.mp4"
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
          type: "video",
          videoSrc: "/200993-914924518.mp4"
        },
        {
          id: 7,
          title: "Strategic Planning",
          duration: "18:30",
          isCompleted: false,
          type: "video",
          videoSrc: "/200993-914924518.mp4"
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
          type: "video",
          videoSrc: "CevxZvSJLk8"
        },
        {
          id: 9,
          title: "Communication Protocols",
          duration: "14:20",
          isCompleted: false,
          type: "video",
          videoSrc: "kffacxfA7G4"
        },
        {
          id: 10,
          title: "Emergency Procedures",
          duration: "16:10",
          isCompleted: false,
          type: "video",
          videoSrc: "/200993-914924518.mp4"
        },
        {
          id: 11,
          title: "Team Coordination",
          duration: "19:35",
          isCompleted: false,
          type: "video",
          videoSrc: "/200993-914924518.mp4"
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
          videoSrc: "/200993-914924518.mp4"
        },
        {
          id: 13,
          title: "Leadership in Combat",
          duration: "20:45",
          isCompleted: false,
          type: "video",
          videoSrc: "/200993-914924518.mp4"
        },
        {
          id: 14,
          title: "Final Assessment",
          duration: "30:00",
          isCompleted: false,
          type: "quiz"
        }
      ]
    }
  ]
};

export default function CourseLearningPage({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState(["getting-started"]);
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [activeTab, setActiveTab] = useState("video"); // "video" or "text"

  // Unwrap params using React.use()
  const resolvedParams = use(params);
  
  // Debug params
  console.log("Course slug:", resolvedParams?.slug);

  const toggleModule = (moduleId) => {
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

  // Helper function to manage chapter transitions
  const handleChapterTransition = (newLessonId) => {
    const newLesson = allLessons.find(l => l.id === newLessonId);
    if (!newLesson) return;

    // Find which module contains the new lesson
    const newModule = COURSE_CONTENT.modules.find(module => 
      module.lessons.some(lesson => lesson.id === newLessonId)
    );

    // Find which module contains the current lesson
    const currentModule = COURSE_CONTENT.modules.find(module => 
      module.lessons.some(lesson => lesson.id === currentLessonId)
    );

    // If moving to a different module, collapse the old one and expand the new one
    if (currentModule && newModule && currentModule.id !== newModule.id) {
      setExpandedModules(prev => {
        const newExpanded = prev.filter(id => id !== currentModule.id);
        if (!newExpanded.includes(newModule.id)) {
          newExpanded.push(newModule.id);
        }
        return newExpanded;
      });
    }
    // If staying in the same module, just expand it if it's not already expanded
    else if (newModule && !expandedModules.includes(newModule.id)) {
      setExpandedModules(prev => [...prev, newModule.id]);
    }
  };

  // Navigation functions
  const goToNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      if (!nextLesson.isLocked) {
        handleChapterTransition(nextLesson.id);
        setCurrentLessonId(nextLesson.id);
      }
    }
  };

  const goToPreviousLesson = () => {
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      handleChapterTransition(prevLesson.id);
      setCurrentLessonId(prevLesson.id);
    }
  };

  const selectLesson = (lessonId) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    if (!lesson.isLocked) {
      handleChapterTransition(lessonId);
      setCurrentLessonId(lessonId);
    }
  };


  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0 lg:w-80`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
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
        <div className="flex-1 overflow-y-auto p-4 min-h-0 sidebar-scroll">
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

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 max-w-none lg:ml-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
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
            <div className="flex items-center gap-2">
              <Link 
                href={`/courses/${resolvedParams?.slug}/test`}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Award className="w-4 h-4" />
                Tests
              </Link>
              <button className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "video"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Video className="w-4 h-4" />
              Video
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "text"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              Text
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0" style={{ height: 'calc(100vh - 180px)' }}>
          {activeTab === "video" ? (
            <div className="w-full h-full bg-black">
              <VideoPlayer 
                key={currentLessonId} // Force remount when lesson changes
                videoSrc={currentLesson?.videoSrc}
                title={currentLesson?.title || "Course Video"}
                autoplay={false}
                onVideoEnd={() => {
                  // Mark lesson as completed when video ends
                  console.log("Video ended for lesson:", currentLesson?.id);
                }}
                onVideoStart={() => {
                  console.log("Video started for lesson:", currentLesson?.id);
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-white overflow-y-auto sidebar-scroll">
              <div className="p-8 max-w-4xl mx-auto">
                {currentLesson?.textContent ? (
                  <div className="space-y-8">
                    {/* Introduction */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                      <p className="text-gray-700 leading-relaxed">{currentLesson.textContent.introduction}</p>
                    </div>

                    {/* Learning Objectives */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Objectives</h2>
                      <ul className="space-y-2">
                        {currentLesson.textContent.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Main Content */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Content</h2>
                      <div className="prose prose-lg max-w-none">
                        {currentLesson.textContent.content.split('\n').map((paragraph, index) => (
                          paragraph.trim() && (
                            <div key={index} className="text-gray-700 leading-relaxed mb-4">
                              {paragraph.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                                }
                                return part;
                              })}
                            </div>
                          )
                        ))}
                      </div>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Points</h2>
                      <ul className="space-y-2">
                        {currentLesson.textContent.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Conclusion */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                      <p className="text-gray-700 leading-relaxed">{currentLesson.textContent.conclusion}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No text content available</p>
                      <p className="text-sm mt-2">This lesson doesn't have text content yet.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0 h-16">
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
