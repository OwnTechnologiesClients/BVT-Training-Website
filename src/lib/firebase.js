// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Your web app's Firebase configuration
// These values should be set in your .env.local file
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate Firebase config
const isConfigValid = firebaseConfig.apiKey && 
                      firebaseConfig.authDomain && 
                      firebaseConfig.projectId;

// Initialize Firebase only if it hasn't been initialized and config is valid
let app = null;
if (typeof window !== 'undefined' && isConfigValid) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

// Initialize Firebase Auth
let auth = null;
let googleProvider = null;

if (typeof window !== 'undefined' && app) {
  try {
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    
    // Optional: Add additional scopes
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    
    // Optional: Set custom parameters
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  } catch (error) {
    console.error('Firebase Auth initialization error:', error);
  }
} else if (typeof window !== 'undefined' && !isConfigValid) {
  console.warn('⚠️  Firebase configuration is incomplete. Please set NEXT_PUBLIC_FIREBASE_* environment variables.');
}

// Store RecaptchaVerifier instance to allow proper cleanup
let currentRecaptchaVerifier = null;

// Helper function to send phone verification code
export const sendPhoneVerificationCode = async (phoneNumber, countryCode = '+1', recaptchaContainerId = 'recaptcha-container-phone-verification') => {
  if (typeof window === 'undefined' || !auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    // Format phone number with country code
    const formattedPhone = phoneNumber.startsWith('+') 
      ? phoneNumber 
      : `${countryCode}${phoneNumber.replace(/^0+/, '')}`;

    // Clean up existing recaptcha verifier if it exists
    if (currentRecaptchaVerifier) {
      try {
        currentRecaptchaVerifier.clear();
      } catch (clearError) {
        console.warn('Error clearing previous recaptcha verifier:', clearError);
      }
      currentRecaptchaVerifier = null;
    }

    // Ensure recaptcha container exists and is empty
    let container = document.getElementById(recaptchaContainerId);
    if (!container) {
      container = document.createElement('div');
      container.id = recaptchaContainerId;
      container.style.display = 'none';
      document.body.appendChild(container);
    } else {
      // Clear existing content completely
      // Remove all children first to ensure proper cleanup
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      // Then clear innerHTML as a safety measure
      container.innerHTML = '';
    }

    // Small delay to ensure DOM is fully updated before creating new verifier
    // This helps prevent "already been rendered" errors
    await new Promise(resolve => setTimeout(resolve, 50));

    // Create new recaptcha verifier
    currentRecaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA verified');
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired');
      }
    });

    // Send verification code
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, currentRecaptchaVerifier);
    
    return {
      success: true,
      confirmationResult,
      formattedPhone
    };
  } catch (error) {
    console.error('Error sending phone verification code:', error);
    // Clean up on error
    if (currentRecaptchaVerifier) {
      try {
        currentRecaptchaVerifier.clear();
      } catch (clearError) {
        console.warn('Error clearing recaptcha verifier on error:', clearError);
      }
      currentRecaptchaVerifier = null;
    }
    throw error;
  }
};

// Helper function to verify phone code
export const verifyPhoneCode = async (confirmationResult, code) => {
  if (typeof window === 'undefined' || !auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    const result = await confirmationResult.confirm(code);
    
    // Get Firebase ID token
    const idToken = await result.user.getIdToken();
    
    return {
      success: true,
      user: result.user,
      phoneNumber: result.user.phoneNumber,
      idToken: idToken // Return ID token for backend verification
    };
  } catch (error) {
    console.error('Error verifying phone code:', error);
    throw error;
  }
};

// Helper function to cleanup recaptcha
export const cleanupRecaptcha = (recaptchaContainerId = 'recaptcha-container-phone-verification') => {
  if (typeof window === 'undefined') return;
  
  // Clear the RecaptchaVerifier instance if it exists
  if (currentRecaptchaVerifier) {
    try {
      currentRecaptchaVerifier.clear();
    } catch (clearError) {
      console.warn('Error clearing recaptcha verifier:', clearError);
    }
    currentRecaptchaVerifier = null;
  }
  
  // Clear the container
  const container = document.getElementById(recaptchaContainerId);
  if (container) {
    container.innerHTML = '';
    // Remove all children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
};

export { auth, googleProvider, app };

