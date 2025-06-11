import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  OAuthProvider,
} from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { firebaseAuth } from "~/configs/firebaseConfig";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

const authStorageKey = "auth-key";

export const AuthContext = createContext({
  isLoggedIn: false,
  isReady: false,
  user: null,
  signInWithEmail: () => {},
  signUpWithEmail: () => {},
  signInWithGoogle: () => {},
  signInWithApple: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isReady, setIsReady] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const convertErrorCodeToErrorMessage = (code) => {
    return code
      .split("auth/")[1]
      .split("-")
      .map((word, index) =>
        index !== 0
          ? word
          : word[0].toUpperCase() + word.substring(1).toLowerCase(),
      )
      .join(" ");
  };

  // Email/Password Authentication
  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: convertErrorCodeToErrorMessage(error.code),
      };
    }
  };

  const signUpWithEmail = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Google Authentication using Expo AuthSession
  const signInWithGoogle = async () => {
    try {
      const request = new AuthSession.AuthRequest({
        clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        scopes: ["openid", "profile", "email"],
        responseType: AuthSession.ResponseType.IdToken,
        redirectUri: AuthSession.makeRedirectUri({
          scheme: "com.yourcompany.recyclepedia",
        }),
      });

      const result = await request.promptAsync({
        authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      });

      if (result.type === "success") {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(firebaseAuth, credential);
        return { success: true };
      } else {
        return { success: false, error: "Authentication cancelled" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Apple Authentication
  const signInWithApple = async () => {
    try {
      const nonce = Math.random().toString(36).substring(2, 10);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce,
        { encoding: Crypto.CryptoEncoding.BASE64 },
      );

      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      const { identityToken } = appleCredential;
      const provider = new OAuthProvider("apple.com");
      const credential = provider.credential({
        idToken: identityToken,
        rawNonce: nonce,
      });

      await signInWithCredential(firebaseAuth, credential);
      return { success: true };
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        return { success: false, error: "Sign in was cancelled" };
      }
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const getAuthFromStorage = async () => {
      // simulate a delay, e.g. for an API request
      await new Promise((res) => setTimeout(() => res(null), 1000));
      try {
        const value = await AsyncStorage.getItem(authStorageKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
        }
      } catch (error) {
        console.error("Error fetching from storage", error);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        router.replace("/");
      } else {
        setUser(null);
        setIsLoggedIn(false);
        router.replace("/login");
      }
      setIsReady(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoggedIn,
        user,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInWithApple,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
