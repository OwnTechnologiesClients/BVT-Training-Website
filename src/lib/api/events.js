// Events API module
import { apiRequest } from '../api.js';

/**
 * Map frontend event type names to backend eventType values
 * Backend supports: 'conference', 'workshop', 'seminar', 'training', 'meeting'
 */
export const mapEventTypeToBackend = (frontendType) => {
  // Handle different type formats: object, string, or null/undefined
  let typeValue = frontendType;
  
  // If type is an object (populated from backend), extract the name or slug
  if (frontendType && typeof frontendType === 'object') {
    typeValue = frontendType.slug || frontendType.name || frontendType.type || frontendType._id || null;
  }
  
  // If still not a string, return as is
  if (!typeValue || typeof typeValue !== 'string') {
    return frontendType;
  }
  
  const typeMap = {
    'conferences': 'conference',
    'workshops': 'workshop',
    'competitions': 'training',
    'drills-exercises': 'training',
    'seminars': 'seminar',
    'tech-demonstrations': 'training',
    'conference': 'conference',
    'workshop': 'workshop',
    'seminar': 'seminar',
    'training': 'training',
    'meeting': 'meeting'
  };
  
  return typeMap[typeValue.toLowerCase()] || typeValue;
};

/**
 * Get all events with filters, search, and pagination
 * @param {Object} params - Query parameters (page, limit, search, eventType, status, etc.)
 */
export const getAllEvents = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.search) queryParams.append('search', params.search);
  if (params.eventType) queryParams.append('eventType', params.eventType);
  if (params.type) {
    // Support both 'type' and 'eventType' for backward compatibility
    const backendType = mapEventTypeToBackend(params.type);
    queryParams.append('eventType', backendType);
  }
  if (params.status) queryParams.append('status', params.status);
  if (params.sort_column) queryParams.append('sort_column', params.sort_column);
  if (params.sort_direction) queryParams.append('sort_direction', params.sort_direction);

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/events/list?${queryString}` : '/events/list';
  
  return await apiRequest(endpoint, {
    method: 'GET',
  });
};

/**
 * Get event by ID
 * @param {string} eventId - Event ID
 */
export const getEventById = async (eventId) => {
  return await apiRequest(`/events/list/${eventId}`, {
    method: 'GET',
  });
};

/**
 * Register for an event
 * @param {string} eventId - Event ID
 */
export const registerForEvent = async (eventId) => {
  return await apiRequest('/events/register', {
    method: 'POST',
    body: JSON.stringify({ eventId }),
  });
};

/**
 * Get student's registered events
 */
export const getMyRegisteredEvents = async () => {
  return await apiRequest('/events/my-registered', {
    method: 'GET',
  });
};

/**
 * Get event by slug
 * @param {string} slug - Event slug
 */
export const getEventBySlug = async (slug) => {
  try {
    const response = await apiRequest(`/events/slug/${slug}`, {
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
    if (error.response?.status === 404 || error.message?.includes('not found')) {
      const notFoundError = new Error('Event not found');
      notFoundError.response = { status: 404 };
      throw notFoundError;
    }
    throw error;
  }
};

/**
 * Get featured events (upcoming published/ongoing events)
 */
export const getFeaturedEvents = async () => {
  const response = await getUpcomingEvents({ limit: 10 });
  return response;
};

/**
 * Search events
 * @param {string} searchQuery - Search query
 * @param {Object} filters - Additional filters
 */
export const searchEvents = async (searchQuery, filters = {}) => {
  const params = {
    search: searchQuery,
    ...filters
  };
  
  return await getAllEvents(params);
};

/**
 * Get events by type (frontend type name)
 * @param {string} frontendType - Frontend type name (e.g., 'conferences', 'workshops')
 * @param {Object} params - Additional query parameters
 */
export const getEventsByType = async (frontendType, params = {}) => {
  const backendType = mapEventTypeToBackend(frontendType);
  return await getAllEvents({
    eventType: backendType,
    ...params
  });
};

/**
 * Get event count by type
 * @param {string} frontendType - Frontend type name
 */
export const getEventCountByType = async (frontendType) => {
  try {
    const backendType = mapEventTypeToBackend(frontendType);
    const response = await getAllEvents({
      eventType: backendType,
      limit: 1,
      page: 1
    });
    
    if (response.success && response.pagination) {
      return response.pagination.total || 0;
    }
    return 0;
  } catch (error) {
    return 0;
  }
};

/**
 * Get upcoming events (published/ongoing events with future start dates)
 * @param {Object} params - Query parameters (limit, etc.)
 */
export const getUpcomingEvents = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.limit) queryParams.append('limit', params.limit);

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/events/upcoming?${queryString}` : '/events/upcoming';
  
  return await apiRequest(endpoint, {
    method: 'GET',
  });
};

