import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { firebaseAuth, firebaseDB } from "../configs/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

SplashScreen.preventAutoHideAsync();

const authStorageKey = "auth-key";

export const AuthContext = createContext({
  // defaults
  userName: "Guest",
  uuid: "",
  // isLoggedIn: false,
  // isReady: false,
  login: () => {},
  logout: () => {},
  //fbDB: {},
});

export function AuthProvider({ children }) {
  // const [isReady, setIsReady] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState("Guest");
  const [uuid, setUUID] = useState("");
  const router = useRouter();
  //const firebaseDB = getFirestore();
  //const fbDB = firebaseAuth.firebaseDB;
  const fbDB = firebaseDB;

  const storeAuthState = async (newState) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.log("Error saving", error);
    }
  };

  const guestLogin = () => {
    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace("/");
  };

  // create user in Firebase
  const createUserWithEmailPassword = async (email, password) => {    
    const auth = firebaseAuth;
    let result;

    console.log("Auth: ", auth);

    // [NOTE]: sometimes this will fail w/ auth/network-request-failed if that happend, switch to hotspot on phone
    // actual fix is to reset home wifi router
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // this might be used later for storing user rec info in db (ex. UID)
        const user = userCredential.user;
        console.log("UserCred: ", userCredential);

        // set name for profile screen
        setUserName(email);

        const uid = userCredential.user.uid;
        console.log("UID: ", uid);

        setUUID(uid);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
        result = error.message;
      });

    // failed to create a user
    if (result) {
      console.log("Failed to create a user");
      return result;
    }

    // maybe set username as everything before @ symbol in email

    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace("/");
  };

  const loginUserWithEmailPassword = async (email, password) => {
    console.log("SignIn User w/ Email/Password");

    // create user in Firebase
    const auth = firebaseAuth;
    let result;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // don't know what this is used for
        const user = userCredential.user;

        setUserName(email);

        setUUID(userCredential.user.uid);

        console.log("User: ", user);
      })
      .catch((error) => {
        // console.error("Error Code: ", error.code);
        // console.error("Error Mess: ", error.message);
        console.log("Error: ", error.message);

        //return error.message;
        result = error.message;
      });

    if (result) {
      console.log("REsult defined");
      return result;
    }


    // set username as everything before @ symbol in email

    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace("/");

    // get user from Firebase

    // set username as everything before @ symbol in email
    // get user recycling info

    // setIsLoggedIn(true);
    // storeAuthState({ isLoggedIn: true });
    // router.replace("/");
  };

  // const emailpasssignin = (email, password) => {
  //   console.log("Email: ", email);
  //   console.log("Password: ", password);

  //   const auth = firebaseAuth;
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // signed up
  //       const user = userCredential.user;
  //       console.log("User: ", user);
  //       console.log("User Cred: ", userCredential);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;

  //       console.error("Error Code: ", errorCode);
  //       console.error("Error Mess: ", errorMessage);
  //       console.error("Error: ", error);
  //     });

  //   setIsLoggedIn(true);
  //   storeAuthState({ isLoggedIn: true });
  //   router.replace("/");
  // };

  const login = () => {
    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace("/");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUUID("");
    setUserName("Guest");
    storeAuthState({ isLoggedIn: false });
    router.replace("/login");
    signOut(firebaseAuth).catch(() => {}); // no-op if no Firebase user (guest)
  };

  useEffect(() => {
    if (!firebaseAuth) {
      console.warn("[Auth] firebaseAuth is undefined — skipping onAuthStateChanged");
      setIsReady(true);
      return;
    }

    const fallback = setTimeout(() => setIsReady(true), 5000);

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      clearTimeout(fallback);
      if (user) {
        setUUID(user.uid);
        setUserName(user.email);
        setIsLoggedIn(true);
      } else {
        // No Firebase user — reset identity and check for guest login
        setUUID("");
        setUserName("Guest");
        try {
          const value = await AsyncStorage.getItem(authStorageKey);
          if (value !== null) {
            const auth = JSON.parse(value);
            setIsLoggedIn(auth.isLoggedIn || false);
          }
        } catch (error) {
          console.log("Error fetching from storage", error);
        }
      }
      setIsReady(true);
    });
    return () => {
      clearTimeout(fallback);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        userName,
        uuid,
        isReady,
        isLoggedIn,
        login,
        logout,
        //emailpasssignin,
        createUserWithEmailPassword,
        loginUserWithEmailPassword,
        fbDB,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
