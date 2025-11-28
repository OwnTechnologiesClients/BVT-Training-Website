"use client";

import React, { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { useQuery } from "@/context/QueryContext";

const StudentQueryModal = ({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  lessonId,
  lessonTitle,
  existingQueryId = null,
}) => {
  const { createQuery, addMessage, getQuery } = useQuery();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // If viewing an existing query, load it
  const existingQuery = existingQueryId ? getQuery(existingQueryId) : null;
  
  // Use existing query data if available, otherwise use props
  const displayCourseTitle = existingQuery?.courseTitle || courseTitle || "Course";
  const displayLessonTitle = existingQuery?.lessonTitle || lessonTitle || "Lesson";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    if (existingQuery) {
      // Add message to existing query
      addMessage(existingQueryId, message);
    } else {
      // Create new query
      createQuery({
        courseId,
        courseTitle,
        lessonId,
        lessonTitle,
        subject,
        message,
      });
    }

    setSubject("");
    setMessage("");
    if (!existingQuery) {
      onClose();
    } else {
      setMessage(""); // Clear message but keep modal open to see reply
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {existingQuery ? "View Query" : "Ask Your Query"}
              </h2>
              <p className="text-sm text-gray-500">
                {displayCourseTitle} • {displayLessonTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        {existingQuery && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {existingQuery.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "student" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.sender === "student"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <div className="text-xs font-medium mb-1 opacity-80">
                    {msg.senderName}
                  </div>
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                  <div className="text-xs mt-2 opacity-70">
                    {new Date(msg.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="p-6 border-t border-gray-200 bg-white">
          {!existingQuery && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is your question about?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question or concern..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Query
                </button>
              </div>
            </form>
          )}

          {existingQuery && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reply
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your reply..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQueryModal;

