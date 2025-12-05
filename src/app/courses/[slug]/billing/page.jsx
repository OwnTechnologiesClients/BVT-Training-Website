"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Check,
  Loader2,
  Lock,
  Award,
  Clock,
  Users,
  Play,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getCourseBySlug } from "@/lib/api/courses";

export default function CourseBillingPage({ params }) {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/courses/${slug}/billing`)}`);
    }
  }, [isAuthenticated, authLoading, router, slug]);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);
        const response = await getCourseBySlug(slug);

        if (response.success && response.data) {
          setCourseData(response.data);
        } else {
          const errorMsg = 'Course not found';
          setError(errorMsg);
          showError('Course Not Found', errorMsg);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        const errorMsg = err.message || 'Failed to load course';
        setError(errorMsg);
        showError('Error Loading Course', errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const handlePurchase = () => {
    if (!courseData || !isAuthenticated) return;

    // Static implementation - just show thank you page
    setPurchasing(true);
    setTimeout(() => {
      setPurchasing(false);
      setShowThankYou(true);
    }, 1000);
  };

  // Loading state
  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/courses">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Browse All Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!courseData) return null;

  // Show Thank You page if purchase is complete
  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Thank You for Your Purchase!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              You have successfully enrolled in
            </p>
            <p className="text-xl font-semibold text-blue-900 mb-8">
              {courseData.title}
            </p>

            {/* Course Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                {courseData.image && (
                  <img 
                    src={courseData.image} 
                    alt={courseData.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="text-left">
                  <p className="font-medium text-gray-900">{courseData.title}</p>
                  {courseData.category?.name && (
                    <p className="text-sm text-gray-500">{courseData.category.name}</p>
                  )}
                </div>
              </div>
              {courseData.isOnline === false ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 font-medium mb-1">Offline Course Enrollment</p>
                  <p className="text-sm text-blue-700">
                    Check your email for further instructions about the course schedule and location.
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-900 font-medium mb-1">You can now start learning!</p>
                  <p className="text-sm text-green-700">
                    Access all course materials and start your learning journey.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <button className="w-full sm:w-auto bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-md">
                  Go to Dashboard
                </button>
              </Link>
              <Link href="/courses">
                <button className="w-full sm:w-auto bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Browse More Courses
                </button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to your registered email address.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get instructor info
  const instructor = courseData.instructor?.userId || courseData.instructor || {};
  const instructorName = instructor.firstName && instructor.lastName 
    ? `${instructor.firstName} ${instructor.lastName}`
    : instructor.name || 'Instructor';
  
  const categoryName = courseData.category?.name || courseData.category || 'Uncategorized';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href={`/courses/${slug}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Course</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
                <p className="text-gray-600 mb-8">Review your course details and complete the enrollment</p>

                {/* Course Info Card */}
                <div className="border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-4">
                    {courseData.image && (
                      <img 
                        src={courseData.image} 
                        alt={courseData.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{courseData.title}</h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {courseData.description || 'No description available.'}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {courseData.level && (
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            <span>{courseData.level}</span>
                          </div>
                        )}
                        {courseData.duration && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{courseData.duration}</span>
                          </div>
                        )}
                        {(courseData.lessons || courseData.lectures) && (
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            <span>{courseData.lessons || courseData.lectures} Lessons</span>
                          </div>
                        )}
                        {courseData.studentsCount && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{courseData.studentsCount} Students</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                  <div className="space-y-3">
                    {courseData.isOnline !== false ? (
                      <>
                        <div className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Full Course Access</div>
                            <div className="text-sm text-gray-600">Lifetime access to all course materials</div>
                          </div>
                        </div>
                        {(courseData.lessons || courseData.lectures) && (
                          <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-gray-900">{courseData.lessons || courseData.lectures} Video Lessons</div>
                              <div className="text-sm text-gray-600">High-quality video content</div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">Hands-On Training</div>
                          <div className="text-sm text-gray-600">In-person training with expert instructors</div>
                        </div>
                      </div>
                    )}
                    {courseData.certificate && (
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-900">Certificate of Completion</div>
                          <div className="text-sm text-gray-600">Earn a certificate upon completion</div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">Instructor Support</div>
                        <div className="text-sm text-gray-600">Get help from {instructorName}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-red-900 mb-1">Purchase Failed</div>
                      <div className="text-sm text-red-700">{error}</div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Sidebar - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course</span>
                    <span className="font-medium text-gray-900">{courseData.title}</span>
                  </div>
                  
                  {courseData.originalPrice && courseData.originalPrice > courseData.price && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Original Price</span>
                      <span className="text-gray-500 line-through">${courseData.originalPrice}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <div className="text-right">
                        {courseData.originalPrice && courseData.originalPrice > courseData.price && (
                          <div className="text-sm text-gray-500 line-through mb-1">${courseData.originalPrice}</div>
                        )}
                        <div className="text-2xl font-bold text-blue-900">
                          ${courseData.price || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                 <button
                   onClick={handlePurchase}
                   disabled={purchasing || !isAuthenticated}
                   className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                 >
                   {purchasing ? (
                     <>
                       <Loader2 className="w-5 h-5 animate-spin" />
                       Processing...
                     </>
                   ) : (
                     <>
                       <Lock className="w-5 h-5" />
                       Enroll Now
                     </>
                   )}
                 </button>

                <div className="text-xs text-gray-500 text-center space-y-2">
                  <p>By enrolling, you agree to our Terms of Service and Privacy Policy.</p>
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

