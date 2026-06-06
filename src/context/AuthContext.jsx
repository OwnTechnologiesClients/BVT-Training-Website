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
import { getStudent, setStudent, clearLegacyAuth } from "@/lib/api";
import { studentLogin, studentLogout, googleAuth, getStudentProfile } from "@/lib/api/auth";
import { auth, googleProvider } from "@/lib/firebase";

const AuthContext = createContext(null);

let clearAuthRef = null;

export const AuthProvider = ({ children }) => {
  const [student, setStudentState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        clearLegacyAuth();
        const cachedStudent = getStudent();
        if (cachedStudent) {
          setStudentState(cachedStudent);
          setIsAuthenticated(true);
        }

        const response = await getStudentProfile();
        if (response.success && response.data) {
          const studentData = response.data.student || response.data;
          setStudentState(studentData);
          setStudent(studentData);
          setIsAuthenticated(true);
        }
      } catch {
        clearLegacyAuth();
        setStudentState(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

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
      return {
        success: false,
        error: error.message || "Login failed. Please check your credentials.",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const userData = {
        email: user.email,
        fullName: user.displayName || `${user.email?.split('@')[0]}`,
        photoURL: user.photoURL,
        phone: user.phoneNumber,
      };

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

      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAuth = useCallback(() => {
    setStudentState(null);
    setIsAuthenticated(false);
    clearLegacyAuth();
  }, []);

  const logout = useCallback(async () => {
    try {
      await studentLogout();
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  useEffect(() => {
    clearAuthRef = clearAuth;
    return () => {
      clearAuthRef = null;
    };
  }, [clearAuth]);

  const studentWithDetails = useMemo(() => {
    if (!student) return null;

    return {
      ...student,
      name: student.fullName || student.email,
      email: student.email,
    };
  }, [student]);

  const value = useMemo(() => ({
    student: studentWithDetails,
    isAuthenticated,
    loading,
    login,
    loginWithGoogle,
    logout,
  }), [studentWithDetails, isAuthenticated, loading, login, loginWithGoogle, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const clearAuthState = () => {
  if (clearAuthRef) {
    clearAuthRef();
  }
};
