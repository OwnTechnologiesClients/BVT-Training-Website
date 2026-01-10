// Student API module
import { apiRequest } from '../api.js';

/**
 * Check if student profile is complete
 * @returns {Promise<Object>} Response with profile completion status
 */
export const checkProfileCompletion = async () => {
  return await apiRequest('/students/profile/check', {
    method: 'GET',
  });
};

/**
 * Complete student profile (for Google auth users)
 * @param {Object} profileData - Profile data (fullName, phone, countryCode, address, etc.)
 * @returns {Promise<Object>} Response with updated student data
 */
export const completeProfile = async (profileData) => {
  return await apiRequest('/students/profile/complete', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

/**
 * Verify phone number using Firebase ID token and save to student record
 * @param {string} idToken - Firebase ID token from phone verification
 * @param {string} phoneNumber - Phone number (without country code)
 * @param {string} countryCode - Country code (e.g., '+1', '+91')
 * @returns {Promise<Object>} Response with verification status
 */
export const verifyPhoneNumber = async (idToken, phoneNumber, countryCode) => {
  return await apiRequest('/students/profile/verify-phone', {
    method: 'POST',
    body: JSON.stringify({
      idToken,
      phoneNumber,
      countryCode
    }),
  });
};

/**
 * Get current student profile
 * @returns {Promise<Object>} Response with student profile data
 */
export const getStudentProfile = async () => {
  return await apiRequest('/students/profile', {
    method: 'GET',
  });
};

/**
 * Update student profile
 * @param {Object} profileData - Profile data to update (fullName, phone, countryCode, address, etc.)
 * @returns {Promise<Object>} Response with updated student data
 */
export const updateStudentProfile = async (profileData) => {
  return await apiRequest('/students/profile/complete', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};