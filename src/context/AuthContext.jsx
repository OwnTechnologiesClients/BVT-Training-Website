"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { signInWithPopup } from "firebase/auth";
import { getToken, getStudent, removeToken } from "@/lib/api";
import { studentLogin, studentLogout, googleAuth } from "@/lib/api/auth";
import { auth, googleProvider } from "@/lib/firebase";

const AuthContext = createContext(null);

// Global reference to clearAuth function for use in non-React modules (like api.js)
let clearAuthRef = null;

export const AuthProvider = ({ children }) => {
  const [student, setStudentState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedStudent = getStudent();
        const token = getToken();
        
        if (storedStudent && token) {
          setStudentState(storedStudent);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        removeToken();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const response = await studentLogin(email, password);
      
      if (response.success && response.data) {
        const studentData = response.data.student;
        setStudentState(studentData);
        setIsAuthenticated(true);
        return { success: true, data: response.data };
      }
      
      throw new Error(response.message || "Login failed");
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Login failed. Please check your credentials.",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Google login function
  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      
      // Sign in with Google using Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get the ID token
      const idToken = await user.getIdToken();
      
      // Extract user data from Google
      const userData = {
        email: user.email,
        fullName: user.displayName || `${user.email?.split('@')[0]}`,
        photoURL: user.photoURL,
        phone: user.phoneNumber,
      };
      
      // Send to backend for authentication/registration
      const response = await googleAuth(idToken, userData);
      
      if (response.success && response.data) {
        const studentData = response.data.student || {
          email: user.email,
          fullName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL,
        };
        setStudentState(studentData);
        setIsAuthenticated(true);
        return { success: true, data: response.data };
      }
      
      throw new Error(response.message || "Google authentication failed");
    } catch (error) {
      console.error("Google login error:", error);
      
      // Handle Firebase auth errors
      let errorMessage = "Google authentication failed. Please try again.";
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in popup was closed. Please try again.";
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = "Popup was blocked by browser. Please allow popups and try again.";
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = "Sign-in was cancelled. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear auth state function (for use when token is invalidated externally)
  const clearAuth = useCallback(() => {
    setStudentState(null);
    setIsAuthenticated(false);
    removeToken();
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await studentLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  // Register clearAuth function globally on mount
  useEffect(() => {
    clearAuthRef = clearAuth;
    return () => {
      clearAuthRef = null;
    };
  }, [clearAuth]);

  // Computed student object
  const studentWithDetails = useMemo(() => {
    if (!student) return null;
    
    return {
      ...student,
      name: student.fullName || student.email,
      email: student.email,
    };
  }, [student]);

  const value = useMemo(() => {
    return {
      student: studentWithDetails,
      isAuthenticated,
      loading,
      login,
      loginWithGoogle,
      logout,
    };
  }, [studentWithDetails, isAuthenticated, loading, login, loginWithGoogle, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Export function to clear auth state from non-React modules (like api.js)
export const clearAuthState = () => {
  if (clearAuthRef) {
    clearAuthRef();
  }
};

