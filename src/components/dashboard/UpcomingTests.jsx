"use client";

import { useState, useEffect } from "react";
import { Clock, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { getTestsByCourse, getCourseTestAttempts } from "@/lib/api/test";
import { getCourseStructure } from "@/lib/api/courses";

export default function UpcomingTests({ enrollments }) {
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        
        // Get all active enrollments
        const activeEnrollments = enrollments.filter(e => 
          e.status === "active" || e.status === "pending"
        );
        
        if (activeEnrollments.length === 0) {
          setUpcomingTests([]);
          setLoading(false);
          return;
        }

        // Helper function to calculate course progress
        const calculateCourseProgress = (enrollment) => {
          if (!enrollment.lessonsCompleted || !Array.isArray(enrollment.lessonsCompleted)) {
            return 0;
          }
          
          const course = enrollment.courseId;
          if (!course) return 0;
          
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
          // Check if course has chapters with lessons
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
            return Math.round((completedCount / totalLessons) * 100);
          }
          
          // Fallback to backend progress
          return enrollment.progress || 0;
        };

        // Fetch tests for each enrolled course
        const testPromises = activeEnrollments.map(async (enrollment) => {
      const course = enrollment.courseId;
          if (!course || !course._id) return [];

          try {
            // Check if course is 100% complete
            let courseProgress = calculateCourseProgress(enrollment);
            
            // If course structure is not available, fetch it
            if (courseProgress === 0 && (!course.modules && !course.chapters)) {
              try {
                const courseId = course._id.toString();
                const structureResponse = await getCourseStructure(courseId);
                if (structureResponse.success && structureResponse.data) {
                  const structure = structureResponse.data.structure || structureResponse.data;
                  const chapters = structure.chapters || structure.modules || [];
                  
                  let totalLessons = 0;
                  if (chapters.length > 0) {
                    totalLessons = chapters.reduce((total, chapter) => {
                      if (chapter.lessons && Array.isArray(chapter.lessons)) {
                        return total + chapter.lessons.length;
                      }
                      return total;
                    }, 0);
                  }
                  
                  if (totalLessons > 0 && enrollment.lessonsCompleted) {
                    courseProgress = Math.round((enrollment.lessonsCompleted.length / totalLessons) * 100);
                  }
                }
              } catch (err) {
                console.error(`Error fetching structure for progress check:`, err);
              }
            }
            
            // Only show tests if course is 100% complete
            if (courseProgress < 100) {
              return [];
            }

            const courseId = course._id.toString();
            
            // Fetch tests and attempts in parallel
            const [testsResponse, attemptsResponse] = await Promise.all([
              getTestsByCourse(courseId, true).catch(() => ({ success: false, data: [] })),
              getCourseTestAttempts(courseId).catch(() => ({ success: false, data: [] }))
            ]);

            if (!testsResponse.success || !testsResponse.data) return [];

            const tests = testsResponse.data || [];
            const attempts = attemptsResponse.success && attemptsResponse.data 
              ? attemptsResponse.data 
              : [];

            // Create a map of test attempts by testId
            const attemptsMap = {};
            attempts.forEach(attempt => {
              const testId = (attempt.testId?._id || attempt.testId)?.toString();
              if (testId) {
                if (!attemptsMap[testId]) {
                  attemptsMap[testId] = [];
                }
                attemptsMap[testId].push(attempt);
              }
            });

            // Filter for upcoming tests (not completed or failed)
            return tests
              .filter(test => {
                const testId = test._id.toString();
                const testAttempts = attemptsMap[testId] || [];
                const latestAttempt = testAttempts.length > 0
                  ? testAttempts.sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0))[0]
                  : null;

                // Show test if:
                // 1. No attempts yet
                // 2. Latest attempt failed and retakes allowed
                // 3. Test is active
                if (!test.isActive) return false;
                if (!latestAttempt) return true;
                if (latestAttempt.passed === false && (test.maxAttempts === 0 || testAttempts.length < test.maxAttempts)) {
                  return true;
                }
                return false;
              })
              .map(test => ({
                id: test._id.toString(),
                title: test.title || 'Course Test',
                description: test.description || '',
        courseTitle: course.title,
        courseSlug: course.slug,
                courseId: courseId,
        enrollmentId: enrollment._id,
                timeLimit: test.duration || 60,
                passingScore: test.passingScore || 70,
              }));
          } catch (err) {
            console.error(`Error fetching tests for course ${course.title}:`, err);
            return [];
          }
        });

        const allTests = (await Promise.all(testPromises)).flat();
        
        // Sort by course title and limit to 3
        setUpcomingTests(allTests.slice(0, 3));
      } catch (err) {
        console.error('Error fetching upcoming tests:', err);
        setUpcomingTests([]);
      } finally {
        setLoading(false);
      }
    };

    if (enrollments.length > 0) {
      fetchTests();
    } else {
      setLoading(false);
    }
  }, [enrollments]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Upcoming Tests
        </h2>
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-600">Loading tests...</p>
        </div>
      </div>
    );
  }

  if (upcomingTests.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Upcoming Tests
        </h2>
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No upcoming tests at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Upcoming Tests
      </h2>
      <div className="space-y-4">
        {upcomingTests.map((test, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {test.title || "Course Test"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {test.description || `Test for ${test.courseTitle}`}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{test.timeLimit} minutes</span>
                  </div>
                  <span>Passing: {test.passingScore}%</span>
                </div>
              </div>
              <Link
                href={`/courses/${test.courseSlug}/test`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Take Test
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

