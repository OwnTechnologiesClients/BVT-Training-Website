"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Clock, 
  CheckCircle, 
  Lock, 
  Play, 
  FileText, 
  Award, 
  Loader2,
  Eye,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { getTestsByCourse, getCourseTestAttempts } from "@/lib/api/test";
import { getCourseBySlug, getCourseStructure } from "@/lib/api/courses";
import { getMyEnrollments } from "@/lib/api/enrollment";

export default function CourseTestPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  
  const [tests, setTests] = useState([]);
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseProgress, setCourseProgress] = useState(null);
  const [checkingProgress, setCheckingProgress] = useState(true);
  const [isOfflineCourse, setIsOfflineCourse] = useState(false);
  
  // Check course progress
  useEffect(() => {
    const checkProgress = async () => {
      try {
        setCheckingProgress(true);
        
        // Get course by slug
        const courseResponse = await getCourseBySlug(resolvedParams?.slug);
        if (!courseResponse.success || !courseResponse.data) {
          setCheckingProgress(false);
          return;
        }
        
        // Check if this is an offline course - offline courses don't have tests
        if (courseResponse.data.isOnline === false) {
          setIsOfflineCourse(true);
          setCheckingProgress(false);
          router.push(`/courses/${resolvedParams?.slug}`);
          return;
        }
        
        const courseId = courseResponse.data._id || courseResponse.data.id;
        
        // Get enrollments to find this course
        const enrollmentsResponse = await getMyEnrollments();
        if (enrollmentsResponse.success && enrollmentsResponse.data) {
          const enrollments = enrollmentsResponse.data.enrollments || [];
          const enrollment = enrollments.find(e => 
            (e.courseId?._id || e.courseId?.id)?.toString() === courseId.toString()
          );
          
          if (enrollment) {
            let totalLessons = 0;
            let completedLessons = enrollment.lessonsCompleted?.length || 0;
            
            if (!enrollment.courseId?.modules && !enrollment.courseId?.chapters) {
              try {
                const structureResponse = await getCourseStructure(courseId);
                if (structureResponse.success && structureResponse.data) {
                  const structure = structureResponse.data.structure || structureResponse.data;
                  const modules = structure.modules || structure.chapters || [];
                  
                  totalLessons = modules.reduce((total, module) => {
                    if (module.lessons && Array.isArray(module.lessons)) {
                      return total + module.lessons.length;
                    }
                    return total;
                  }, 0);
                }
              } catch (err) {
                console.error('Error fetching course structure:', err);
              }
            } else {
              const course = enrollment.courseId;
              if (course.modules && Array.isArray(course.modules)) {
                totalLessons = course.modules.reduce((total, module) => {
                  if (module.lessons && Array.isArray(module.lessons)) {
                    return total + module.lessons.length;
                  }
                  return total;
                }, 0);
              } else if (course.chapters && Array.isArray(course.chapters)) {
                totalLessons = course.chapters.reduce((total, chapter) => {
                  if (chapter.lessons && Array.isArray(chapter.lessons)) {
                    return total + chapter.lessons.length;
                  }
                  return total;
                }, 0);
              } else if (course.lessonCount) {
                totalLessons = Number(course.lessonCount);
              }
            }
            
            const progress = totalLessons > 0 
              ? Math.round((completedLessons / totalLessons) * 100)
              : (enrollment.progress || 0);
            
            setCourseProgress(progress);
          } else {
            setCourseProgress(0);
          }
        } else {
          setCourseProgress(0);
        }
      } catch (err) {
        console.error('Error checking course progress:', err);
        setCourseProgress(0);
      } finally {
        setCheckingProgress(false);
      }
    };
    
    if (resolvedParams?.slug) {
      checkProgress();
    }
  }, [resolvedParams?.slug, router]);
  
  // Fetch course and tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const courseResponse = await getCourseBySlug(resolvedParams?.slug);
        if (!courseResponse.success || !courseResponse.data) {
          throw new Error('Course not found');
        }
        
        const courseId = courseResponse.data._id || courseResponse.data.id;
        
        const [testsResponse, attemptsResponse] = await Promise.all([
          getTestsByCourse(courseId, true),
          getCourseTestAttempts(courseId).catch(() => ({ success: true, data: [] }))
        ]);
        
        if (testsResponse.success && testsResponse.data) {
          // Build attempts map
          const attemptsMap = {};
          if (attemptsResponse.success && attemptsResponse.data) {
            attemptsResponse.data.forEach(attempt => {
              const testId = attempt.testId?.toString();
              if (testId) {
                if (!attemptsMap[testId]) {
                  attemptsMap[testId] = [];
                }
                attemptsMap[testId].push(attempt);
              }
            });
          }
          
          // Transform tests
          const transformedTests = testsResponse.data.map(test => {
            const testId = test._id.toString();
            return {
              id: testId,
              _id: test._id,
              title: test.title,
              description: test.description || '',
              questionCount: test.questions?.length || 0,
              timeLimit: test.duration || 60,
              passingScore: test.passingScore || 70,
              maxAttempts: test.maxAttempts || 1,
              isAvailable: test.isActive !== false,
              showResults: test.showResults !== false
            };
          });
          
          setTests(transformedTests);
          
          // Set test results from saved attempts
          const savedResults = {};
          Object.keys(attemptsMap).forEach(testId => {
            const attempts = attemptsMap[testId];
            const latestAttempt = attempts.sort((a, b) => 
              new Date(b.completedAt) - new Date(a.completedAt)
            )[0];
            const test = transformedTests.find(t => t.id === testId);
            
            if (latestAttempt) {
              const showResults = test?.showResults !== false;
              
              savedResults[testId] = {
                submitted: true,
                attempts: attempts.length,
                submittedAt: latestAttempt.completedAt,
                showResults: showResults,
                // Admin-controlled retake permission
                retakeAllowed: latestAttempt.retakeAllowed === true,
                ...(showResults && latestAttempt.score !== undefined ? {
                  score: latestAttempt.score,
                  percentage: latestAttempt.score,
                  passingScore: test?.passingScore || 70,
                  passed: latestAttempt.passed
                } : {})
              };
            }
          });
          
          if (Object.keys(savedResults).length > 0) {
            setTestResults(savedResults);
          }
        } else {
          setTests([]);
        }
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError(err.message || 'Failed to load tests');
        setTests([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (resolvedParams?.slug) {
      fetchTests();
    }
  }, [resolvedParams?.slug]);

  const getTestStatus = (test) => {
    if (checkingProgress) {
      return { status: "locked", message: "Checking course progress..." };
    }
    
    if (courseProgress === null || courseProgress < 100) {
      return {
        status: "locked",
        message: `Complete all lessons (${courseProgress || 0}% complete) to unlock`
      };
    }
    
    if (!test.isAvailable) {
      return { status: "locked", message: "Test not available" };
    }
    
    const result = testResults[test.id];
    const attempts = result?.attempts || 0;
    const submitted = result?.submitted || false;
    
    if (submitted) {
      if (result?.showResults && result?.passed !== undefined) {
        return {
          status: result.passed ? "passed" : "failed",
          message: result.passed 
            ? `Passed (${result.percentage?.toFixed(1)}%)` 
            : `Failed (${result.percentage?.toFixed(1)}%)`
        };
      }
      return { status: "submitted", message: "Results will be announced later" };
    }
    
    if (attempts >= test.maxAttempts) {
      return { status: "exhausted", message: `No more attempts (${attempts}/${test.maxAttempts})` };
    }
    
    return {
      status: "available",
      message: attempts > 0 ? `Available (${attempts}/${test.maxAttempts} attempts)` : "Available"
    };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "locked": return <Lock className="w-5 h-5 text-gray-400" />;
      case "submitted": return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case "passed": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed": return <Award className="w-5 h-5 text-red-500" />;
      case "exhausted": return <Lock className="w-5 h-5 text-red-400" />;
      default: return <Play className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "locked": return "bg-gray-50 border-gray-200";
      case "submitted": return "bg-blue-50 border-blue-200";
      case "passed": return "bg-green-50 border-green-200";
      case "failed": return "bg-red-50 border-red-200";
      case "exhausted": return "bg-gray-50 border-gray-300";
      default: return "bg-white border-gray-200 hover:border-blue-300";
    }
  };

  // Loading while redirecting offline courses
  if (isOfflineCourse) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">This is an offline course. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14">
            <Link 
              href={`/courses/${resolvedParams?.slug}/learn`} 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mr-6"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Course</span>
              </Link>
            <div className="h-6 w-px bg-gray-200 mr-6" />
            <h1 className="text-lg font-semibold text-gray-900">Course Tests</h1>
          </div>
        </div>
      </div>

      {/* Test List */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Available Tests</h2>
          <p className="text-gray-600">Complete tests to assess your knowledge and earn certificates.</p>
        </div>

        {(loading || checkingProgress) ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">
              {checkingProgress ? 'Checking course progress...' : 'Loading tests...'}
            </span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : tests.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No tests available for this course yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tests.map((test, index) => {
            const testStatus = getTestStatus(test);
              const result = testResults[test.id];
              
            return (
                <div 
                  key={test.id} 
                  className={`border rounded-xl p-6 transition-all ${getStatusColor(testStatus.status)}`}
                >
                  <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(testStatus.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          Test {index + 1}
                        </span>
                    </div>
                      
                      {test.description && (
                    <p className="text-gray-600 mb-4">{test.description}</p>
                      )}
                    
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{test.questionCount} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{test.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{test.passingScore}% to pass</span>
                      </div>
                    </div>
                  </div>
                  
                    <div className="flex flex-col items-end gap-2 min-w-[140px]">
                      <div className={`text-sm font-medium ${
                        testStatus.status === 'passed' ? 'text-green-600' :
                        testStatus.status === 'failed' ? 'text-red-600' :
                        testStatus.status === 'submitted' ? 'text-blue-600' :
                        'text-gray-600'
                      }`}>
                      {testStatus.message}
                    </div>
                      
                      {/* Action Buttons */}
                    {testStatus.status === "available" && (
                        <Link
                          href={`/courses/${resolvedParams?.slug}/test/attempt?testId=${test.id}`}
                          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                      >
                        Take Test
                        </Link>
                    )}
                      
                      {(testStatus.status === "passed" || testStatus.status === "failed") && result?.showResults && (
                        <Link
                          href={`/courses/${resolvedParams?.slug}/test/results?testId=${test.id}`}
                          className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors ${
                            testStatus.status === "passed"
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            View Results
                          </span>
                        </Link>
                      )}
                      
                      {testStatus.status === "submitted" && (
                        <span className="px-5 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium text-sm">
                          Pending Results
                        </span>
                    )}
                      
                    {testStatus.status === "locked" && (
                        <span className="px-5 py-2 bg-gray-200 text-gray-500 rounded-lg font-medium text-sm cursor-not-allowed">
                        Locked
                        </span>
                    )}
                      
                      {testStatus.status === "exhausted" && (
                        <span className="px-5 py-2 bg-gray-200 text-gray-500 rounded-lg font-medium text-sm cursor-not-allowed">
                          No Attempts Left
                        </span>
                      )}
                      
                      {/* Retake button - only show if admin has allowed retake */}
                      {result?.retakeAllowed && (
                        <Link
                          href={`/courses/${resolvedParams?.slug}/test/attempt?testId=${test.id}`}
                          className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm flex items-center gap-1"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Retake
                        </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}
          
          {/* Test Progress Summary */}
        {tests.length > 0 && !loading && !checkingProgress && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Progress Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {Object.values(testResults).filter(r => r.submitted).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Tests Completed</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {Object.values(testResults).filter(r => r.submitted && r.passed).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Tests Passed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-600">{tests.length}</div>
                <div className="text-sm text-gray-600 mt-1">Total Tests</div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
