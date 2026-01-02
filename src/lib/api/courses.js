// Courses API module
import { apiRequest } from '../api.js';

/**
 * Get all courses with filters, search, and pagination
 * @param {Object} params - Query parameters (page, limit, search, category, status, etc.)
 */
export const getAllCourses = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.search) queryParams.append('search', params.search);
  if (params.category) queryParams.append('category', params.category);
  if (params.status) queryParams.append('status', params.status);
  if (params.isOnline !== undefined) queryParams.append('isOnline', params.isOnline);
  if (params.sort_column) queryParams.append('sort_column', params.sort_column);
  if (params.sort_direction) queryParams.append('sort_direction', params.sort_direction);

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/courses/list?${queryString}` : '/courses/list';
  
  return await apiRequest(endpoint, {
    method: 'GET',
  });
};

/**
 * Get course by ID
 * @param {string} courseId - Course ID
 */
export const getCourseById = async (courseId) => {
  return await apiRequest(`/courses/list/${courseId}`, {
    method: 'GET',
  });
};

/**
 * Get course by slug
 * @param {string} slug - Course slug
 */
export const getCourseBySlug = async (slug) => {
  try {
    // Try to fetch by slug first
    const response = await apiRequest(`/courses/slug/${slug}`, {
      method: 'GET',
    });
    
    if (response.success && response.data) {
      return response;
    }
    
    // If not found by slug, try direct ID lookup (slug might be an ID)
    try {
      return await getCourseById(slug);
    } catch {
      throw new Error('Course not found');
    }
  } catch (error) {
    // If slug endpoint fails, try ID lookup as fallback
    try {
      return await getCourseById(slug);
    } catch {
      throw new Error(error.message || 'Failed to fetch course');
    }
  }
};

/**
 * Get course structure with chapters, lessons, and content
 * This should only be accessible if user is enrolled
 * @param {string} courseId - Course ID
 */
export const getCourseStructure = async (courseId) => {
  return await apiRequest(`/courses/structure/${courseId}`, {
    method: 'GET',
  });
};

/**
 * Get featured courses
 */
export const getFeaturedCourses = async () => {
  return await apiRequest('/courses/featured', {
    method: 'GET',
  });
};

/**
 * Get courses by category
 * @param {string} categoryId - Category ID
 */
export const getCoursesByCategory = async (categoryId) => {
  return await apiRequest(`/courses/category/${categoryId}`, {
    method: 'GET',
  });
};

/**
 * Search courses
 * @param {string} searchQuery - Search query
 * @param {Object} filters - Additional filters
 */
export const searchCourses = async (searchQuery, filters = {}) => {
  const params = {
    search: searchQuery,
    ...filters
  };
  
  return await getAllCourses(params);
};

