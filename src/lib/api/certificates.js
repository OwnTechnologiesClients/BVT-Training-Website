// Certificates API module
import { apiRequest } from '../api.js';

/**
 * Get certificates for the logged-in student
 */
export const getMyCertificates = async () => {
  return await apiRequest('/certificates/my-certificates', {
    method: 'GET'
  });
};
