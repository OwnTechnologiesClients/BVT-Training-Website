"use client";

import { useState, use, useEffect, useRef } from "react";
import { ChevronLeft, Clock, CheckCircle, Lock, Play, FileText, Award, BarChart3, Loader2, X } from "lucide-react";
import Link from "next/link";
import { getTestsByCourse, submitTest as submitTestAPI, getCourseTestAttempts } from "@/lib/api/test";
import { getCourseBySlug, getCourseStructure } from "@/lib/api/courses";
import { getMyEnrollments } from "@/lib/api/enrollment";

export default function CourseTestPage({ params }) {
  const [activeTest, setActiveTest] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [courseProgress, setCourseProgress] = useState(null);
  const [checkingProgress, setCheckingProgress] = useState(true);
  const timerIntervalRef = useRef(null);
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  
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
        
        const courseId = courseResponse.data._id || courseResponse.data.id;
        
        // Get enrollments to find this course
        const enrollmentsResponse = await getMyEnrollments();
        if (enrollmentsResponse.success && enrollmentsResponse.data) {
          const enrollments = enrollmentsResponse.data.enrollments || [];
          const enrollment = enrollments.find(e => 
            (e.courseId?._id || e.courseId?.id)?.toString() === courseId.toString()
          );
          
          if (enrollment) {
            // Calculate progress
            let totalLessons = 0;
            let completedLessons = enrollment.lessonsCompleted?.length || 0;
            
            // Try to get course structure if not in enrollment
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
              // Use enrollment course data
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
  }, [resolvedParams?.slug]);
  
  // Fetch course and tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, get course by slug to get courseId
        const courseResponse = await getCourseBySlug(resolvedParams?.slug);
        if (!courseResponse.success || !courseResponse.data) {
          throw new Error('Course not found');
        }
        
        const courseId = courseResponse.data._id || courseResponse.data.id;
        
        // Fetch tests and test attempts in parallel
        const [testsResponse, attemptsResponse] = await Promise.all([
          getTestsByCourse(courseId, true),
          getCourseTestAttempts(courseId).catch(() => ({ success: true, data: [] })) // Don't fail if attempts fail
        ]);
        
        if (testsResponse.success && testsResponse.data) {
          // Get attempts map for quick lookup
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
          
          // Transform API response to match expected format
          const transformedTests = testsResponse.data.map(test => {
            const testId = test._id.toString();
            const attempts = attemptsMap[testId] || [];
            const latestAttempt = attempts.length > 0 
              ? attempts.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0]
              : null;
            
            return {
              id: testId, // Use string ID for consistency
              _id: test._id, // Keep original for reference
              title: test.title,
              description: test.description || '',
              questionCount: test.questions?.length || 0,
              timeLimit: test.duration || 60, // duration is in minutes
              passingScore: test.passingScore || 70,
              maxAttempts: test.maxAttempts || 1,
              isAvailable: test.isActive !== false,
              questionList: test.questions?.map((q, index) => ({
                id: q._id?.toString() || (index + 1).toString(),
                _id: q._id,
                type: q.type || 'multiple-choice',
                question: q.question,
                options: q.options || [],
                correctAnswer: q.correctAnswer,
                points: q.points || 1,
                image: q.image || null,
                explanation: q.explanation || ''
              })) || [],
              showResults: test.showResults !== false
            };
          });
          
          setTests(transformedTests);
          
          // Set test results from saved attempts
          const savedResults = {};
          Object.keys(attemptsMap).forEach(testId => {
            const attempts = attemptsMap[testId];
            const latestAttempt = attempts.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];
            const test = transformedTests.find(t => t.id === testId);
            
            if (latestAttempt) {
              const showResults = test?.showResults !== false;
              
              savedResults[testId] = {
                submitted: true,
                attempts: attempts.length,
                submittedAt: latestAttempt.completedAt,
                showResults: showResults,
                // Only include score/pass status if showResults is enabled
                ...(showResults && latestAttempt.score !== undefined ? {
                  score: latestAttempt.score,
                  totalPoints: 100, // We'll get this from the test if needed
                  percentage: latestAttempt.score,
                  passingScore: test?.passingScore || 70,
                  passed: latestAttempt.passed,
                  results: latestAttempt.results || []
                } : {
                  results: [] // No results if showResults is disabled
                })
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
  
  console.log("Course slug:", resolvedParams?.slug);

  const startTest = (testId) => {
    const test = tests.find(t => t.id === testId);
    if (test && test.questionList.length > 0) {
      setActiveTest(testId);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setTimeRemaining(test.timeLimit * 60); // Convert minutes to seconds
      setTestStarted(false);
    } else {
      setActiveTest(testId);
      setTestStarted(false);
    }
  };

  const beginTest = () => {
    setTestStarted(true);
    setShowResults(false);
    // Clear any existing timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    // Start timer
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    const test = tests.find(t => t.id === activeTest);
    if (test && currentQuestionIndex < test.questionList.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = async () => {
    const test = tests.find(t => t.id === activeTest);
    if (!test) return;
    
    // Clear timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    try {
      setSubmitting(true);
      
      // Format answers for API: array of { questionId, answer }
      // Use _id if available, otherwise use id
      const answersArray = Object.entries(answers).map(([questionId, answer]) => {
        const question = test.questionList.find(q => q.id === questionId || q._id === questionId);
        return {
          questionId: question?._id || question?.id || questionId,
          answer: answer
        };
      });
      
      // Call API to submit test
      const response = await submitTestAPI(activeTest, answersArray);
      
      if (response.success && response.data) {
        const result = response.data;
        
        // Store results - only include pass/fail if showResults is enabled
        setTestResults(prev => ({
          ...prev,
          [activeTest]: {
            submitted: true,
            attempts: result.attemptNumber || ((prev[activeTest]?.attempts || 0) + 1),
            answers: { ...answers },
            submittedAt: result.submittedAt || new Date().toISOString(),
            score: result.score,
            totalPoints: result.totalPoints,
            percentage: result.percentage,
            passingScore: result.passingScore,
            passed: result.passed, // Will be undefined if showResults is false
            results: result.results || [],
            showResults: test.showResults
          }
        }));
        
        // Show results if enabled
        if (test.showResults && result.results) {
          setShowResults(true);
          setTestStarted(false);
        } else {
          // Show success message if results are not available
          setActiveTest(null);
          setTestStarted(false);
        }
      } else {
        throw new Error(response.message || 'Failed to submit test');
      }
    } catch (err) {
      console.error('Error submitting test:', err);
      setError(err.message || 'Failed to submit test. Please try again.');
      // Still mark as submitted locally to prevent resubmission
      setTestResults(prev => ({
        ...prev,
        [activeTest]: {
          submitted: true,
          attempts: (prev[activeTest]?.attempts || 0) + 1,
          answers: { ...answers },
          submittedAt: new Date().toISOString()
        }
      }));
      setActiveTest(null);
      setTestStarted(false);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const getTestStatus = (test) => {
    // Check if course is 100% complete
    if (checkingProgress) {
      return {
        status: "locked",
        message: "Checking course progress..."
      };
    }
    
    if (courseProgress === null || courseProgress < 100) {
      return {
        status: "locked",
        message: `Complete all lessons (${courseProgress || 0}% complete) to unlock this test`
      };
    }
    
    if (!test.isAvailable) {
      return {
        status: "locked",
        message: "Complete prerequisites to unlock this test"
      };
    }
    
    const attempts = testResults[test.id]?.attempts || 0;
    const submitted = testResults[test.id]?.submitted || false;
    
    if (submitted) {
      const result = testResults[test.id];
      // Only show pass/fail status if showResults is enabled and result is available
      if (result?.showResults && result?.passed !== undefined) {
        return {
          status: result.passed ? "passed" : "failed",
          message: result.passed 
            ? `Passed (${result.percentage?.toFixed(1)}%)` 
            : `Failed (${result.percentage?.toFixed(1)}%)`
        };
      }
      return {
        status: "submitted",
        message: "Test submitted - Results will be announced later"
      };
    }
    
    if (attempts >= test.maxAttempts) {
      return {
        status: "failed",
        message: `No more attempts (${attempts}/${test.maxAttempts})`
      };
    }
    
    return {
      status: "available",
      message: attempts > 0 ? `Available (${attempts}/${test.maxAttempts} attempts)` : "Available"
    };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "locked":
        return <Lock className="w-5 h-5 text-gray-400" />;
      case "submitted":
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case "passed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <Award className="w-5 h-5 text-red-500" />;
      default:
        return <Play className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "locked":
        return "bg-gray-100 border-gray-200";
      case "submitted":
        return "bg-blue-50 border-blue-200";
      case "passed":
        return "bg-green-50 border-green-200";
      case "failed":
        return "bg-red-50 border-red-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  if (activeTest) {
    const test = tests.find(t => t.id === activeTest);
    if (!test) {
      // Test not found, go back to test list
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto p-6">
            <button 
              onClick={() => setActiveTest(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Tests</span>
            </button>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600">Test not found</p>
            </div>
          </div>
        </div>
      );
    }
    
    // Show results if available and test was submitted and results are enabled
    if (showResults && activeTest && testResults[activeTest]?.submitted) {
      const result = testResults[activeTest];
      const test = tests.find(t => t.id === activeTest);
      
      // Check if results should be shown
      if (!result?.showResults || result?.passed === undefined) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <p className="text-blue-600 font-medium">Results Not Available</p>
                <p className="text-sm text-gray-600 mt-2">
                  Test results will be announced later. Please check back soon.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowResults(false);
                  setActiveTest(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Back to Tests
              </button>
            </div>
          </div>
        );
      }
      
      if (!test) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600">Test not found</p>
              <button
                onClick={() => {
                  setShowResults(false);
                  setActiveTest(null);
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Back to Tests
              </button>
            </div>
          </div>
        );
      }
      
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => {
                    setShowResults(false);
                    setActiveTest(null);
                  }}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Tests</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900">{test.title} - Results</h1>
              </div>
              
              {/* Results Summary */}
              <div className={`rounded-lg p-6 mb-6 ${
                result.passed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    result.passed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.percentage?.toFixed(1)}%
                  </div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    {result.passed ? 'Passed' : 'Failed'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Score: {result.score} / {result.totalPoints} points
                  </div>
                  <div className="text-sm text-gray-600">
                    Passing Score: {result.passingScore}%
                  </div>
                </div>
              </div>
              
              {/* Detailed Results */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Question Review</h2>
                {result.results && result.results.length > 0 ? (
                  result.results.map((qResult, index) => {
                    const question = test.questionList.find(q => 
                      (q._id && q._id.toString() === qResult.questionId?.toString()) || 
                      (q.id && q.id.toString() === qResult.questionId?.toString())
                    );
                    
                    // Format answer display
                    const formatAnswer = (answer, isOptions = false) => {
                      if (answer === null || answer === undefined) return 'Not answered';
                      if (typeof answer === 'boolean') return answer ? 'True' : 'False';
                      if (isOptions && question?.options && question.options[answer] !== undefined) {
                        return question.options[answer];
                      }
                      return String(answer);
                    };
                    
                    // Handle different result formats (isCorrect vs correct, userAnswer vs answer)
                    const isCorrect = qResult.isCorrect !== undefined ? qResult.isCorrect : (qResult.correct !== undefined ? qResult.correct : false);
                    const userAnswer = qResult.userAnswer !== undefined ? qResult.userAnswer : qResult.answer;
                    const correctAnswer = qResult.correctAnswer !== undefined ? qResult.correctAnswer : (question?.correctAnswer);
                    
                    return (
                      <div key={index} className={`border rounded-lg p-4 ${
                        isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-gray-900">Question {index + 1}</span>
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <X className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                            <p className="text-gray-700 mb-3 font-medium">{qResult.question || question?.question || 'Question'}</p>
                            
                            {/* Show question image if available */}
                            {question?.image && (
                              <div className="mb-3">
                                <img 
                                  src={question.image} 
                                  alt="Question illustration" 
                                  className="max-w-full h-auto rounded-lg border border-gray-200"
                                />
                              </div>
                            )}
                            
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">Your Answer: </span>
                                <span className={isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                                  {formatAnswer(userAnswer, question?.type === 'multiple-choice')}
                                </span>
                              </div>
                              {!isCorrect && correctAnswer !== undefined && (
                                <div>
                                  <span className="font-medium text-gray-600">Correct Answer: </span>
                                  <span className="text-green-700 font-semibold">
                                    {formatAnswer(correctAnswer, question?.type === 'multiple-choice')}
                                  </span>
                                </div>
                              )}
                              <div>
                                <span className="font-medium text-gray-600">Points Earned: </span>
                                <span>{qResult.points || 0} / {question?.points || 1}</span>
                              </div>
                              {question?.explanation && (
                                <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                                  <span className="font-medium text-blue-900">Explanation: </span>
                                  <span className="text-blue-700">{question.explanation}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No detailed results available.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setActiveTest(null);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Back to Tests
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (!testStarted) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setActiveTest(null)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Tests</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
              </div>
              
              <div className="text-center py-8">
                <FileText className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ready to Start?</h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span className="font-medium">{test.questionCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Limit:</span>
                      <span className="font-medium">{test.timeLimit} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passing Score:</span>
                      <span className="font-medium">{test.passingScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attempts:</span>
                      <span className="font-medium">{testResults[activeTest]?.attempts || 0}/{test.maxAttempts}</span>
                    </div>
                  </div>
                </div>
                
                {test.questionList.length > 0 ? (
                  <button
                    onClick={beginTest}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
                  >
                    Start Test
                  </button>
                ) : (
                  <div className="text-gray-500">
                    <p className="mb-4">This test doesn't have questions yet.</p>
                    <button
                      onClick={() => setActiveTest(null)}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Back to Tests
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = test.questionList[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / test.questionList.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">{test.title}</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {test.questionList.length}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {currentQuestion.question}
              </h2>
              
              {/* Question Image */}
              {currentQuestion.image && (
                <div className="mb-6">
                  <img 
                    src={currentQuestion.image} 
                    alt="Question illustration" 
                    className="max-w-full h-auto rounded-lg border border-gray-200"
                  />
                </div>
              )}
              
              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.type === "multiple-choice" && (
                  currentQuestion.options.map((option, index) => (
                    <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={index}
                        checked={answers[currentQuestion.id] === index}
                        onChange={() => handleAnswerChange(currentQuestion.id, index)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))
                )}
                
                {currentQuestion.type === "true-false" && (
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value="true"
                        checked={answers[currentQuestion.id] === true}
                        onChange={() => handleAnswerChange(currentQuestion.id, true)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">True</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value="false"
                        checked={answers[currentQuestion.id] === false}
                        onChange={() => handleAnswerChange(currentQuestion.id, false)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">False</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                {test.questionList.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-8 h-8 rounded-full text-sm font-medium ${
                      index === currentQuestionIndex
                        ? 'bg-blue-600 text-white'
                        : answers[test.questionList[index].id] !== undefined
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              {currentQuestionIndex === test.questionList.length - 1 ? (
                <button
                  onClick={handleSubmitTest}
                  disabled={submitting}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    submitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    'Submit Test'
                  )}
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/courses/${resolvedParams?.slug}/learn`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Back to Learning</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Course Tests</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BarChart3 className="w-4 h-4" />
              <span>Track your progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test List */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Available Tests</h2>
          <p className="text-gray-600">Complete tests to assess your knowledge and earn certificates.</p>
        </div>

        {(loading || checkingProgress) ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">{checkingProgress ? 'Checking course progress...' : 'Loading tests...'}</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : tests.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No tests available for this course yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tests.map((test, index) => {
            const testStatus = getTestStatus(test);
            return (
              <div key={test.id} className={`border rounded-lg p-6 ${getStatusColor(testStatus.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(testStatus.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                      <span className="text-sm text-gray-500">Test {index + 1}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{test.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
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
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm text-gray-600">
                      {testStatus.message}
                    </div>
                    {testStatus.status === "available" && (
                      <button
                        onClick={() => startTest(test.id)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Take Test
                      </button>
                    )}
                    {(testStatus.status === "passed" || testStatus.status === "failed") && (
                      <button
                        onClick={() => {
                          const result = testResults[test.id];
                          
                          // Show results if test is submitted and results are available
                          if (result?.submitted && result?.showResults) {
                            setActiveTest(test.id);
                            setShowResults(true);
                          }
                        }}
                        disabled={!testResults[test.id]?.submitted || !testResults[test.id]?.showResults}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          !testResults[test.id]?.submitted || !testResults[test.id]?.showResults
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : testStatus.status === "passed"
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        {testStatus.status === "passed" || testStatus.status === "failed" 
                              ? "View Results" 
                          : "Results Pending"}
                      </button>
                    )}
                    {testStatus.status === "locked" && (
                      <button
                        disabled
                        className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium"
                      >
                        Locked
                      </button>
                    )}
                    {testStatus.status === "failed" && (
                      <button
                        disabled
                        className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium"
                      >
                        No More Attempts
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Test Progress Summary */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Progress Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Object.values(testResults).filter(r => r.submitted).length}
                </div>
                <div className="text-sm text-gray-600">Tests Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(testResults).filter(r => r.submitted && r.passed).length}
                </div>
                <div className="text-sm text-gray-600">Tests Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{tests.length}</div>
                <div className="text-sm text-gray-600">Total Tests</div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
