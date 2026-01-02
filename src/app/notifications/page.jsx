"use client";

import React, { useState } from "react";
import { useQuery } from "@/context/QueryContext";
import { StudentQueryModal } from "@/components/queries";
import { MessageCircle, Clock, BookOpen, Eye } from "lucide-react";

export default function NotificationsPage() {
  const { studentQueries } = useQuery();
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewQuery = (queryId) => {
    setSelectedQueryId(queryId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQueryId(null);
  };

  // Sort queries by last updated (most recent first)
  const sortedQueries = [...studentQueries].sort(
    (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Queries</h1>
          <p className="text-gray-600">
            View all your course-related queries and responses from instructors
          </p>
        </div>

        {/* Queries List */}
        {sortedQueries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No queries yet
            </h3>
            <p className="text-gray-600">
              Start asking questions from your course learning pages to see them here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedQueries.map((query) => {
              const lastMessage = query.messages[query.messages.length - 1];
              const hasNewReply =
                lastMessage.sender === "instructor" && query.status === "open";

              return (
                <div
                  key={query.id}
                  className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all hover:shadow-md ${
                    hasNewReply ? "border-blue-200 bg-blue-50/30" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {query.subject}
                        </h3>
                        {hasNewReply && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            New Reply
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            query.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {query.status === "resolved" ? "Resolved" : "Open"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{query.courseTitle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(query.lastUpdated).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {query.messages[0].content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {query.messages.length} message
                          {query.messages.length !== 1 ? "s" : ""}
                        </div>
                        <button
                          onClick={() => handleViewQuery(query.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View Conversation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Query Modal */}
      {isModalOpen && selectedQueryId && (
        <StudentQueryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          existingQueryId={selectedQueryId}
        />
      )}
    </div>
  );
}

