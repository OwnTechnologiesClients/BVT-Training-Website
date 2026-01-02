// Course Categories API module
import { apiRequest } from '../api.js';

/**
 * Get all active categories (for public use)
 */
export const getActiveCategories = async () => {
  return await apiRequest('/course-categories/active', {
    method: 'GET',
  });
};

/**
 * Get category statistics including course counts
 */
export const getCategoryStats = async () => {
  return await apiRequest('/course-categories/stats', {
    method: 'GET',
  });
};

/**
 * Get category by ID
 * @param {string} categoryId - Category ID
 */
export const getCategoryById = async (categoryId) => {
  return await apiRequest(`/course-categories/list/${categoryId}`, {
    method: 'GET',
  });
};

/**
 * Get category by slug
 * @param {string} slug - Category slug
 */
export const getCategoryBySlug = async (slug) => {
  return await apiRequest(`/course-categories/slug/${slug}`, {
    method: 'GET',
  });
};

