"use client";

import { Image, User, Calendar, BookOpen, Award, Users } from "lucide-react";

export default function ImagePlaceholder({ 
  type = 'course', 
  className = "w-full h-full",
  iconClassName = "w-16 h-16"
}) {
  const getIcon = () => {
    switch (type) {
      case 'course':
      case 'event':
      case 'program':
        return BookOpen;
      case 'instructor':
      case 'user':
      case 'mentor':
        return User;
      case 'category':
        return Award;
      case 'event':
        return Calendar;
      default:
        return Image;
    }
  };

  const Icon = getIcon();

  return (
    <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
      <Icon className={`text-gray-400 ${iconClassName}`} />
    </div>
  );
}

