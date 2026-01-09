// API service utility for backend communication
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api';

// Helper function to get auth token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to set auth token in localStorage
const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Helper function to remove auth token from localStorage
const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
  }
};

// Helper function to get student from localStorage
const getStudent = () => {
  if (typeof window !== 'undefined') {
    const studentStr = localStorage.getItem('student');
    return studentStr ? JSON.parse(studentStr) : null;
  }
  return null;
};

// Helper function to set student in localStorage
const setStudent = (student) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('student', JSON.stringify(student));
  }
};

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Don't set Content-Type for FormData (browser will set it with boundary)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors with sophisticated 401 handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      throw new Error(
        `Network error: Unable to connect to backend server at ${API_BASE_URL}. ` +
        `Please ensure:\n` +
        `1. The backend server is running\n` +
        `2. The API URL is correct (currently: ${API_BASE_URL})\n` +
        `3. CORS is properly configured on the backend`
      );
    }

    const response = error.response;
    const data = response.data || {};
    const errorMessage = data.message || '';
    const status = response.status;

    if (status === 401) {
      const token = getToken();
      const hasToken = !!token;

      // Check if it's a clear token validation error (should logout)
      // Only logout on specific token errors, not on general "Access denied" messages
      const isTokenError =
        errorMessage.includes('Invalid token') ||
        errorMessage.includes('token expired') ||
        errorMessage.includes('Token is valid but user no longer exists') ||
        errorMessage.includes('user no longer exists') ||
        (errorMessage.includes('Token') && errorMessage.includes('expired')) ||
        (errorMessage.includes('jwt') && (errorMessage.includes('expired') || errorMessage.includes('invalid'))) ||
        (errorMessage.includes('JWT') && (errorMessage.includes('expired') || errorMessage.includes('invalid')));

      // Special case: "No token provided" - only logout if we actually didn't send a token
      const isNoTokenError = errorMessage.includes('No token provided');
      const shouldLogoutOnNoToken = isNoTokenError && !hasToken;

      // Check if it's an enrollment/permission error (should NOT logout)
      // Even if message contains "Access denied", if we have a token, it's likely a permission issue
      const isPermissionError =
        errorMessage.includes('enrolled') ||
        errorMessage.includes('Enrolled') ||
        errorMessage.includes('enrollment') ||
        errorMessage.includes('permission') ||
        errorMessage.includes('Permission') ||
        errorMessage.includes('required role') ||
        errorMessage.includes('deactivated') ||
        (errorMessage.includes('Access denied') && hasToken) || // If we have token, "Access denied" = permission
        (isNoTokenError && hasToken); // If we sent token but backend says no token, don't logout (might be backend issue)

      // Only logout if: 
      // 1. It's clearly a token authentication error (invalid/expired token) OR we didn't send a token
      // 2. AND it's not a permission error
      // This prevents logout when user is authenticated but gets access denied for other reasons
      if ((isTokenError || shouldLogoutOnNoToken) && !isPermissionError) {
        // Clear token from localStorage
        removeToken();

        // Clear auth state in AuthContext (if available)
        // This ensures UI updates immediately to show "Enroll Now" instead of user menu
        if (typeof window !== 'undefined') {
          // Dynamically import to avoid circular dependency
          import('@/context/AuthContext').then(({ clearAuthState }) => {
            clearAuthState();
          }).catch(() => {
            // If AuthContext is not available yet, that's okay - token is already removed
          });
        }

        // Only redirect to login if we're on a protected route
        // Don't redirect on public routes like course detail pages
        if (typeof window !== 'undefined') {
          const pathname = window.location.pathname;
          const isProtectedRoute = pathname.includes('/learn') ||
            pathname.includes('/billing') ||
            pathname.includes('/dashboard') ||
            pathname.includes('/admin');

          // Only redirect if we're on a protected route and not already on login page
          if (isProtectedRoute && !pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
      }
      // If it's a permission/enrollment error, don't logout - just throw the error
      // so the component can handle it appropriately
    }
    
    // Throw formatted error message
    throw new Error(errorMessage || `Server error: ${status} ${response.statusText}`);
  }
);

// Base axios function with error handling (maintains backward compatibility)
const apiRequest = async (endpoint, options = {}, skipJsonParsing = false) => {
  try {
    const method = options.method || 'GET';
    
    // Build config object
    const config = {
      method: method,
      url: endpoint,
    };

    // Handle headers - only set if provided or if we need to modify them
    if (options.headers) {
      config.headers = options.headers;
    }

    // Handle body - convert to data for axios
    if (options.body) {
      if (options.body instanceof FormData) {
        config.data = options.body;
        // Don't set Content-Type for FormData (browser will set it with boundary)
        // The interceptor handles this, but we ensure headers object exists if needed
        if (!config.headers) {
          config.headers = {};
        }
        delete config.headers['Content-Type'];
      } else if (typeof options.body === 'string') {
        // If body is already a string, parse it if it's JSON, otherwise use as-is
        try {
          config.data = JSON.parse(options.body);
          // Content-Type will be set by axios defaults, but ensure it's there
          if (!config.headers) {
            config.headers = {};
          }
          config.headers['Content-Type'] = 'application/json';
        } catch {
          config.data = options.body;
        }
      } else {
        config.data = options.body;
        // Content-Type will be set by axios defaults, but ensure it's there
        if (!config.headers) {
          config.headers = {};
        }
        config.headers['Content-Type'] = 'application/json';
      }
    }

    // Merge any other options (excluding method, body, headers which we've handled)
    const { method: _, body: __, headers: ___, ...otherOptions } = options;
    Object.assign(config, otherOptions);

    const response = await axiosInstance.request(config);
    
    // If skipJsonParsing, return as-is (axios already parses JSON by default)
    if (skipJsonParsing) {
      return response;
    }

    return response;
  } catch (error) {
    // Re-throw error (interceptor already handles formatting)
    throw error;
  }
};

// Export token and student management functions
export { getToken, setToken, removeToken, getStudent, setStudent, apiRequest };

