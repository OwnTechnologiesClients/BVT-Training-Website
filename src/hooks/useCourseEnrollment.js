// Hook to check course enrollment status
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getEnrollmentStatus } from '@/lib/api/enrollment';

/**
 * Custom hook to check if user is enrolled in a course
 * @param {string} courseId - Course ID
 * @returns {Object} { isEnrolled, enrollment, loading, error, refetch }
 */
export const useCourseEnrollment = (courseId) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(false); // Start as false, set to true only when needed
  const [error, setError] = useState(null);

  const fetchEnrollmentStatus = useCallback(async () => {
    // If no course ID provided, don't check enrollment
    if (!courseId) {
      setLoading(false);
      return;
    }

    // Don't check enrollment if user is not authenticated
    // Just set loading to false and return early
    if (!isAuthenticated) {
      setIsEnrolled(false);
      setEnrollment(null);
      setLoading(false);
      return;
    }

    // Wait for auth to finish loading before checking enrollment
    if (authLoading) {
      setLoading(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const status = await getEnrollmentStatus(courseId);
      setIsEnrolled(status.isEnrolled);
      setEnrollment(status.enrollment);
    } catch (err) {
      // Silently handle errors - enrollment check failures shouldn't block the page
      // Only log if it's not an auth-related error
      if (!err.message?.includes('token') && !err.message?.includes('Unauthorized')) {
        console.error('Error fetching enrollment status:', err);
      }
      setError(null); // Don't set error to avoid blocking UI
      setIsEnrolled(false);
      setEnrollment(null);
    } finally {
      setLoading(false);
    }
  }, [courseId, isAuthenticated, authLoading]);

  useEffect(() => {
    fetchEnrollmentStatus();
  }, [courseId, isAuthenticated, authLoading, fetchEnrollmentStatus]);

  // Function to update enrollment state directly (without API call)
  const updateEnrollment = (newEnrollment) => {
    setEnrollment(newEnrollment);
  };

  return {
    isEnrolled,
    enrollment,
    loading: loading || authLoading,
    error,
    refetch: fetchEnrollmentStatus,
    updateEnrollment
  };
};

