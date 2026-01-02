"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  CheckCircle, 
  X, 
  Award, 
  Clock, 
  FileText,
  AlertTriangle,
  Loader2,
  Trophy,
  Target,
  RefreshCw
} from "lucide-react";
import { getTestsByCourse, getCourseTestAttempts } from "@/lib/api/test";
import { getCourseBySlug } from "@/lib/api/courses";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function TestResultsPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  
  const testId = searchParams.get('testId');
  
  const [test, setTest] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseSlug, setCourseSlug] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!testId || !resolvedParams?.slug) {
        setError("Test ID or course not specified");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setCourseSlug(resolvedParams.slug);
        
        // Get course info
        const courseResponse = await getCourseBySlug(resolvedParams.slug);
        if (!courseResponse.success || !courseResponse.data) {
          throw new Error('Course not found');
        }
        
        const courseId = courseResponse.data._id || courseResponse.data.id;
        
        // Fetch tests and attempts in parallel
        const [testsResponse, attemptsResponse] = await Promise.all([
          getTestsByCourse(courseId, true),
          getCourseTestAttempts(courseId)
        ]);
        
        if (!testsResponse.success || !testsResponse.data) {
          throw new Error('Failed to load tests');
        }
        
        // Find the specific test
        const foundTest = testsResponse.data.find(t => 
          t._id.toString() === testId || t._id === testId
        );
        
        if (!foundTest) {
          throw new Error('Test not found');
        }
        
        // Transform test data
        const transformedTest = {
          id: foundTest._id.toString(),
          title: foundTest.title,
          description: foundTest.description || '',
          passingScore: foundTest.passingScore || 70,
          showResults: foundTest.showResults !== false,
          questionList: foundTest.questions?.map((q, index) => ({
            id: q._id?.toString() || (index + 1).toString(),
            _id: q._id,
            type: q.type || 'multiple-choice',
            question: q.question,
            options: q.options || [],
            correctAnswer: q.correctAnswer,
            points: q.points || 1,
            image: q.image || null,
            explanation: q.explanation || ''
          })) || []
        };
        
        setTest(transformedTest);
        
        // Find the latest attempt for this test
        if (attemptsResponse.success && attemptsResponse.data) {
          const testAttempts = attemptsResponse.data.filter(a => 
            a.testId?.toString() === testId
          );
          
          if (testAttempts.length > 0) {
            // Get the latest attempt
            const latestAttempt = testAttempts.sort((a, b) => 
              new Date(b.completedAt) - new Date(a.completedAt)
            )[0];
            
            setResult({
              submitted: true,
              score: latestAttempt.score,
              totalPoints: 100,
              percentage: latestAttempt.score,
              passingScore: transformedTest.passingScore,
              passed: latestAttempt.passed,
              results: latestAttempt.results || [],
              submittedAt: latestAttempt.completedAt,
              attemptNumber: latestAttempt.attemptNumber || testAttempts.length,
              violations: latestAttempt.violations || [],
              retakeAllowed: latestAttempt.retakeAllowed === true
            });
          } else {
            setError('No test attempts found. Please take the test first.');
          }
        } else {
          setError('Failed to load test attempts');
        }
      } catch (err) {
        console.error('Error fetching results:', err);
        setError(err.message || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [testId, resolvedParams?.slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !test || !result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {error || 'Results Not Available'}
          </h1>
          <p className="text-gray-600 mb-6">
            {!test ? 'The test could not be found.' : 
             !result ? 'No test attempt found. Please take the test first.' :
             'There was an error loading your results.'}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href={`/courses/${courseSlug || resolvedParams?.slug}/test`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Tests
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Results not available (showResults is false)
  if (!test.showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Results Pending</h1>
          <p className="text-gray-600 mb-6">
            Your test has been submitted successfully. Results will be announced later.
            Please check back soon.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <div className="text-sm text-blue-700">
              <div className="flex justify-between mb-2">
                <span>Test:</span>
                <span className="font-medium">{test.title}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Submitted:</span>
                <span className="font-medium">
                  {new Date(result.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Attempt:</span>
                <span className="font-medium">#{result.attemptNumber}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={`/courses/${courseSlug}/test`}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Tests
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format answer display helper
  const formatAnswer = (answer, question) => {
    if (answer === null || answer === undefined) return 'Not answered';
    if (typeof answer === 'boolean') return answer ? 'True' : 'False';
    if (question?.options && question.options[answer] !== undefined) {
      const option = question.options[answer];
      if (typeof option === 'object' && option !== null && option.type === 'image') {
        return `Image Option ${String.fromCharCode(65 + answer)}`;
      }
      const optionValue = typeof option === 'object' && option !== null ? option.value : option;
      return optionValue;
    }
    return String(answer);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14">
            <Link 
              href={`/courses/${courseSlug}/test`}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mr-6"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Tests</span>
            </Link>
            <div className="h-6 w-px bg-gray-200 mr-6" />
            <h1 className="text-lg font-semibold text-gray-900 truncate">{test.title} - Results</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6">
        {/* Results Summary Card */}
        <div className={`rounded-2xl p-6 mb-6 ${
          result.passed 
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' 
            : 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-200'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Score Display */}
            <div className="flex items-center gap-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                result.passed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {result.passed ? (
                  <Trophy className="w-12 h-12 text-green-600" />
                ) : (
                  <Target className="w-12 h-12 text-red-600" />
                )}
              </div>
              <div>
                <div className={`text-5xl font-bold ${
                  result.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.percentage?.toFixed(1)}%
                </div>
                <div className={`text-xl font-semibold ${
                  result.passed ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.passed ? '🎉 Passed!' : 'Not Passed'}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/60 rounded-lg p-3 text-center">
                <div className="text-gray-500">Score</div>
                <div className="font-bold text-gray-900">
                  {result.score} / {result.totalPoints}
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center">
                <div className="text-gray-500">Passing</div>
                <div className="font-bold text-gray-900">{result.passingScore}%</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center">
                <div className="text-gray-500">Attempt</div>
                <div className="font-bold text-gray-900">#{result.attemptNumber}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center">
                <div className="text-gray-500">Submitted</div>
                <div className="font-bold text-gray-900">
                  {new Date(result.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Violations Warning */}
          {result.violations && result.violations.length > 0 && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-amber-700 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">
                  {result.violations.length} Violation(s) Recorded
                </span>
              </div>
              <ul className="text-sm text-amber-600 list-disc list-inside">
                {result.violations.map((v, i) => (
                  <li key={i}>{v.type}: {v.description || 'Tab switch detected'}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-400" />
            Question Review
          </h2>
          
          <div className="space-y-4">
            {result.results && result.results.length > 0 ? (
              result.results.map((qResult, index) => {
                const question = test.questionList.find(q => 
                  (q._id && q._id.toString() === qResult.questionId?.toString()) || 
                  (q.id && q.id.toString() === qResult.questionId?.toString())
                );
                
                const isCorrect = qResult.isCorrect !== undefined 
                  ? qResult.isCorrect 
                  : (qResult.correct !== undefined ? qResult.correct : false);
                const userAnswer = qResult.userAnswer !== undefined 
                  ? qResult.userAnswer 
                  : qResult.answer;
                const correctAnswer = qResult.correctAnswer !== undefined 
                  ? qResult.correctAnswer 
                  : question?.correctAnswer;
                
                return (
                  <div key={index} className={`border rounded-xl p-5 transition-all ${
                    isCorrect 
                      ? 'bg-green-50/50 border-green-200 hover:bg-green-50' 
                      : 'bg-red-50/50 border-red-200 hover:bg-red-50'
                  }`}>
                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCorrect ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                        }`}>
                          {index + 1}
                        </span>
                        <span className={`text-sm font-medium ${
                          isCorrect ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                        <span className="text-sm text-gray-500">
                          {qResult.points || 0} / {question?.points || 1} pts
                        </span>
                      </div>
                    </div>
                    
                    {/* Question Text */}
                    <p className="text-gray-800 font-medium mb-4">
                      {qResult.question || question?.question || 'Question'}
                    </p>
                    
                    {/* Question Image */}
                    {question?.image && (
                      <div className="mb-4 flex justify-center">
                        <img 
                          src={getImageUrl(question.image)} 
                          alt="Question illustration" 
                          className="max-w-full sm:max-w-lg h-auto max-h-48 object-contain rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    
                    {/* Answers */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-gray-600 min-w-[100px]">Your Answer:</span>
                        {question?.options && question.options[userAnswer] && 
                         typeof question.options[userAnswer] === 'object' && 
                         question.options[userAnswer].type === 'image' ? (
                          <img 
                            src={getImageUrl(question.options[userAnswer].value)} 
                            alt="Your answer"
                            className="max-w-[120px] h-auto max-h-20 object-contain rounded border border-gray-300"
                          />
                        ) : (
                          <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {formatAnswer(userAnswer, question)}
                          </span>
                        )}
                      </div>
                      
                      {!isCorrect && correctAnswer !== undefined && (
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-gray-600 min-w-[100px]">Correct:</span>
                          {question?.options && question.options[correctAnswer] && 
                           typeof question.options[correctAnswer] === 'object' && 
                           question.options[correctAnswer].type === 'image' ? (
                            <img 
                              src={getImageUrl(question.options[correctAnswer].value)} 
                              alt="Correct answer"
                              className="max-w-[120px] h-auto max-h-20 object-contain rounded border-2 border-green-400"
                            />
                          ) : (
                            <span className="text-green-700 font-semibold">
                              {formatAnswer(correctAnswer, question)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Explanation */}
                    {question?.explanation && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="font-medium text-blue-900">Explanation: </span>
                        <span className="text-blue-700">{question.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No detailed results available for this test.</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          {/* Retake Button - only if failed and admin allowed retake */}
          {!result.passed && result.retakeAllowed && (
            <Link
              href={`/courses/${courseSlug}/test/attempt?testId=${testId}`}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors text-center flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Test
            </Link>
          )}
          <Link
            href={`/courses/${courseSlug}/test`}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-center"
          >
            Back to Tests
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-center"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

