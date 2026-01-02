// Programs API module
import { apiRequest } from '../api.js';

/**
 * Get all programs with filters, search, and pagination
 * @param {Object} params - Query parameters (page, limit, search, category, status, etc.)
 */
export const getAllPrograms = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.search) queryParams.append('search', params.search);
  if (params.category) queryParams.append('category', params.category);
  if (params.status) queryParams.append('status', params.status);
  if (params.sort_column) queryParams.append('sort_column', params.sort_column);
  if (params.sort_direction) queryParams.append('sort_direction', params.sort_direction);

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/programs/list?${queryString}` : '/programs/list';
  
  return await apiRequest(endpoint, {
    method: 'GET',
  });
};

/**
 * Get program by ID
 * @param {string} programId - Program ID
 */
export const getProgramById = async (programId) => {
  return await apiRequest(`/programs/list/${programId}`, {
    method: 'GET',
  });
};

/**
 * Get featured programs
 */
export const getFeaturedPrograms = async () => {
  const response = await getAllPrograms({ limit: 10, status: 'active' });
  return response;
};

/**
 * Search programs
 * @param {string} searchQuery - Search query
 * @param {Object} filters - Additional filters
 */
export const searchPrograms = async (searchQuery, filters = {}) => {
  const params = {
    search: searchQuery,
    ...filters
  };
  
  return await getAllPrograms(params);
};

