// Auth API module for student authentication
import { apiRequest, setToken, setStudent, removeToken } from '../api.js';

/**
 * Student login
 * @param {string} email - Student email
 * @param {string} password - Student password
 */
export const studentLogin = async (email, password) => {
  const response = await apiRequest('/auth/student/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (response.success && response.data) {
    setToken(response.data.token);
    setStudent(response.data.student);
    return response;
  }
  throw new Error(response.message || 'Login failed');
};

/**
 * Student registration
 * @param {Object} studentData - Student registration data
 */
export const studentRegister = async (studentData) => {
  const response = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(studentData),
  });
  
  if (response.success && response.data) {
    return response;
  }
  throw new Error(response.message || 'Registration failed');
};

/**
 * Student logout
 */
export const studentLogout = async () => {
  try {
    await apiRequest('/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    // Even if logout fails on server, clear local storage
    console.error('Logout error:', error);
  } finally {
    removeToken();
  }
};

/**
 * Get student profile (if endpoint exists)
 */
export const getStudentProfile = async () => {
  return await apiRequest('/students/profile', {
    method: 'GET',
  });
};

/**
 * Google authentication (login or register)
 * @param {string} idToken - Firebase ID token
 * @param {Object} userData - Additional user data from Google (optional)
 */
export const googleAuth = async (idToken, userData = {}) => {
  const response = await apiRequest('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ 
      idToken,
      ...userData 
    }),
  });
  
  if (response.success && response.data) {
    if (response.data.token) {
      setToken(response.data.token);
    }
    if (response.data.student) {
      setStudent(response.data.student);
    }
    return response;
  }
  throw new Error(response.message || 'Google authentication failed');
};

