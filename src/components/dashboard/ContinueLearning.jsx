"use client";

import { useRouter } from "next/navigation";
import { PlayCircle, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function ContinueLearning({ enrollment }) {
  const router = useRouter();
  const course = enrollment.courseId;
  
  // Use pre-calculated progress if available, otherwise calculate
  let progress = enrollment.calculatedProgress;
  
  if (progress === undefined || progress === null) {
    // Calculate progress - always calculate from lessonsCompleted if available (most accurate)
    progress = 0;
    
    if (enrollment.lessonsCompleted && Array.isArray(enrollment.lessonsCompleted) && course) {
      let totalLessons = 0;
      
      // Check different course structures
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
      
      if (totalLessons > 0) {
        const completedCount = enrollment.lessonsCompleted.length;
        progress = Math.round((completedCount / totalLessons) * 100);
      }
    }
    
    // Fallback to backend progress if calculation didn't work
    if (progress === 0 && enrollment.progress !== undefined && enrollment.progress !== null) {
      const backendProgress = Number(enrollment.progress);
      if (!isNaN(backendProgress) && backendProgress >= 0) {
        progress = backendProgress;
      }
    }
  }
  
  // Ensure progress is between 0 and 100
  progress = Math.min(100, Math.max(0, progress));

  const handleContinue = () => {
    if (course?.slug) {
      router.push(`/courses/${course.slug}/learn`);
    }
  };

  if (!course) return null;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
          <Link
            href={`/courses/${course.slug}/learn`}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            View All Courses
            <span>→</span>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Course Image */}
            <div className="flex-shrink-0">
              {course.image ? (
                <img
                  src={getImageUrl(course.image)}
                  alt={course.title}
                  className="w-full md:w-48 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop';
                  }}
                />
              ) : (
                <div className="w-full md:w-48 h-32 bg-blue-200 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Course Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                {course.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                )}
                {course.level && (
                  <div className="flex items-center gap-1">
                    <span className="px-2 py-1 bg-gray-200 rounded text-xs font-medium">
                      {course.level}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleContinue}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

