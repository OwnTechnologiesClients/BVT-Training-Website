// Enrollment API module
import { apiRequest } from '../api.js';

/**
 * Get current student's enrollments
 * Note: Backend may need to add /enrollments/my-enrollments endpoint with protectStudent middleware
 */
export const getMyEnrollments = async () => {
  return await apiRequest('/enrollments/my-enrollments', {
    method: 'GET',
  });
};

/**
 * Get student's enrollments by ID (for admin/instructor or if student endpoint doesn't exist)
 * @param {string} studentId - Student ID
 */
export const getStudentEnrollments = async (studentId) => {
  return await apiRequest(`/enrollments/student/${studentId}`, {
    method: 'GET',
  });
};

/**
 * Get enrollment by ID
 * @param {string} enrollmentId - Enrollment ID
 */
export const getEnrollmentById = async (enrollmentId) => {
  return await apiRequest(`/enrollments/${enrollmentId}`, {
    method: 'GET',
  });
};

/**
 * Get course structure with progress
 * @param {string} courseId - Course ID
 */
export const getCourseWithStructure = async (courseId) => {
  return await apiRequest(`/courses/structure/${courseId}`, {
    method: 'GET',
  });
};

/**
 * Update enrollment progress
 * @param {string} enrollmentId - Enrollment ID
 * @param {Object} progressData - Progress data (progress, lessonsCompleted, etc.)
 */
export const updateEnrollmentProgress = async (enrollmentId, progressData) => {
  return await apiRequest(`/enrollments/${enrollmentId}`, {
    method: 'PUT',
    body: JSON.stringify(progressData),
  });
};

/**
 * Enroll in a course
 * @param {string} courseId - Course ID
 */
export const enrollInCourse = async (courseId) => {
  return await apiRequest('/enrollments', {
    method: 'POST',
    body: JSON.stringify({ courseId }),
  });
};

/**
 * Check if current user is enrolled in a course
 * @param {string} courseId - Course ID
 * @returns {Object|null} Enrollment object if enrolled, null otherwise
 */
export const checkCourseEnrollment = async (courseId) => {
  try {
    if (!courseId) {
      return null;
    }

    const response = await getMyEnrollments();
    
    if (response.success && response.data && response.data.enrollments) {
      const courseIdStr = courseId.toString();
      
      const enrollment = response.data.enrollments.find((enrollment) => {
        if (!enrollment.courseId) return false;
        
        // Handle both populated and non-populated courseId
        let enrollmentCourseId;
        if (typeof enrollment.courseId === 'object' && enrollment.courseId._id) {
          // Populated courseId object
          enrollmentCourseId = enrollment.courseId._id.toString();
        } else if (typeof enrollment.courseId === 'string') {
          // Non-populated courseId (just ID string)
          enrollmentCourseId = enrollment.courseId;
        } else {
          // Try to get _id if it's an object without _id property
          enrollmentCourseId = enrollment.courseId.toString();
        }
        
        return enrollmentCourseId === courseIdStr;
      });
      
      console.log('Enrollment check result:', {
        courseId,
        foundEnrollment: !!enrollment,
        enrollmentCount: response.data.enrollments.length,
        enrollment: enrollment || null
      });
      
      return enrollment || null;
    }
    
    return null;
  } catch (error) {
    // Silently handle auth errors (401) - user is simply not authenticated
    // Only log other types of errors
    if (!error.message?.includes('token') && 
        !error.message?.includes('Unauthorized') && 
        !error.message?.includes('401')) {
      console.error('Error checking course enrollment:', error);
    }
    return null;
  }
};

/**
 * Get enrollment status for a course
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} Object with isEnrolled, enrollment, status
 */
export const getEnrollmentStatus = async (courseId) => {
  try {
    const enrollment = await checkCourseEnrollment(courseId);
    
    return {
      isEnrolled: !!enrollment,
      enrollment: enrollment || null,
      status: enrollment?.status || 'none'
    };
  } catch (error) {
    // Silently handle auth errors - user is simply not authenticated or enrolled
    // Only log unexpected errors
    if (!error.message?.includes('token') && 
        !error.message?.includes('Unauthorized') && 
        !error.message?.includes('401')) {
      console.error('Error getting enrollment status:', error);
    }
    return {
      isEnrolled: false,
      enrollment: null,
      status: 'none'
    };
  }
};

/**
 * Mark a lesson as completed
 * @param {string} enrollmentId - Enrollment ID
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<Object>} Response with success status
 */
export const markLessonComplete = async (enrollmentId, lessonId) => {
  try {
    if (!enrollmentId || !lessonId) {
      throw new Error('Enrollment ID and Lesson ID are required');
    }

    const response = await apiRequest(
      `/enrollments/${enrollmentId}/complete-lesson/${lessonId}`,
      {
        method: 'POST',
      }
    );

    return response;
  } catch (error) {
    console.error('Error marking lesson as complete:', error);
    throw error;
  }
};

