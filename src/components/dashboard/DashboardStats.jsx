"use client";

import { BookOpen, PlayCircle, CheckCircle, Award } from "lucide-react";

export default function DashboardStats({ stats }) {
  const statCards = [
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: stats.activeCourses,
      icon: PlayCircle,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      title: "Completed",
      value: stats.completedCourses,
      icon: CheckCircle,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Avg. Progress",
      value: `${stats.averageProgress}%`,
      icon: Award,
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

