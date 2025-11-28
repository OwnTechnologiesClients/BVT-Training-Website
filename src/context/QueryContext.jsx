"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  studentQueriesMockData,
  getStudentQueries,
  getQueryById,
} from "@/data/studentQueriesMockData";

const QueryContext = createContext(null);

// Mock current student ID - in real app, this would come from auth
const MOCK_STUDENT_ID = "stu-001";

export const QueryProvider = ({ children }) => {
  const [queries, setQueries] = useState(studentQueriesMockData);

  // Get current student's queries
  const studentQueries = useMemo(() => {
    return getStudentQueries(MOCK_STUDENT_ID);
  }, [queries]);

  // Create a new query
  const createQuery = useCallback(
    (queryData) => {
      const newQuery = {
        id: `query-${Date.now()}`,
        studentId: MOCK_STUDENT_ID,
        studentName: "Lieutenant Marcus Allen", // Mock name
        courseId: queryData.courseId,
        courseTitle: queryData.courseTitle || "Course",
        lessonId: queryData.lessonId,
        lessonTitle: queryData.lessonTitle || "Lesson",
        subject: queryData.subject,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: "student",
            senderName: "Lieutenant Marcus Allen",
            content: queryData.message,
            timestamp: new Date().toISOString(),
          },
        ],
        status: "open",
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      setQueries((prev) => [...prev, newQuery]);
      return newQuery;
    },
    []
  );

  // Add a message to an existing query
  const addMessage = useCallback((queryId, message, sender = "student") => {
    setQueries((prev) =>
      prev.map((query) => {
        if (query.id === queryId) {
          const newMessage = {
            id: `msg-${Date.now()}`,
            sender,
            senderName:
              sender === "student"
                ? "Lieutenant Marcus Allen"
                : "Commander Sarah Johnson",
            content: message,
            timestamp: new Date().toISOString(),
          };
          return {
            ...query,
            messages: [...query.messages, newMessage],
            lastUpdated: new Date().toISOString(),
          };
        }
        return query;
      })
    );
  }, []);

  // Get query by ID
  const getQuery = useCallback(
    (queryId) => {
      return queries.find((q) => q.id === queryId);
    },
    [queries]
  );

  const value = useMemo(
    () => ({
      queries,
      studentQueries,
      createQuery,
      addMessage,
      getQuery,
    }),
    [queries, studentQueries, createQuery, addMessage, getQuery]
  );

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
};

export const useQuery = () => {
  const context = useContext(QueryContext);

  if (!context) {
    throw new Error("useQuery must be used within a QueryProvider");
  }

  return context;
};

