// Inquiries API module - Main Frontend
// Only create inquiry function is needed here
// All admin functions (getAll, update, delete, stats) will be in the admin panel
import { apiRequest } from '../api.js';

/**
 * Create a new inquiry (public - no auth required)
 * @param {Object} inquiryData - Inquiry data (fullName, email, phone, inquiryType, message)
 */
export const createInquiry = async (inquiryData) => {
  try {
    const response = await apiRequest('/inquiries/create', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });

    return response;
  } catch (error) {
    console.error('Error creating inquiry:', error);
    throw error;
  }
};

