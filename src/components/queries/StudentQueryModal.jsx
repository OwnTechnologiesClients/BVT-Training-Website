"use client";

import React, { useState, useEffect } from "react";
import { X, Send, MessageCircle, Paperclip, File, XCircle } from "lucide-react";
import { useQuery } from "@/context/QueryContext";
import { showSuccess, showError } from "@/lib/utils/sweetalert";

const StudentQueryModal = ({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  lessonId,
  lessonTitle,
  existingQueryId = null,
}) => {
  const { createQuery, addMessage, getQuery, loading } = useQuery();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // If viewing an existing query, load it
  const [existingQuery, setExistingQuery] = useState(null);
  
  useEffect(() => {
    if (existingQueryId) {
      getQuery(existingQueryId).then((query) => {
        if (query) {
          setExistingQuery(query);
        }
      }).catch((error) => {
        console.error("Error loading query:", error);
      });
    } else {
      setExistingQuery(null);
    }
  }, [existingQueryId, isOpen, getQuery]);
  
  // Use existing query data if available, otherwise use props
  const displayCourseTitle = existingQuery?.courseId?.title || courseTitle || "Course";
  const displayLessonTitle = existingQuery?.lessonId?.title || lessonTitle || "Lesson";

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return "🖼️";
    } else if (["pdf"].includes(ext)) {
      return "📄";
    } else if (["doc", "docx"].includes(ext)) {
      return "📝";
    } else if (["mp4", "avi", "mov", "mkv"].includes(ext)) {
      return "🎥";
    }
    return "📎";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (submitting) return; // Prevent double submission
    
    // Validation: for new queries, need subject and message; for existing, only message
    if (existingQuery) {
      if (!message.trim() && attachments.length === 0) {
        showError('Validation Error', 'Please enter a message or attach a file');
        return;
      }
    } else {
      if (!subject.trim() || !message.trim()) {
        showError('Validation Error', 'Please fill in all required fields');
        return;
      }
    }

    try {
      setSubmitting(true);
      if (existingQuery) {
        // Add message to existing query
        const queryId = existingQueryId || existingQuery._id;
        const updatedQuery = await addMessage(queryId, message, attachments);
        if (updatedQuery) {
          // Update local state with the updated query
          setExistingQuery(updatedQuery);
          setMessage(""); // Clear message but keep modal open to see reply
          setAttachments([]);
          showSuccess('Message Sent!', 'Your message has been sent successfully.');
        } else {
          throw new Error("Failed to get updated query from server");
        }
      } else {
        // Create new query
        const newQuery = await createQuery({
          courseId,
          courseTitle,
          lessonId,
          lessonTitle,
          subject,
          message,
        }, attachments);
        if (newQuery) {
          setSubject("");
          setMessage("");
          setAttachments([]);
          showSuccess('Query Created!', 'Your query has been submitted successfully. We\'ll get back to you soon.');
          onClose();
        } else {
          throw new Error("Failed to create query");
        }
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      const errorMessage = error.message || "Unknown error";
      // Check if it's a backend compatibility issue
      if (errorMessage.includes("404") || errorMessage.includes("Not Found") || errorMessage.includes("route")) {
        showError('Backend Error', 'This feature requires backend updates. Please ensure the backend is deployed with the latest code.');
      } else {
        showError('Failed to Send Message', errorMessage);
      }
      // Don't clear the form on error so user can retry
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col">
        {/* Compact Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-900">
              {existingQuery ? "Query Conversation" : "Ask Your Query"}
            </h2>
            <p className="text-xs text-gray-500 truncate">
              {displayCourseTitle} • {displayLessonTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-3 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Messages - Compact Design */}
        {existingQuery && existingQuery.messages && (
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-gray-50">
            {existingQuery.messages.map((msg, idx) => (
              <div
                key={msg._id || idx}
                className={`rounded-lg p-3 ${
                  msg.sender === "student"
                    ? "bg-blue-600 text-white ml-8"
                    : "bg-white text-gray-900 border border-gray-200 mr-8"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium opacity-90">
                    {msg.senderName}
                  </span>
                  <span className="text-xs opacity-70">
                    {new Date(msg.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {msg.attachments.map((attachment, attIdx) => (
                      <a
                        key={attIdx}
                        href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${attachment.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-xs ${
                          msg.sender === "student"
                            ? "text-blue-200 hover:text-blue-100"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        <File className="w-3 h-3" />
                        <span className="truncate">{attachment.fileName}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          {!existingQuery && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is your question about?"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Your Question
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question or concern..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 px-2 py-1.5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors text-xs text-gray-600 w-fit">
                  <Paperclip className="w-3 h-3" />
                  <span>Add Files</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.mkv"
                  />
                </label>
                {attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded text-xs"
                      >
                        <span>{getFileIcon(file.name)}</span>
                        <span className="max-w-[120px] truncate text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || loading}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting || loading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      Send
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {existingQuery && (
            <form onSubmit={handleSubmit} className="space-y-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your reply..."
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 px-2 py-1.5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors text-xs text-gray-600">
                    <Paperclip className="w-3 h-3" />
                    <span>Add Files</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.mkv"
                    />
                  </label>
                  {attachments.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {attachments.length} file(s)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || loading}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting || loading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        Send
                      </>
                    )}
                  </button>
                </div>
              </div>
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded text-xs"
                    >
                      <span>{getFileIcon(file.name)}</span>
                      <span className="max-w-[120px] truncate text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="ml-1 hover:text-red-500 transition-colors"
                      >
                        <XCircle className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQueryModal;

