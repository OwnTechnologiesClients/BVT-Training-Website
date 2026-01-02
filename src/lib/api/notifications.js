// Notifications API module
import { apiRequest } from '../api';

/**
 * Get all notifications for the logged-in student
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 */
export const getNotifications = async (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  
  const queryString = queryParams.toString();
  const endpoint = `/notifications${queryString ? `?${queryString}` : ''}`;
  
  return await apiRequest(endpoint, {
    method: 'GET',
  });
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async () => {
  return await apiRequest('/notifications/unread-count', {
    method: 'GET',
  });
};

/**
 * Mark a notification as read
 * @param {string} notificationId - Notification ID
 */
export const markAsRead = async (notificationId) => {
  return await apiRequest(`/notifications/${notificationId}/read`, {
    method: 'PUT',
  });
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async () => {
  return await apiRequest('/notifications/mark-all-read', {
    method: 'PUT',
  });
};

/**
 * Delete/clear a notification
 * @param {string} notificationId - Notification ID
 */
export const deleteNotification = async (notificationId) => {
  return await apiRequest(`/notifications/${notificationId}`, {
    method: 'DELETE',
  });
};

