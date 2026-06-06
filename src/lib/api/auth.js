// Auth API module for student authentication
import { apiRequest, setStudent, clearLegacyAuth } from '../api.js';

export const studentLogin = async (email, password) => {
  clearLegacyAuth();
  const response = await apiRequest('/auth/student/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (response.success && response.data) {
    setStudent(response.data.student);
    return response;
  }
  throw new Error(response.message || 'Login failed');
};

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

export const studentLogout = async () => {
  try {
    await apiRequest('/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearLegacyAuth();
  }
};

export const getStudentProfile = async () => {
  return await apiRequest('/students/profile', {
    method: 'GET',
  });
};

export const googleAuth = async (idToken, userData = {}) => {
  clearLegacyAuth();
  const response = await apiRequest('/auth/google', {
    method: 'POST',
    body: JSON.stringify({
      idToken,
      ...userData,
    }),
  });

  if (response.success && response.data) {
    if (response.data.student) {
      setStudent(response.data.student);
    }
    return response;
  }
  throw new Error(response.message || 'Google authentication failed');
};
