"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import * as queryAPI from "@/lib/api/studentQuery";

const QueryContext = createContext(null);

export const QueryProvider = ({ children }) => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all queries on mount - only once
  // Use a ref to track if we've already fetched to prevent re-fetching on remounts
  const hasFetchedRef = useRef(false);
  
  useEffect(() => {
    // Only fetch if we haven't fetched before and queries array is empty
    if (hasFetchedRef.current || queries.length > 0) {
      return;
    }

    const fetchQueries = async () => {
      try {
        setLoading(true);
        hasFetchedRef.current = true;
        const response = await queryAPI.getAllQueries();
        if (response.success && response.data) {
          setQueries(response.data.queries || []);
        }
      } catch (error) {
        setQueries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, [queries.length]);

  // Get current student's queries
  const studentQueries = useMemo(() => {
    return queries;
  }, [queries]);

  // Create a new query
  const createQuery = useCallback(
    async (queryData, attachments = []) => {
      try {
        setLoading(true);
        const response = await queryAPI.createQuery(queryData, attachments);
        if (response.success && response.data) {
          const newQuery = response.data.query;
          setQueries((prev) => [...prev, newQuery]);
          return newQuery;
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Add a message to an existing query
  const addMessage = useCallback(async (queryId, message, attachments = []) => {
    try {
      setLoading(true);
      const response = await queryAPI.addMessage(queryId, message, attachments);
      if (response.success && response.data) {
        const updatedQuery = response.data.query;
        // Update queries list
        setQueries((prev) =>
          prev.map((query) => {
            const queryIdStr = query._id?.toString() || query._id;
            const targetIdStr = queryId?.toString() || queryId;
            return queryIdStr === targetIdStr ? updatedQuery : query;
          })
        );
        return updatedQuery;
      } else {
        throw new Error(response.message || "Failed to add message");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get query by ID
  const getQuery = useCallback(
    async (queryId) => {
      // First check local state
      const localQuery = queries.find((q) => {
        const qIdStr = q._id?.toString() || q._id;
        const targetIdStr = queryId?.toString() || queryId;
        return qIdStr === targetIdStr;
      });
      if (localQuery) return localQuery;

      // If not found, fetch from API
      try {
        const response = await queryAPI.getQueryById(queryId);
        if (response.success && response.data) {
          const fetchedQuery = response.data.query;
          // Update local state with fetched query
          setQueries((prev) => {
            const exists = prev.some((q) => {
              const qIdStr = q._id?.toString() || q._id;
              const targetIdStr = fetchedQuery._id?.toString() || fetchedQuery._id;
              return qIdStr === targetIdStr;
            });
            if (!exists) {
              return [...prev, fetchedQuery];
            }
            return prev.map((q) => {
              const qIdStr = q._id?.toString() || q._id;
              const targetIdStr = fetchedQuery._id?.toString() || fetchedQuery._id;
              return qIdStr === targetIdStr ? fetchedQuery : q;
            });
          });
          return fetchedQuery;
        }
      } catch (error) {
        // Error fetching query
      }
      return null;
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
      loading,
    }),
    [queries, studentQueries, createQuery, addMessage, getQuery, loading]
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

