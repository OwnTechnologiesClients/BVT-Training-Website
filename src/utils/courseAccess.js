// Course access utility functions
import { getEnrollmentStatus } from '@/lib/api/enrollment';

/**
 * Get access level for a course
 * @param {string} courseId - Course ID
 * @param {boolean} isAuthenticated - Whether user is logged in
 * @returns {Promise<Object>} { level: 'none' | 'view' | 'learn', enrollment: null | Object }
 */
export const getAccessLevel = async (courseId, isAuthenticated) => {
  if (!isAuthenticated || !courseId) {
    return {
      level: 'none',
      enrollment: null,
      canView: false,
      canLearn: false
    };
  }

  try {
    const status = await getEnrollmentStatus(courseId);
    
    if (status.isEnrolled && status.status === 'active') {
      return {
        level: 'learn',
        enrollment: status.enrollment,
        canView: true,
        canLearn: true
      };
    } else if (status.isEnrolled) {
      return {
        level: 'view',
        enrollment: status.enrollment,
        canView: true,
        canLearn: false
      };
    } else {
      return {
        level: 'none',
        enrollment: null,
        canView: false,
        canLearn: false
      };
    }
  } catch (error) {
    console.error('Error checking course access:', error);
    return {
      level: 'none',
      enrollment: null,
      canView: false,
      canLearn: false
    };
  }
};

/**
 * Check if user can access course content
 * @param {string} courseId - Course ID
 * @param {boolean} isAuthenticated - Whether user is logged in
 * @returns {Promise<boolean>} Whether user can access course
 */
export const checkCourseAccess = async (courseId, isAuthenticated) => {
  if (!isAuthenticated || !courseId) {
    return false;
  }

  try {
    const status = await getEnrollmentStatus(courseId);
    return status.isEnrolled && status.status === 'active';
  } catch (error) {
    console.error('Error checking course access:', error);
    return false;
  }
};

