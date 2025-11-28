import { apiRequest } from '../api.js';

/**
 * Get all tests for a course
 * @param {string} courseId - Course ID
 * @param {boolean} isActive - Filter by active status (default: true)
 * @returns {Promise} API response
 */
export const getTestsByCourse = async (courseId, isActive = true) => {
  return await apiRequest(`/tests/course/${courseId}?isActive=${isActive}`, {
    method: 'GET',
  });
};

/**
 * Get a single test by ID
 * @param {string} testId - Test ID
 * @returns {Promise} API response
 */
export const getTestById = async (testId) => {
  return await apiRequest(`/tests/${testId}`, {
    method: 'GET',
  });
};

/**
 * Submit test answers
 * @param {string} testId - Test ID
 * @param {Array} answers - Array of { questionId, answer }
 * @returns {Promise} API response with test results
 */
export const submitTest = async (testId, answers) => {
  return await apiRequest(`/tests/submit/${testId}`, {
    method: 'POST',
    body: JSON.stringify({ answers }),
  });
};

/**
 * Get test attempts for a course
 * @param {string} courseId - Course ID
 * @returns {Promise} API response with test attempts
 */
export const getCourseTestAttempts = async (courseId) => {
  return await apiRequest(`/tests/attempts/course/${courseId}`, {
    method: 'GET',
  });
};

/**
 * Get test results for a specific test
 * @param {string} testId - Test ID
 * @returns {Promise} API response with test results
 */
export const getTestResults = async (testId) => {
  return await apiRequest(`/tests/results/${testId}`, {
    method: 'GET',
  });
};

