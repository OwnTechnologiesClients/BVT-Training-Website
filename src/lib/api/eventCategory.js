// Event Category API module
import { apiRequest } from '../api.js';

/**
 * Get all active event categories (themes) for public use
 */
export const getActiveEventCategories = async () => {
  return await apiRequest('/event-categories/active', {
    method: 'GET',
  });
};

/**
 * Get event category statistics including event counts
 */
export const getEventCategoryStats = async () => {
  return await apiRequest('/event-categories/stats', {
    method: 'GET',
  });
};

/**
 * Get category by ID
 * @param {string} categoryId - Category ID
 */
export const getEventCategoryById = async (categoryId) => {
  return await apiRequest(`/event-categories/list/${categoryId}`, {
    method: 'GET',
  });
};

/**
 * Get category by slug
 * @param {string} slug - Category slug
 */
export const getEventCategoryBySlug = async (slug) => {
  return await apiRequest(`/event-categories/slug/${slug}`, {
    method: 'GET',
  });
};


