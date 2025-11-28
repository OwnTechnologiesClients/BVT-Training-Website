"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import StudentQueryModal from "./StudentQueryModal";

const FloatingQueryButton = ({ courseId, courseTitle, lessonId, lessonTitle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Ask your query"
        >
          <MessageCircle className="w-6 h-6" />
          
          {/* Tooltip on hover */}
          {isHovered && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg pointer-events-none">
              Ask your query
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          )}
        </button>
      </div>

      {isModalOpen && (
        <StudentQueryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          courseId={courseId}
          courseTitle={courseTitle}
          lessonId={lessonId}
          lessonTitle={lessonTitle}
        />
      )}
    </>
  );
};

export default FloatingQueryButton;

