"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, PlayCircle, CheckCircle, Clock, Search, Filter } from "lucide-react";
import CourseCard from "./CourseCard";

export default function MyCourses({ enrollments, loading, onRefresh }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Filter and sort enrollments
  const filteredEnrollments = enrollments
    .filter((enrollment) => {
      const course = enrollment.courseId;
      if (!course) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !course.title?.toLowerCase().includes(query) &&
          !course.description?.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== "all" && enrollment.status !== statusFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          const dateA = a.lastAccessedAt
            ? new Date(a.lastAccessedAt)
            : new Date(a.enrolledAt);
          const dateB = b.lastAccessedAt
            ? new Date(b.lastAccessedAt)
            : new Date(b.enrolledAt);
          return dateB - dateA;
        case "progress":
          return (b.progress || 0) - (a.progress || 0);
        case "name":
          return (a.courseId?.title || "").localeCompare(
            b.courseId?.title || ""
          );
        default:
          return 0;
      }
    });

  const getStatusBadge = (status) => {
    const badges = {
      active: {
        label: "Active",
        className: "bg-blue-100 text-blue-800",
        icon: PlayCircle,
      },
      completed: {
        label: "Completed",
        className: "bg-green-100 text-green-800",
        icon: CheckCircle,
      },
      pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800",
        icon: Clock,
      },
    };
    return badges[status] || badges.active;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            My Courses
          </h2>
          <Link
            href="/courses"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse All Courses →
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Recently Accessed</option>
            <option value="progress">Progress</option>
            <option value="name">Course Name</option>
          </select>
        </div>
      </div>

      {/* Courses List */}
      <div className="p-6">
        {filteredEnrollments.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {enrollments.length === 0
                ? "No courses enrolled yet"
                : "No courses match your filters"}
            </h3>
            <p className="text-gray-600 mb-6">
              {enrollments.length === 0
                ? "Start your learning journey by enrolling in a course"
                : "Try adjusting your search or filter criteria"}
            </p>
            {enrollments.length === 0 && (
              <Link
                href="/courses"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Courses
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEnrollments.map((enrollment) => (
              <CourseCard
                key={enrollment._id}
                enrollment={enrollment}
                onRefresh={onRefresh}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

