// Student Query API module
import { apiRequest } from '../api.js';

/**
 * Get all queries for the current student
 * @param {Object} params - Query parameters (page, limit, status, courseId)
 */
export const getAllQueries = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.status) queryParams.append('status', params.status);
  if (params.courseId) queryParams.append('courseId', params.courseId);

  const queryString = queryParams.toString();
  const endpoint = `/queries/my-queries${queryString ? `?${queryString}` : ''}`;
  
  return await apiRequest(endpoint, {
    method: 'GET',
  });
};

/**
 * Get query by ID
 * @param {string} queryId - Query ID
 */
export const getQueryById = async (queryId) => {
  return await apiRequest(`/queries/my-queries/${queryId}`, {
    method: 'GET',
  });
};

/**
 * Create a new query with optional file attachments
 * @param {Object} queryData - Query data (courseId, lessonId, subject, message)
 * @param {File[]} attachments - Array of files to attach
 */
export const createQuery = async (queryData, attachments = []) => {
  const formData = new FormData();
  
  formData.append('courseId', queryData.courseId);
  if (queryData.lessonId) {
    formData.append('lessonId', queryData.lessonId);
  }
  formData.append('subject', queryData.subject);
  formData.append('message', queryData.message);
  
  // Append attachments
  attachments.forEach((file, index) => {
    formData.append('attachments', file);
  });
  
  return await apiRequest('/queries', {
    method: 'POST',
    body: formData,
  }, true); // Skip JSON parsing for FormData
};

/**
 * Add a message to an existing query with optional file attachments
 * @param {string} queryId - Query ID
 * @param {string} content - Message content
 * @param {File[]} attachments - Array of files to attach
 */
export const addMessage = async (queryId, content, attachments = []) => {
  const formData = new FormData();
  
  formData.append('content', content);
  
  // Append attachments
  attachments.forEach((file) => {
    formData.append('attachments', file);
  });
  
  return await apiRequest(`/queries/my-queries/${queryId}/messages`, {
    method: 'POST',
    body: formData,
  }, true); // Skip JSON parsing for FormData
};

