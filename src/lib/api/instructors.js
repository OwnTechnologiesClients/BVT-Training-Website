// Instructors API module
import { apiRequest } from '../api.js';

/**
 * Get all active instructors (public endpoint)
 */
export const getActiveInstructors = async () => {
  return await apiRequest('/instructors/active', {
    method: 'GET',
  });
};

/**
 * Get instructor by ID
 * @param {string} instructorId - Instructor ID
 */
export const getInstructorById = async (instructorId) => {
  return await apiRequest(`/instructors/list/${instructorId}`, {
    method: 'GET',
  });
};

/**
 * Get instructor by slug
 * @param {string} slug - Instructor slug
 */
export const getInstructorBySlug = async (slug) => {
  try {
    const response = await apiRequest(`/instructors/slug/${slug}`, {
      method: 'GET',
    });
    
    // Check if response indicates not found
    if (response && !response.success && response.message) {
      const error = new Error(response.message);
      error.response = { status: 404 };
      throw error;
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching instructor by slug:', error);
    // If it's a 404, provide a clearer message
    if (error.response?.status === 404 || error.message?.includes('not found')) {
      const notFoundError = new Error('Instructor not found');
      notFoundError.response = { status: 404 };
      throw notFoundError;
    }
    throw error;
  }
};

/**
 * Get instructors by department
 * @param {string} department - Department name
 */
export const getInstructorsByDepartment = async (department) => {
  return await apiRequest(`/instructors/department/${department}`, {
    method: 'GET',
  });
};

/**
 * Search instructors
 * @param {string} searchQuery - Search query
 */
export const searchInstructors = async (searchQuery) => {
  return await apiRequest(`/instructors/search?q=${encodeURIComponent(searchQuery)}`, {
    method: 'GET',
  });
};

