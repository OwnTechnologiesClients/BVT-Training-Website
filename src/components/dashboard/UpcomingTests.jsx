"use client";

import { useState, useEffect } from "react";
import { Clock, FileText, Loader2, Lock, CheckCircle, Award, Trophy } from "lucide-react";
import Link from "next/link";
import { getTestsByCourse, getCourseTestAttempts } from "@/lib/api/test";
import { getCourseStructure } from "@/lib/api/courses";

export default function UpcomingTests({ enrollments }) {
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        
        // Get all enrollments (including completed ones - they may have tests to take)
        const validEnrollments = enrollments.filter(e => 
          e.status === "active" || e.status === "pending" || e.status === "completed"
        );
        
        console.log('📚 Valid enrollments for tests:', validEnrollments.length, validEnrollments.map(e => ({
          course: e.courseId?.title,
          status: e.status,
          progress: e.progress,
          isOnline: e.courseId?.isOnline,
          isOnlineUndefined: e.courseId?.isOnline === undefined
        })));
        
        if (validEnrollments.length === 0) {
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

        // Fetch tests for each enrolled course (only online courses have tests)
        const testPromises = validEnrollments.map(async (enrollment) => {
      const course = enrollment.courseId;
          if (!course || !course._id) return [];

          // Skip offline courses - they don't have learning pages or tests
          // isOnline === false means offline, undefined or true means online
          const isOffline = course.isOnline === false;
          console.log(`🔍 Course "${course.title}": isOnline=${course.isOnline}, isOffline=${isOffline}`);
          
          if (isOffline) {
            console.log(`⏭️ Skipping offline course: ${course.title}`);
            return [];
          }

          try {
            // Calculate course progress for display purposes
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

            console.log(`📝 Tests found for ${course.title}:`, tests.length, tests.map(t => ({ title: t.title, isActive: t.isActive })));

            // Separate tests into upcoming and completed
            const upcoming = [];
            const completed = [];
            
            tests.forEach(test => {
                const testId = test._id.toString();
                const testAttempts = attemptsMap[testId] || [];
                const latestAttempt = testAttempts.length > 0
                  ? testAttempts.sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0))[0]
                  : null;

              const isActive = test.isActive !== false;
              const hasPassed = latestAttempt && latestAttempt.passed === true;
              const hasFailed = latestAttempt && latestAttempt.passed === false;
              const hasSubmitted = latestAttempt && latestAttempt.completedAt;
              const isPending = hasSubmitted && latestAttempt.passed === undefined; // Results not released yet
              const canRetake = !latestAttempt || 
                (latestAttempt.passed !== true && (test.maxAttempts === 0 || testAttempts.length < (test.maxAttempts || 999)));
              const hasAttemptsLeft = test.maxAttempts === 0 || testAttempts.length < (test.maxAttempts || 999);

              const testData = {
                id: testId,
                title: test.title || 'Course Test',
                description: test.description || '',
        courseTitle: course.title,
        courseSlug: course.slug,
                courseId: courseId,
        enrollmentId: enrollment._id,
                timeLimit: test.duration || 60,
                passingScore: test.passingScore || 70,
                maxAttempts: test.maxAttempts || 1,
                courseProgress: courseProgress,
                isUnlocked: courseProgress >= 100,
                showResults: test.showResults !== false,
              };

              // Check if test has been attempted
              if (hasSubmitted) {
                // Admin-controlled retake - only show retake if explicitly allowed
                const retakeAllowed = latestAttempt.retakeAllowed === true;
                
                // Add to completed tests (passed, failed, or pending results)
                completed.push({
                  ...testData,
                  passed: hasPassed,
                  failed: hasFailed,
                  pending: isPending,
                  score: latestAttempt.percentage || latestAttempt.score || 0,
                  completedAt: latestAttempt.completedAt || latestAttempt.submittedAt,
                  attempts: testAttempts.length,
                  // Only allow retake if admin has explicitly allowed it
                  canRetake: retakeAllowed,
                });
              } else if (isActive) {
                // Add to upcoming tests (not yet attempted)
                upcoming.push(testData);
              }
            });
            
            return { upcoming, completed };
          } catch (err) {
            console.error(`Error fetching tests for course ${course.title}:`, err);
            return [];
          }
        });

        const results = await Promise.all(testPromises);
        
        // Separate upcoming and completed tests
        const allUpcoming = [];
        const allCompleted = [];
        
        results.forEach(result => {
          if (result.upcoming) allUpcoming.push(...result.upcoming);
          if (result.completed) allCompleted.push(...result.completed);
        });
        
        // Sort upcoming by unlocked status first (ready tests first), then by course title
        const sortedUpcoming = allUpcoming.sort((a, b) => {
          if (a.isUnlocked && !b.isUnlocked) return -1;
          if (!a.isUnlocked && b.isUnlocked) return 1;
          if (!a.isUnlocked && !b.isUnlocked) {
            return b.courseProgress - a.courseProgress;
          }
          return a.courseTitle.localeCompare(b.courseTitle);
        });
        
        // Sort completed by most recent first
        const sortedCompleted = allCompleted.sort((a, b) => {
          return new Date(b.completedAt || 0) - new Date(a.completedAt || 0);
        });
        
        setUpcomingTests(sortedUpcoming);
        setCompletedTests(sortedCompleted);
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
          My Tests
        </h2>
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-600">Loading tests...</p>
        </div>
      </div>
    );
  }

  if (upcomingTests.length === 0 && completedTests.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          My Tests
        </h2>
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">No tests available at the moment</p>
          <p className="text-sm text-gray-500">Tests will appear here when you enroll in courses that have assessments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        My Tests
      </h2>
      
      {/* Upcoming Tests */}
      {upcomingTests.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Upcoming
          </h3>
          <div className="space-y-3">
        {upcomingTests.map((test, index) => (
          <div
                key={`upcoming-${index}`}
                className={`border rounded-lg p-4 transition-colors ${
                  test.isUnlocked 
                    ? 'border-gray-200 hover:bg-gray-50' 
                    : 'border-amber-200 bg-amber-50/50'
                }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                  {test.title || "Course Test"}
                </h3>
                      {test.isUnlocked ? (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Ready
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                          <Lock className="w-3 h-3" />
                          Complete course first
                        </span>
                      )}
                    </div>
                <p className="text-sm text-gray-600 mb-2">
                      {test.courseTitle}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                        <span>{test.timeLimit} min</span>
                      </div>
                      <span>Pass: {test.passingScore}%</span>
                      {!test.isUnlocked && (
                        <span className="text-amber-600">Progress: {test.courseProgress}%</span>
                      )}
                    </div>
                  </div>
                  {test.isUnlocked ? (
              <Link
                href={`/courses/${test.courseSlug}/test`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Take Test
              </Link>
                  ) : (
                    <Link
                      href={`/courses/${test.courseSlug}/learn`}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                    >
                      Continue Course
                    </Link>
                  )}
            </div>
          </div>
        ))}
      </div>
        </div>
      )}
      
      {/* Completed Tests */}
      {completedTests.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-blue-600" />
            Completed Tests
          </h3>
          <div className="space-y-3">
            {completedTests.map((test, index) => {
              // Determine styling based on status
              const getBorderColor = () => {
                if (test.passed) return 'border-green-200 bg-green-50/50';
                if (test.failed) return 'border-red-200 bg-red-50/50';
                if (test.pending) return 'border-blue-200 bg-blue-50/50';
                return 'border-gray-200 bg-gray-50/50';
              };
              
              const getStatusBadge = () => {
                if (test.passed) {
                  return (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                      <Award className="w-3 h-3" />
                      Passed
                    </span>
                  );
                }
                if (test.failed) {
                  return (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                      <FileText className="w-3 h-3" />
                      Failed
                    </span>
                  );
                }
                if (test.pending) {
                  return (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                      <Clock className="w-3 h-3" />
                      Pending Results
                    </span>
                  );
                }
                return (
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Submitted
                  </span>
                );
              };
              
              const getScoreColor = () => {
                if (test.passed) return 'text-green-600';
                if (test.failed) return 'text-red-600';
                return 'text-gray-600';
              };
              
              return (
                <div
                  key={`completed-${index}`}
                  className={`border rounded-lg p-4 ${getBorderColor()}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {test.title || "Course Test"}
                        </h3>
                        {getStatusBadge()}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {test.courseTitle}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {!test.pending && test.showResults && (
                          <span className={`font-medium ${getScoreColor()}`}>
                            Score: {typeof test.score === 'number' ? test.score.toFixed(1) : test.score}%
                          </span>
                        )}
                        <span>Attempts: {test.attempts}/{test.maxAttempts}</span>
                        {test.completedAt && (
                          <span>
                            {new Date(test.completedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {/* View Results button - only show if results are available */}
                      {test.showResults && !test.pending && (
                        <Link
                          href={`/courses/${test.courseSlug}/test/results?testId=${test.id}`}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            test.passed 
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          View Results
                        </Link>
                      )}
                      {/* Pending results message */}
                      {test.pending && (
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                          Awaiting Results
                        </span>
                      )}
                      {/* Retake button for failed tests with remaining attempts */}
                      {test.canRetake && (
                        <Link
                          href={`/courses/${test.courseSlug}/test/attempt?testId=${test.id}`}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors text-center"
                        >
                          Retake Test
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

