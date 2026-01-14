import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
//} from "firebase/auth/react-native";
//} from "firebase/auth";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

//let firebaseApp, firebaseAuth;

// Checks if auth and app have already been initialized as Firebase will throw an error if we try to initialize twice!
const firebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// const firebaseAuth = initializeAuth(firebaseApp, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// THIS WORKS
//const firebaseAuth = getAuth(firebaseApp);
const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// function getFirebaseAuth() {
//   try {
//     return getAuth(firebaseApp);
//   } catch (error) {
//     return initializeAuth(firebaseApp, {
//       //persistence: getReactNativePersistence(AsyncStorage),
//       persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//     });
//   }
// }

const firebaseDB = getFirestore(firebaseApp);
// const firebaseAuth = getFirebaseAuth();

// if (!getApps().length) {
//   firebaseApp = initializeApp(firebaseConfig);
// } else {
//   firebaseApp = getApp();
// }

// try {
//   firebaseAuth = getAuth(firebaseApp);
// } catch (error) {
//   firebaseAuth = initializeAuth(firebaseApp, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   })/
// }

// if (!getApps().length) {
//   try {
//     firebaseApp = initializeApp(firebaseConfig);
//     firebaseAuth = initializeAuth(firebaseApp, {
//       persistence: getReactNativePersistence(AsyncStorage),
//     });
//   } catch (error) {
//     console.log("Error initializing app: " + error);
//   }
// } else {
//   firebaseApp = getApp();
//   firebaseAuth = getAuth(firebaseApp);
// }

export { firebaseApp, firebaseAuth, firebaseDB };
