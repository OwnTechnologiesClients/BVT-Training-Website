// API service utility for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api';

// Log API URL in development for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('API Base URL:', API_BASE_URL);
}

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

// Base fetch function with error handling
const apiRequest = async (endpoint, options = {}, skipJsonParsing = false) => {
  console.log('🌐 apiRequest called');
  console.log('🌐 Endpoint:', endpoint);
  console.log('🌐 Options:', options);
  console.log('🌐 API Base URL:', API_BASE_URL);

  const token = getToken();
  const isFormData = options.body instanceof FormData;

  console.log('🌐 Token exists:', !!token);
  console.log('🌐 Is FormData:', isFormData);

  const config = {
    ...options,
    headers: {
      // Don't set Content-Type for FormData (browser will set it with boundary)
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  console.log('🌐 Request config:', {
    method: config.method,
    headers: config.headers,
    hasBody: !!config.body
  });

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('🌐 Full URL:', url);
    console.log('🌐 Making fetch request...');

    const fetchStartTime = Date.now();
    const response = await fetch(url, config);
    const fetchEndTime = Date.now();

    console.log('🌐 Fetch response received');
    console.log('🌐 Response time:', fetchEndTime - fetchStartTime, 'ms');
    console.log('🌐 Response status:', response.status);
    console.log('🌐 Response statusText:', response.statusText);
    console.log('🌐 Response ok:', response.ok);
    console.log('🌐 Response headers:', Object.fromEntries(response.headers.entries()));

    // Handle network errors (no response from server)
    if (!response) {
      throw new Error(`Unable to connect to server. Please ensure the backend is running at ${API_BASE_URL}`);
    }

    // Try to parse JSON, but handle cases where response might not be JSON
    let data;
    const contentType = response.headers.get('content-type');
    console.log('🌐 Content-Type:', contentType);

    if (contentType && contentType.includes('application/json')) {
      console.log('🌐 Parsing JSON response...');
      data = await response.json();
      console.log('🌐 Parsed JSON data:', data);
      console.log('🌐 Data type:', typeof data);
      console.log('🌐 Data keys:', data ? Object.keys(data) : 'null');
    } else if (skipJsonParsing) {
      console.log('🌐 Skipping JSON parsing, reading as text...');
      // If skipJsonParsing is true, return response as-is
      const text = await response.text();
      console.log('🌐 Text response:', text);
      try {
        data = JSON.parse(text);
        console.log('🌐 Parsed text as JSON:', data);
      } catch {
        data = { message: text };
        console.log('🌐 Text not JSON, using as message:', data);
      }
    } else {
      console.log('🌐 Non-JSON response, reading as text...');
      const text = await response.text();
      console.log('🌐 Text response:', text);
      throw new Error(`Server returned non-JSON response: ${text}`);
    }

    console.log('🌐 Checking response.ok:', response.ok);
    console.log('🌐 Response status:', response.status);

    if (!response.ok) {
      console.log('🌐 Response not OK, handling error...');
      console.log('🌐 Error data:', data);

      // Handle 401 (Unauthorized) - token expired or invalid
      // Only auto-logout if it's a clear authentication failure, not permission issues
      if (response.status === 401) {
        console.log('🌐 401 Unauthorized response');
        const errorMessage = data.message || '';

        // Check if we actually sent a token - if we did, backend errors might be permission issues
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
              console.log('AuthContext not available, token cleared from localStorage');
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
      console.error('🌐 Throwing error:', data.message || `Server error: ${response.status} ${response.statusText}`);
      throw new Error(data.message || `Server error: ${response.status} ${response.statusText}`);
    }

    console.log('🌐 Request successful, returning data');
    console.log('🌐 Final data:', data);
    return data;
  } catch (error) {
    // Handle network errors (fetch failed)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        `Network error: Unable to connect to backend server at ${API_BASE_URL}. ` +
        `Please ensure:\n` +
        `1. The backend server is running\n` +
        `2. The API URL is correct (currently: ${API_BASE_URL})\n` +
        `3. CORS is properly configured on the backend`
      );
    }
    // Re-throw other errors
    throw error;
  }
};

// Export token and student management functions
export { getToken, setToken, removeToken, getStudent, setStudent, apiRequest };

