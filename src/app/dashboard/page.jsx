"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyEnrollments } from "@/lib/api/enrollment";
import { getCourseStructure } from "@/lib/api/courses";
import { useRouter } from "next/navigation";
import DashboardStats from "@/components/dashboard/DashboardStats";
import MyCourses from "@/components/dashboard/MyCourses";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingTests from "@/components/dashboard/UpcomingTests";
import { useQuery } from "@/context/QueryContext";
import { StudentQueryModal } from "@/components/queries";
import { MessageCircle, Clock, BookOpen, Eye } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { student, isAuthenticated, loading: authLoading } = useAuth();
  const { studentQueries } = useQuery();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAuthenticated && student?.id) {
      fetchEnrollments();
    }
  }, [isAuthenticated, authLoading, student]);

  // Refresh enrollments when window gains focus (user might have completed lessons in another tab)
  useEffect(() => {
    const handleFocus = () => {
      if (isAuthenticated && student?.id) {
        fetchEnrollments();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isAuthenticated, student]);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use student-specific endpoint
      const response = await getMyEnrollments();
      
      if (response.success && response.data) {
        let enrollments = response.data.enrollments || [];
        
        // Fetch course structure for enrollments that don't have it populated
        const enrichedEnrollments = await Promise.all(
          enrollments.map(async (enrollment) => {
            // If course structure is not populated, fetch it
            if (enrollment.courseId && (!enrollment.courseId.modules && !enrollment.courseId.chapters)) {
              try {
                const courseId = typeof enrollment.courseId === 'object' 
                  ? (enrollment.courseId._id || enrollment.courseId.id)
                  : enrollment.courseId;
                
                if (courseId) {
                  const structureResponse = await getCourseStructure(courseId);
                  if (structureResponse.success && structureResponse.data) {
                    const responseData = structureResponse.data;
                    // Handle both response structures: data.structure.chapters or data.chapters
                    const structure = responseData.structure || responseData;
                    
                    // Log structure for debugging
                    console.log(`📚 Course structure for ${enrollment.courseId?.title}:`, {
                      hasModules: !!structure.modules,
                      hasChapters: !!structure.chapters,
                      modulesCount: structure.modules?.length || 0,
                      chaptersCount: structure.chapters?.length || 0,
                      structureKeys: Object.keys(structure),
                      firstChapter: structure.chapters?.[0] ? {
                        hasLessons: !!structure.chapters[0].lessons,
                        lessonsCount: structure.chapters[0].lessons?.length || 0
                      } : null
                    });
                    
                    // Get modules/chapters from structure (chapters are used as modules)
                    const chapters = structure.chapters || structure.modules || [];
                    const modules = structure.modules || structure.chapters || [];
                    
                    // Calculate total lessons from chapters (which contain lessons)
                    let totalLessons = 0;
                    if (chapters.length > 0) {
                      totalLessons = chapters.reduce((total, chapter) => {
                        if (chapter.lessons && Array.isArray(chapter.lessons)) {
                          return total + chapter.lessons.length;
                        }
                        return total;
                      }, 0);
                    } else if (modules.length > 0) {
                      totalLessons = modules.reduce((total, module) => {
                        if (module.lessons && Array.isArray(module.lessons)) {
                          return total + module.lessons.length;
                        }
                        return total;
                      }, 0);
                    }
                    
                    console.log(`📚 Total lessons calculated: ${totalLessons} for ${enrollment.courseId?.title}`);
                    
                    return {
                      ...enrollment,
                      courseId: {
                        ...enrollment.courseId,
                        modules: modules,
                        chapters: chapters,
                        lessonCount: totalLessons || structure.lessonCount || 0
                      }
                    };
                  }
                }
              } catch (err) {
                console.error(`Error fetching structure for course ${enrollment.courseId?._id}:`, err);
              }
            }
            return enrollment;
          })
        );
        
        // Log detailed enrollment data for debugging
        enrichedEnrollments.forEach((e, idx) => {
          const course = e.courseId;
          
          // Calculate total lessons from different structures
          let totalLessons = 0;
          if (course?.modules && Array.isArray(course.modules)) {
            totalLessons = course.modules.reduce((total, module) => {
              if (module.lessons && Array.isArray(module.lessons)) {
                return total + module.lessons.length;
              }
              return total;
            }, 0);
          } else if (course?.chapters && Array.isArray(course.chapters)) {
            totalLessons = course.chapters.reduce((total, chapter) => {
              if (chapter.lessons && Array.isArray(chapter.lessons)) {
                return total + chapter.lessons.length;
              }
              return total;
            }, 0);
          } else if (course?.lessonCount) {
            totalLessons = Number(course.lessonCount);
          }
          
          const calculatedProgress = totalLessons > 0 && e.lessonsCompleted?.length 
            ? Math.round((e.lessonsCompleted.length / totalLessons) * 100)
            : 0;
          
          console.log(`📊 Enrollment ${idx + 1}:`, {
            course: course?.title,
            backendProgress: e.progress,
            lessonsCompletedCount: e.lessonsCompleted?.length || 0,
            totalLessons,
            hasModules: !!course?.modules,
            hasChapters: !!course?.chapters,
            modulesCount: course?.modules?.length || 0,
            chaptersCount: course?.chapters?.length || 0,
            modulesStructure: course?.modules?.[0] ? {
              hasLessons: !!course.modules[0].lessons,
              lessonsCount: course.modules[0].lessons?.length || 0
            } : null,
            calculatedProgress
          });
        });
        
        setEnrollments(enrichedEnrollments);
      } else {
        setError("Failed to load your courses");
      }
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      // Don't set error if it's just "no enrollments" - show empty state instead
      if (err.message && err.message.includes('not found')) {
        setEnrollments([]);
      } else {
        setError(err.message || "Failed to load your courses. Please try refreshing the page.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Helper function to calculate progress for an enrollment
  const calculateProgress = (enrollment) => {
    // Always calculate from lessonsCompleted if available (most accurate)
    if (enrollment.lessonsCompleted && Array.isArray(enrollment.lessonsCompleted) && enrollment.courseId) {
      const course = enrollment.courseId;
      let totalLessons = 0;
      
      // Check if course has modules with lessons
      if (course.modules && Array.isArray(course.modules)) {
        totalLessons = course.modules.reduce((total, module) => {
          if (module.lessons && Array.isArray(module.lessons)) {
            return total + module.lessons.length;
          }
          return total;
        }, 0);
      }
      // Check if course has chapters with lessons (alternative structure)
      else if (course.chapters && Array.isArray(course.chapters)) {
        totalLessons = course.chapters.reduce((total, chapter) => {
          if (chapter.lessons && Array.isArray(chapter.lessons)) {
            return total + chapter.lessons.length;
          }
          return total;
        }, 0);
      }
      // Check if course has lessonCount field
      else if (course.lessonCount) {
        totalLessons = Number(course.lessonCount);
      }
      
      if (totalLessons > 0) {
        const completedCount = enrollment.lessonsCompleted.length;
        const calculated = Math.round((completedCount / totalLessons) * 100);
        console.log(`📈 Progress calculation for ${course.title || 'course'}: ${completedCount}/${totalLessons} = ${calculated}%`);
        return calculated;
      }
    }
    
    // Fallback to backend progress if available
    if (enrollment.progress !== undefined && enrollment.progress !== null) {
      const backendProgress = Number(enrollment.progress);
      if (!isNaN(backendProgress) && backendProgress >= 0) {
        return Math.min(100, Math.max(0, backendProgress));
      }
    }
    
    // Fallback to 0
    return 0;
  };

  // Calculate statistics with proper progress calculation
  const stats = {
    totalCourses: enrollments.length,
    activeCourses: enrollments.filter(e => e.status === 'active' || e.status === 'pending').length,
    completedCourses: enrollments.filter(e => e.status === 'completed').length,
    averageProgress: enrollments.length > 0
      ? Math.round(enrollments.reduce((sum, e) => sum + calculateProgress(e), 0) / enrollments.length)
      : 0,
  };

  // Get last accessed course - show most recently accessed, prioritizing active courses
  const lastAccessedCourse = enrollments
    .filter(e => e.status === 'active' || e.status === 'pending' || (e.status === 'completed' && e.lastAccessedAt))
    .sort((a, b) => {
      const dateA = a.lastAccessedAt ? new Date(a.lastAccessedAt) : new Date(a.enrolledAt || 0);
      const dateB = b.lastAccessedAt ? new Date(b.lastAccessedAt) : new Date(b.enrolledAt || 0);
      // Prioritize active courses
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (b.status === 'active' && a.status !== 'active') return 1;
      return dateB - dateA;
    })[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {student?.firstName && student?.lastName 
              ? `${student.firstName} ${student.lastName}` 
              : student?.name || student?.email || 'Student'}!
          </h1>
          <p className="text-blue-200">
            Continue your learning journey and track your progress
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Statistics */}
        <DashboardStats stats={stats} />

        {/* Continue Learning */}
        {lastAccessedCourse && (
          <div className="mt-8">
            <ContinueLearning enrollment={{
              ...lastAccessedCourse,
              calculatedProgress: calculateProgress(lastAccessedCourse)
            }} />
          </div>
        )}

        {/* My Courses */}
        <div className="mt-8">
          <MyCourses 
            enrollments={enrollments.map(e => ({
              ...e,
              calculatedProgress: calculateProgress(e)
            }))} 
            loading={loading}
            onRefresh={fetchEnrollments}
          />
        </div>

        {/* Upcoming Tests */}
        <div className="mt-8">
          <UpcomingTests enrollments={enrollments} />
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <RecentActivity enrollments={enrollments} />
        </div>

        {/* Queries Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  My Queries
                </h2>
                <p className="text-gray-600 text-sm">
                  View all your course-related queries and responses from instructors
                </p>
              </div>
            </div>

            {/* Queries List */}
            {studentQueries.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No queries yet
                </h3>
                <p className="text-gray-600">
                  Start asking questions from your course learning pages to see them here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {studentQueries
                  .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
                  .slice(0, 5)
                  .map((query) => {
                    const lastMessage = query.messages[query.messages.length - 1];
                    const hasNewReply =
                      lastMessage.sender === "instructor" && query.status === "open";

                    return (
                      <div
                        key={query.id}
                        className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                          hasNewReply ? "border-blue-200 bg-blue-50/30" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {query.subject}
                              </h3>
                              {hasNewReply && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                  New Reply
                                </span>
                              )}
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  query.status === "resolved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {query.status === "resolved" ? "Resolved" : "Open"}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                <span>{query.courseTitle}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {new Date(query.lastUpdated).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4 line-clamp-2">
                              {query.messages[0].content}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">
                                {query.messages.length} message
                                {query.messages.length !== 1 ? "s" : ""}
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedQueryId(query.id);
                                  setIsQueryModalOpen(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                              >
                                <Eye className="w-4 h-4" />
                                View Conversation
                              </button>
                            </div>
        </div>
      </div>
                      </div>
                    );
                  })}
                {studentQueries.length > 5 && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => router.push("/notifications")}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View All Queries ({studentQueries.length})
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Query Modal */}
      {isQueryModalOpen && selectedQueryId && (
        <StudentQueryModal
          isOpen={isQueryModalOpen}
          onClose={() => {
            setIsQueryModalOpen(false);
            setSelectedQueryId(null);
          }}
          existingQueryId={selectedQueryId}
        />
      )}
    </div>
  );
}

