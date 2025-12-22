"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlayCircle, CheckCircle, Clock, BookOpen, ArrowRight, MapPin } from "lucide-react";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function CourseCard({ enrollment, onRefresh }) {
  const router = useRouter();
  const course = enrollment.courseId;
  
  // Check if course is offline - offline courses don't have learning pages
  const isOfflineCourse = course?.isOnline === false;
  
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
  
  const status = enrollment.status;

  if (!course) return null;

  const getStatusBadge = () => {
    // For offline courses, show "Offline Workshop" badge
    if (isOfflineCourse) {
      return (
        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
          Offline Workshop
        </span>
      );
    }
    
    // If progress is 100%, always show "Completed" regardless of status
    if (progress >= 100) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
          Completed
        </span>
      );
    }
    
    // Otherwise, show status-based badge
    switch (status) {
      case "completed":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
            Completed
          </span>
        );
      case "active":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            Active
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const handleContinue = () => {
    if (course.slug) {
      router.push(`/courses/${course.slug}/learn`);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Course Image */}
      <div className="relative h-40 bg-gradient-to-br from-blue-900 to-blue-950">
        {course.image ? (
          <img
            src={getImageUrl(course.image)}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-3 right-3">{getStatusBadge()}</div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5">
        {/* Category */}
        {course.category?.name && (
          <span className="text-xs text-gray-500 font-medium">
            {course.category.name}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Progress - only show for online courses */}
        {!isOfflineCourse && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">Progress</span>
              <span className="text-xs font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Location info for offline courses */}
        {isOfflineCourse && course.location && (
          <div className="mb-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{course.location}</span>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{course.duration}</span>
            </div>
          )}
          {course.level && (
            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
              {course.level}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {isOfflineCourse ? (
            // Offline course - show "View Details" instead of learning buttons
            <Link
              href={`/courses/${course.slug}`}
              className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              View Details
            </Link>
          ) : status === "active" && progress < 100 ? (
            <button
              onClick={handleContinue}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              Continue
            </button>
          ) : status === "completed" || progress >= 100 ? (
            <Link
              href={`/courses/${course.slug}`}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              View Certificate
            </Link>
          ) : (
            <button
              onClick={handleContinue}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              Start Course
            </button>
          )}
          {!isOfflineCourse && (
            <Link
              href={`/courses/${course.slug}`}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

