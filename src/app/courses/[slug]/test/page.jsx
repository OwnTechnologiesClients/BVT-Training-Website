"use client";

import { useState, use } from "react";
import { ChevronLeft, Clock, CheckCircle, Lock, Play, FileText, Award, BarChart3 } from "lucide-react";
import Link from "next/link";

const COURSE_TESTS = {
  tests: [
    {
      id: "test-1",
      title: "Getting Started + The Brief Assessment",
      description: "Test your knowledge of basic BVT concepts and mission overview",
      chapters: ["getting-started", "the-brief"],
      questionCount: 20,
      timeLimit: 45, // minutes
      passingScore: 70,
      maxAttempts: 1,
      isAvailable: true,
      prerequisites: ["lesson-1", "lesson-2", "lesson-3", "lesson-4", "lesson-5", "lesson-6", "lesson-7"],
      questionList: [
        {
          id: 1,
          type: "multiple-choice",
          question: "What does BVT stand for in naval warfare?",
          options: [
            "Basic Vessel Training",
            "Basic Warfare Training", 
            "Battle Vessel Tactics",
            "Basic Visual Training"
          ],
          correctAnswer: 1,
          explanation: "BVT stands for Basic Warfare Training, which covers fundamental naval warfare principles."
        },
        {
          id: 2,
          type: "true-false",
          question: "BVT Operations include standard operating procedures and emergency protocols.",
          correctAnswer: true,
          explanation: "Yes, BVT Operations encompass SOPs, emergency protocols, communication systems, and tactical coordination."
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "Which of the following is NOT a key component of BVT Warfare?",
          options: [
            "Strategic Planning",
            "Tactical Execution", 
            "Technology Integration",
            "Personal Preferences"
          ],
          correctAnswer: 3,
          explanation: "Personal preferences are not part of BVT Warfare. The key components are strategic planning, tactical execution, technology integration, and the human element."
        }
      ]
    },
    {
      id: "test-2",
      title: "Operations & Navigation + Advanced Strategies Assessment",
      description: "Comprehensive test covering operational procedures and advanced tactical concepts",
      chapters: ["operations-navigation", "advanced-strategies"],
      questionCount: 25,
      timeLimit: 50,
      passingScore: 70,
      maxAttempts: 1,
      isAvailable: true,
      prerequisites: ["test-1"],
      questionList: []
    },
    {
      id: "final-test",
      title: "Comprehensive Course Assessment",
      description: "Final examination covering all course material for certification",
      chapters: ["getting-started", "the-brief", "operations-navigation", "advanced-strategies"],
      questionCount: 50,
      timeLimit: 120,
      passingScore: 80,
      maxAttempts: 1,
      isAvailable: true,
      prerequisites: ["test-1", "test-2"],
      questionList: []
    }
  ]
};

export default function CourseTestPage({ params }) {
  const [activeTest, setActiveTest] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  
  console.log("Course slug:", resolvedParams?.slug);

  const startTest = (testId) => {
    const test = COURSE_TESTS.tests.find(t => t.id === testId);
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
    // Start timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitTest();
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
    const test = COURSE_TESTS.tests.find(t => t.id === activeTest);
    if (currentQuestionIndex < test.questionList.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitTest = () => {
    const test = COURSE_TESTS.tests.find(t => t.id === activeTest);
    
    // Mark test as submitted (no immediate scoring)
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
  };

  const getTestStatus = (test) => {
    if (!test.isAvailable) {
      return {
        status: "locked",
        message: "Complete prerequisites to unlock this test"
      };
    }
    
    const attempts = testResults[test.id]?.attempts || 0;
    const submitted = testResults[test.id]?.submitted || false;
    
    if (submitted) {
      return {
        status: "submitted",
        message: "Test submitted - Results will be shared soon"
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
      case "failed":
        return "bg-red-50 border-red-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  if (activeTest) {
    const test = COURSE_TESTS.tests.find(t => t.id === activeTest);
    
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
                  onClick={submitTest}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Submit Test
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

        <div className="space-y-4">
          {COURSE_TESTS.tests.map((test, index) => {
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
                    {testStatus.status === "submitted" && (
                      <button
                        disabled
                        className="px-6 py-2 bg-blue-300 text-blue-700 rounded-lg cursor-not-allowed font-medium"
                      >
                        Submitted
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
        </div>

        {/* Test Progress Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Progress Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Tests Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Tests Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">3</div>
              <div className="text-sm text-gray-600">Total Tests</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
