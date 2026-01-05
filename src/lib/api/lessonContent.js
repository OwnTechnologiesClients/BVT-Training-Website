// Lesson Content API module
import { apiRequest } from '../api.js';

/**
 * Refresh expired video URL (get new pre-signed URL)
 * @param {string} contentId - Lesson content ID
 * @returns {Promise<Object>} Response with new video URL
 */
export const refreshVideoUrl = async (contentId) => {
  return await apiRequest(`/lesson-content/refresh-video/${contentId}`, {
    method: 'POST',
  });
};

