"use client";

import { BookOpen, CheckCircle, PlayCircle, Award, Clock } from "lucide-react";
import Link from "next/link";

export default function RecentActivity({ enrollments }) {
  // Generate activity timeline from enrollments
  const activities = enrollments
    .flatMap((enrollment) => {
      const course = enrollment.courseId;
      if (!course) return [];

      const acts = [];

      // Enrollment activity
      acts.push({
        type: "enrolled",
        title: `Enrolled in ${course.title}`,
        date: enrollment.enrolledAt,
        icon: BookOpen,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        link: `/courses/${course.slug}`,
      });

      // Completion activity
      if (enrollment.status === "completed" && enrollment.completedAt) {
        acts.push({
          type: "completed",
          title: `Completed ${course.title}`,
          date: enrollment.completedAt,
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-100",
          link: `/courses/${course.slug}`,
        });
      }

      // Last accessed activity
      if (enrollment.lastAccessedAt) {
        acts.push({
          type: "accessed",
          title: `Accessed ${course.title}`,
          date: enrollment.lastAccessedAt,
          icon: PlayCircle,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          link: `/courses/${course.slug}/learn`,
        });
      }

      // Tests completed
      if (enrollment.testsCompleted && enrollment.testsCompleted.length > 0) {
        enrollment.testsCompleted.forEach((test) => {
          if (test.completedAt) {
            acts.push({
              type: "test",
              title: `Completed test in ${course.title}`,
              date: test.completedAt,
              score: test.score,
              passed: test.passed,
              icon: Award,
              color: test.passed ? "text-green-600" : "text-red-600",
              bgColor: test.passed ? "bg-green-100" : "bg-red-100",
              link: `/courses/${course.slug}/test`,
            });
          }
        });
      }

      return acts;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 20); // Show last 20 activities (scrollable)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </h2>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </h2>
        <span className="text-xs text-gray-500">{activities.length} activities</span>
      </div>
      {/* Scrollable container with max height */}
      <div className="max-h-[400px] overflow-y-auto space-y-3 pr-1 scrollbar-thin">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <Link
              key={index}
              href={activity.link}
              className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors block"
            >
              <div
                className={`${activity.bgColor} p-2 rounded-lg flex-shrink-0`}
              >
                <Icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                {activity.score !== undefined && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    Score: {activity.score}%{" "}
                    {activity.passed ? (
                      <span className="text-green-600">(Passed)</span>
                    ) : (
                      <span className="text-red-600">(Failed)</span>
                    )}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-0.5">
                  {formatDate(activity.date)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

