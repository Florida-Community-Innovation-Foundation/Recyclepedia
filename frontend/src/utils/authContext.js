import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { firebaseAuth, firebaseDB } from "../configs/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

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
    // reset user name/recycling info 

    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false });
    router.replace("/login");
    signOut(firebaseAuth); // make sure this is ok if there is no firebase user logged (ie Guest)
  };

  // disabled for now since not exactly sure how it should work
  useEffect(() => {
    const getAuthFromStorage = async () => {
      // simulate a delay, e.g. for an API request
      //await new Promise((res) => setTimeout(() => res(null), 1000));
      try {
        const value = await AsyncStorage.getItem(authStorageKey);

        console.log("Value: ", value);

        if (value !== null) {
          const auth = JSON.parse(value);
          console.log("Auth: ", auth);
          setIsLoggedIn(auth.isLoggedIn);
        }
      } catch (error) {
        console.log("Error fetching from storage", error);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
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
