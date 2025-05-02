import { getApp, getApps, initializeApp } from "@firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "@firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp, firebaseAuth;

// Checks if auth and app have already been initialized as Firebase will throw an error if we try to initialize twice!
if (!getApps().length) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  firebaseApp = getApp();
  firebaseAuth = getAuth();
}

export { firebaseApp, firebaseAuth };
