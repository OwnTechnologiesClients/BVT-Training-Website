import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Create a Stripe Checkout Session
 * @param {string} itemId - The ID of the course or event
 * @param {string} itemType - 'course' or 'event'
 * @returns {Promise<Object>} The session URL or error
 */
export const createCheckoutSession = async (itemId, itemType) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/stripe/create-checkout-session`,
      { itemId, itemType },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Failed to initiate checkout' };
  }
};
