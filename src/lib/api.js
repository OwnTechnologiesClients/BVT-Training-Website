// API service utility for backend communication
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const getStudent = () => {
  if (typeof window !== 'undefined') {
    const studentStr = sessionStorage.getItem('student');
    return studentStr ? JSON.parse(studentStr) : null;
  }
  return null;
};

const setStudent = (student) => {
  if (typeof window !== 'undefined') {
    if (student) {
      sessionStorage.setItem('student', JSON.stringify(student));
    } else {
      sessionStorage.removeItem('student');
    }
  }
};

const clearLegacyAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    sessionStorage.removeItem('student');
  }
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      throw new Error(
        `Network error: Unable to connect to backend server at ${API_BASE_URL}. ` +
        `Please ensure the backend server is running and CORS/cookies are configured.`
      );
    }

    const response = error.response;
    const data = response.data || {};
    const errorMessage = data.message || '';
    const status = response.status;

    if (status === 401) {
      const isTokenError =
        errorMessage.includes('Invalid token') ||
        errorMessage.includes('token expired') ||
        errorMessage.includes('Token is valid but user no longer exists') ||
        errorMessage.includes('user no longer exists') ||
        errorMessage.includes('No token provided') ||
        (errorMessage.includes('jwt') && (errorMessage.includes('expired') || errorMessage.includes('invalid')));

      const isPermissionError =
        errorMessage.includes('enrolled') ||
        errorMessage.includes('Enrolled') ||
        errorMessage.includes('enrollment') ||
        errorMessage.includes('permission') ||
        errorMessage.includes('Permission') ||
        errorMessage.includes('required role') ||
        errorMessage.includes('deactivated') ||
        errorMessage.includes('Access denied');

      if (isTokenError && !isPermissionError) {
        clearLegacyAuth();

        if (typeof window !== 'undefined') {
          import('@/context/AuthContext').then(({ clearAuthState }) => {
            clearAuthState();
          }).catch(() => {});

          const pathname = window.location.pathname;
          const isProtectedRoute = pathname.includes('/learn') ||
            pathname.includes('/billing') ||
            pathname.includes('/dashboard') ||
            pathname.includes('/admin');

          if (isProtectedRoute && !pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
      }
    }

    throw new Error(errorMessage || `Server error: ${status} ${response.statusText}`);
  }
);

const apiRequest = async (endpoint, options = {}, skipJsonParsing = false) => {
  try {
    const method = options.method || 'GET';

    const config = {
      method,
      url: endpoint,
    };

    if (options.headers) {
      config.headers = options.headers;
    }

    if (options.body) {
      if (options.body instanceof FormData) {
        config.data = options.body;
        if (!config.headers) config.headers = {};
        delete config.headers['Content-Type'];
      } else if (typeof options.body === 'string') {
        try {
          config.data = JSON.parse(options.body);
          if (!config.headers) config.headers = {};
          config.headers['Content-Type'] = 'application/json';
        } catch {
          config.data = options.body;
        }
      } else {
        config.data = options.body;
        if (!config.headers) config.headers = {};
        config.headers['Content-Type'] = 'application/json';
      }
    }

    const { method: _, body: __, headers: ___, ...otherOptions } = options;
    Object.assign(config, otherOptions);

    const response = await axiosInstance.request(config);
    return skipJsonParsing ? response : response;
  } catch (error) {
    throw error;
  }
};

export { getStudent, setStudent, clearLegacyAuth, apiRequest };
