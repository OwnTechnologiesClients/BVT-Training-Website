// Password Reset & Email Verification API module for students
import { apiRequest } from '../api';

// ============================================
// PASSWORD RESET APIs
// ============================================

/**
 * Send forgot password OTP for student
 * @param {string} email - Student email
 */
export const sendForgotPasswordOTP = async (email) => {
  return await apiRequest('/password/student/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

/**
 * Verify password reset OTP for student
 * @param {string} email - Student email
 * @param {string} otp - OTP code
 */
export const verifyPasswordOTP = async (email, otp) => {
  return await apiRequest('/password/student/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ email, otp }),
  });
};

/**
 * Reset password for student
 * @param {string} email - Student email
 * @param {string} newPassword - New password
 */
export const resetPassword = async (email, newPassword) => {
  return await apiRequest('/password/student/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, newPassword }),
  });
};

// ============================================
// EMAIL VERIFICATION APIs (for registration)
// ============================================

/**
 * Send email verification OTP
 * @param {string} email - Student email
 */
export const sendVerificationOTP = async (email) => {
  return await apiRequest('/password/verify-email/send-otp', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

/**
 * Verify email OTP only (for multi-step registration)
 * @param {string} email - Student email
 * @param {string} otp - OTP code
 */
export const verifyEmailOTP = async (email, otp) => {
  return await apiRequest('/password/verify-email/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ email, otp }),
  });
};

/**
 * Verify email and complete registration
 * @param {Object} data - Registration data with email, otp, password, fullName, phone, address
 */
export const verifyEmailAndRegister = async (data) => {
  return await apiRequest('/password/verify-email/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Resend verification OTP
 * @param {string} email - Student email
 */
export const resendVerificationOTP = async (email) => {
  return await apiRequest('/password/verify-email/resend-otp', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

