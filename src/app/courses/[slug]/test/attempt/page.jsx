"use client";

import { useState, useEffect, useRef, useCallback, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  BookmarkIcon,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  FileText,
  Send,
  RotateCcw,
  AlertCircle,
  Shield
} from "lucide-react";
import { getTestsByCourse, submitTest as submitTestAPI } from "@/lib/api/test";
import { getCourseBySlug } from "@/lib/api/courses";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function TestAttemptPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  
  // Test data states
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Test progress states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [bookmarked, setBookmarked] = useState(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Anti-cheat states
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [violations, setViolations] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  
  // Completion states
  const [testCompleted, setTestCompleted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [resultsAvailable, setResultsAvailable] = useState(false);
  
  // Refs
  const timerRef = useRef(null);
  const testStartTimeRef = useRef(null);
  
  // Get testId from query params
  const testId = searchParams.get('testId');
  
  // Fetch test data
  useEffect(() => {
    const fetchTest = async () => {
      if (!resolvedParams?.slug || !testId) {
        setError('Invalid test parameters');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // First get the course to get courseId
        const courseResponse = await getCourseBySlug(resolvedParams.slug);
        if (!courseResponse.success || !courseResponse.data) {
          setError('Course not found');
          setLoading(false);
          return;
        }
        
        const courseId = courseResponse.data._id;
        
        // Then get tests for this course
        const response = await getTestsByCourse(courseId, true);
        
        if (response.success && response.data) {
          const foundTest = response.data.find(t => t._id === testId);
          if (foundTest) {
            // Transform test data
            const transformedTest = {
              id: foundTest._id,
              title: foundTest.title,
              description: foundTest.description,
              duration: foundTest.duration || 60,
              passingScore: foundTest.passingScore || 70,
              maxAttempts: foundTest.maxAttempts || 3,
              questionList: foundTest.questions?.map((q, idx) => ({
                id: q._id || `q-${idx}`,
                question: q.question,
                options: q.options || [],
                image: q.image,
                points: q.points || 1,
                type: q.type || 'multiple-choice'
              })) || []
            };
            setTest(transformedTest);
            setTimeRemaining(transformedTest.duration * 60);
          } else {
            setError('Test not found');
          }
        } else {
          setError('Failed to load test');
        }
      } catch (err) {
        console.error('Error fetching test:', err);
        setError(err.message || 'Failed to load test');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTest();
  }, [resolvedParams?.slug, testId]);
  
  // Timer effect
  useEffect(() => {
    if (testStarted && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoSubmit('time_expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [testStarted]);
  
  // Tab switch detection
  useEffect(() => {
    if (!testStarted) return;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newCount = tabSwitchCount + 1;
        setTabSwitchCount(newCount);
        setViolations(prev => [...prev, {
          type: 'tab_switch',
          timestamp: new Date().toISOString(),
          count: newCount
        }]);
        setShowTabWarning(true);
        
        // Auto-submit after 3 tab switches
        if (newCount >= 3) {
          handleAutoSubmit('max_violations');
        }
      }
    };
    
    const handleBlur = () => {
      if (testStarted) {
        const newCount = tabSwitchCount + 1;
        setTabSwitchCount(newCount);
        setViolations(prev => [...prev, {
          type: 'window_blur',
          timestamp: new Date().toISOString(),
          count: newCount
        }]);
        setShowTabWarning(true);
        
        if (newCount >= 3) {
          handleAutoSubmit('max_violations');
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [testStarted, tabSwitchCount]);
  
  // Prevent right-click and copy
  useEffect(() => {
    if (!testStarted) return;
    
    const handleContextMenu = (e) => {
      e.preventDefault();
      setViolations(prev => [...prev, {
        type: 'right_click',
        timestamp: new Date().toISOString()
      }]);
    };
    
    const handleCopy = (e) => {
      e.preventDefault();
      setViolations(prev => [...prev, {
        type: 'copy_attempt',
        timestamp: new Date().toISOString()
      }]);
    };
    
    const handleKeyDown = (e) => {
      // Prevent Ctrl+C, Ctrl+V, Ctrl+A, F12, etc.
      if (
        (e.ctrlKey && ['c', 'v', 'a', 'u', 's'].includes(e.key.toLowerCase())) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')
      ) {
        e.preventDefault();
        setViolations(prev => [...prev, {
          type: 'keyboard_shortcut',
          timestamp: new Date().toISOString(),
          key: e.key
        }]);
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [testStarted]);
  
  // Prevent browser back button
  useEffect(() => {
    if (!testStarted) return;
    
    const handlePopState = (e) => {
      window.history.pushState(null, '', window.location.href);
      setShowExitWarning(true);
    };
    
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [testStarted]);
  
  // Prevent page unload
  useEffect(() => {
    if (!testStarted) return;
    
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [testStarted]);
  
  // Format time
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start test
  const handleStartTest = () => {
    setTestStarted(true);
    setShowStartModal(false);
    testStartTimeRef.current = new Date();
  };
  
  // Handle answer selection
  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  // Clear response
  const handleClearResponse = () => {
    const currentQuestion = test.questionList[currentQuestionIndex];
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion.id];
      return newAnswers;
    });
  };
  
  // Toggle mark for review
  const toggleMarkForReview = () => {
    const questionId = test.questionList[currentQuestionIndex].id;
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };
  
  // Toggle bookmark
  const toggleBookmark = () => {
    const questionId = test.questionList[currentQuestionIndex].id;
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };
  
  // Navigate to question
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisitedQuestions(prev => new Set([...prev, index]));
  };
  
  // Next question
  const nextQuestion = () => {
    if (currentQuestionIndex < test.questionList.length - 1) {
      goToQuestion(currentQuestionIndex + 1);
    }
  };
  
  // Previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      goToQuestion(currentQuestionIndex - 1);
    }
  };
  
  // Save and next
  const saveAndNext = () => {
    nextQuestion();
  };
  
  // Save and mark for review
  const saveAndMarkForReview = () => {
    toggleMarkForReview();
    nextQuestion();
  };
  
  // Get question status
  const getQuestionStatus = (index) => {
    const question = test.questionList[index];
    const isAnswered = answers[question.id] !== undefined;
    const isMarked = markedForReview.has(question.id);
    const isVisited = visitedQuestions.has(index);
    const isCurrent = index === currentQuestionIndex;
    
    if (isCurrent) return 'current';
    if (isAnswered && isMarked) return 'answered-marked';
    if (isAnswered) return 'answered';
    if (isMarked) return 'marked';
    if (isVisited) return 'visited';
    return 'not-visited';
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-blue-600 text-white border-blue-600';
      case 'answered': return 'bg-green-500 text-white border-green-500';
      case 'answered-marked': return 'bg-purple-500 text-white border-purple-500';
      case 'marked': return 'bg-purple-200 text-purple-800 border-purple-300';
      case 'visited': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };
  
  // Calculate stats
  const getStats = () => {
    if (!test) return {};
    
    const total = test.questionList.length;
    const answered = Object.keys(answers).length;
    const marked = markedForReview.size;
    const bookmarkedCount = bookmarked.size;
    const visited = visitedQuestions.size;
    
    return {
      total,
      answered,
      notAnswered: total - answered,
      marked,
      bookmarked: bookmarkedCount,
      visited,
      notVisited: total - visited
    };
  };
  
  // Handle auto submit
  const handleAutoSubmit = async (reason) => {
    await handleSubmitTest(true, reason);
  };
  
  // Handle submit test
  const handleSubmitTest = async (isAuto = false, autoReason = null) => {
    if (submitting) return;
    
    try {
      setSubmitting(true);
      
      // Format answers for API
      const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer
      }));
      
      // Format violations for API
      const violationsData = violations.map(v => ({
        type: v.type || 'tab_switch',
        description: v.description || `Tab switch detected`,
        timestamp: v.timestamp || new Date().toISOString()
      }));
      
      // Submit with violations data
      const response = await submitTestAPI(testId, answersArray, {
        violations: violationsData,
        autoSubmitted: isAuto,
        autoSubmitReason: autoReason
      });
      
      if (response.success) {
        // Clear timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        
        // Store submission result and show completion screen
        setSubmissionResult(response.data);
        
        // Check if results are available (showResults is enabled and we got score)
        const hasResults = test?.showResults !== false && 
                          response.data?.passed !== undefined && 
                          response.data?.percentage !== undefined;
        setResultsAvailable(hasResults);
        
        // Show completion screen instead of redirecting
        setTestCompleted(true);
        setTestStarted(false);
      } else {
        setError(response.message || 'Failed to submit test');
      }
    } catch (err) {
      console.error('Error submitting test:', err);
      setError(err.message || 'Failed to submit test');
    } finally {
      setSubmitting(false);
      setShowSubmitModal(false);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error || !test) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Test not found'}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  // Test Completed Screen
  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center">
          {/* Success Animation */}
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-14 h-14 text-green-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-32 h-32 bg-green-200/30 rounded-full animate-ping mx-auto left-1/2 -translate-x-1/2"></div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Test Submitted Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your responses have been recorded. Thank you for completing the test.
          </p>
          
          {/* Test Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <span className="text-gray-500">Test Name</span>
                <p className="font-semibold text-gray-800">{test?.title}</p>
              </div>
              <div className="text-left">
                <span className="text-gray-500">Questions</span>
                <p className="font-semibold text-gray-800">{test?.questionList?.length}</p>
              </div>
              <div className="text-left">
                <span className="text-gray-500">Answered</span>
                <p className="font-semibold text-gray-800">{Object.keys(answers).length}</p>
              </div>
              <div className="text-left">
                <span className="text-gray-500">Status</span>
                <p className="font-semibold text-green-600">Submitted</p>
              </div>
            </div>
          </div>
          
          {/* Results Status */}
          {resultsAvailable ? (
            <div className="mb-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Results Available</span>
                </div>
                <p className="text-sm text-green-600">
                  Click the button below to view your test results and detailed feedback.
                </p>
              </div>
              <button
                onClick={() => router.push(`/courses/${resolvedParams?.slug}/test/results?testId=${testId}`)}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                View Results
              </button>
            </div>
          ) : (
            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Results Pending</span>
                </div>
                <p className="text-sm text-blue-600">
                  Your test results will be announced later. Check back on the course test page or your dashboard for updates.
                </p>
              </div>
            </div>
          )}
          
          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push(`/courses/${resolvedParams?.slug}/test`)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              Back to Tests
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
          
          {/* Violations Warning */}
          {violations.length > 0 && (
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 text-amber-700 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Test Violations Recorded</span>
              </div>
              <p className="text-sm text-amber-600">
                {violations.length} violation(s) were detected during your test. This information has been recorded.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  const currentQuestion = test.questionList[currentQuestionIndex];
  const stats = getStats();
  
  // Start modal
  if (showStartModal) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{test.title}</h1>
            <p className="text-gray-600">{test.description}</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Questions</span>
              <span className="font-semibold">{test.questionList.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration</span>
              <span className="font-semibold">{test.duration} minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Passing Score</span>
              <span className="font-semibold">{test.passingScore}%</span>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Test Rules</p>
                <ul className="space-y-1 text-amber-700">
                  <li>• Do not switch tabs or windows during the test</li>
                  <li>• 3 violations will auto-submit your test</li>
                  <li>• Test will auto-submit when time expires</li>
                  <li>• Right-click and copy are disabled</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleStartTest}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col select-none">
      {/* Tab Warning Modal */}
      {showTabWarning && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-shake">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Warning!</h2>
              <p className="text-gray-600 mb-4">
                You switched away from the test. This has been recorded.
              </p>
              <p className="text-red-600 font-semibold mb-6">
                Violations: {tabSwitchCount}/3
              </p>
              {tabSwitchCount >= 3 ? (
                <p className="text-red-600 font-bold">
                  Maximum violations reached. Test will be submitted.
                </p>
              ) : (
                <button
                  onClick={() => setShowTabWarning(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Exit Warning Modal */}
      {showExitWarning && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Leave Test?</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to leave? Your progress will be lost.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitWarning(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Continue Test
                </button>
                <button
                  onClick={() => {
                    setShowExitWarning(false);
                    setShowSubmitModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Submit & Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Test?</h2>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Answered</span>
                  <p className="font-semibold text-green-600">{stats.answered}</p>
                </div>
                <div>
                  <span className="text-gray-500">Not Answered</span>
                  <p className="font-semibold text-red-600">{stats.notAnswered}</p>
                </div>
                <div>
                  <span className="text-gray-500">Marked for Review</span>
                  <p className="font-semibold text-purple-600">{stats.marked}</p>
                </div>
                <div>
                  <span className="text-gray-500">Not Visited</span>
                  <p className="font-semibold text-gray-600">{stats.notVisited}</p>
                </div>
              </div>
            </div>
            
            {stats.notAnswered > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-amber-800">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  You have {stats.notAnswered} unanswered question(s).
                </p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                disabled={submitting}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium disabled:opacity-50"
              >
                Review Answers
              </button>
              <button
                onClick={() => handleSubmitTest(false)}
                disabled={submitting}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Test
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Test Interface */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Question Navigator */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
          {/* Test Title */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="font-bold text-gray-900 truncate">{test.title}</h1>
            <p className="text-sm text-gray-500">Question Navigator</p>
          </div>
          
          {/* Question Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2">
              {test.questionList.map((q, index) => {
                const status = getQuestionStatus(index);
                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`
                      w-10 h-10 rounded-lg text-sm font-medium border-2 transition-all
                      ${getStatusColor(status)}
                      hover:scale-105
                    `}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Legend */}
          <div className="p-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-gray-600">Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-red-100 border border-red-300"></div>
                <span className="text-gray-600">Unanswered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-purple-500"></div>
                <span className="text-gray-600">Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-gray-200"></div>
                <span className="text-gray-600">Not Visited</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Center - Question Content */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Question Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Q: {currentQuestionIndex + 1}
              </span>
              {markedForReview.has(currentQuestion.id) && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                  Marked for Review
                </span>
              )}
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Report
            </button>
          </div>
          
          {/* Question Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              {/* Question Text */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <p className="text-gray-900 text-lg leading-relaxed">
                  {currentQuestion.question}
                </p>
                
                {/* Question Image */}
                {currentQuestion.image && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={getImageUrl(currentQuestion.image)}
                      alt="Question"
                      className="max-w-full max-h-80 object-contain rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
              
              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const optionType = typeof option === 'object' && option !== null ? option.type : 'text';
                  const optionValue = typeof option === 'object' && option !== null ? option.value : option;
                  const isSelected = answers[currentQuestion.id] === index;
                  
                  return (
                    <label
                      key={index}
                      className={`
                        flex items-center gap-4 p-4 bg-white rounded-xl border-2 cursor-pointer transition-all
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(currentQuestion.id, index)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className={`
                        w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm
                        ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}
                      `}>
                        {String.fromCharCode(97 + index)})
                      </span>
                      <div className="flex-1">
                        {optionType === 'image' ? (
                          <img
                            src={getImageUrl(optionValue)}
                            alt={`Option ${String.fromCharCode(65 + index)}`}
                            className="max-h-32 object-contain rounded"
                          />
                        ) : (
                          <span className={isSelected ? 'text-blue-900' : 'text-gray-700'}>
                            {optionValue}
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Question Footer */}
          <div className="bg-white border-t border-gray-200 px-6 py-3">
            <div className="max-w-4xl mx-auto">
              {/* Navigation Row */}
              <div className="flex items-center justify-between">
                {/* Left: Previous Button */}
                <div className="w-32">
                  {currentQuestionIndex > 0 ? (
                    <button
                      onClick={prevQuestion}
                      className="flex items-center gap-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
                
                {/* Center: Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleBookmark}
                    title="Bookmark this question"
                    className={`
                      p-2.5 rounded-lg border transition-colors
                      ${bookmarked.has(currentQuestion.id)
                        ? 'bg-amber-50 border-amber-300 text-amber-600'
                        : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                      }
                    `}
                  >
                    <BookmarkIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClearResponse}
                    disabled={answers[currentQuestion.id] === undefined}
                    title="Clear your answer"
                    className="p-2.5 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={saveAndMarkForReview}
                    title="Mark for review"
                    className={`
                      p-2.5 rounded-lg border transition-colors
                      ${markedForReview.has(currentQuestion.id)
                        ? 'bg-purple-100 border-purple-300 text-purple-600'
                        : 'border-gray-300 text-gray-500 hover:bg-purple-50'
                      }
                    `}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Right: Next/Save Button */}
                <div className="w-32 flex justify-end">
                  <button
                    onClick={saveAndNext}
                    disabled={currentQuestionIndex >= test.questionList.length - 1}
                    className={`flex items-center gap-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                      currentQuestionIndex >= test.questionList.length - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar - Timer & Stats */}
        <div className="w-72 bg-white border-l border-gray-200 flex flex-col">
          {/* Timer */}
          <div className="p-6 border-b border-gray-200 text-center">
            <div className={`
              text-4xl font-mono font-bold mb-1
              ${timeRemaining < 300 ? 'text-red-600 animate-pulse' : 
                timeRemaining < 600 ? 'text-amber-600' : 'text-gray-900'}
            `}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-xs text-gray-500 flex justify-center gap-8">
              <span>Hrs</span>
              <span>Min</span>
              <span>Sec</span>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex-1 p-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Answered</span>
                <span className="font-semibold text-green-600">{stats.answered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Remaining</span>
                <span className="font-semibold text-gray-600">{stats.notAnswered}</span>
              </div>
              {stats.marked > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">For Review</span>
                  <span className="font-semibold text-purple-600">{stats.marked}</span>
                </div>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.round((stats.answered / stats.total) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(stats.answered / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Violation Warning */}
          {tabSwitchCount > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-700 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Violations: {tabSwitchCount}/3</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Test
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom styles for shake animation */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

