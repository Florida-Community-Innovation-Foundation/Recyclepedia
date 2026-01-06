import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "~/utils/authContext";
import Divider from "~/components/common/Divider";
import { normalize } from "~/utils/normalize";
//import Loginsetup  from "./loginsetup";
import {useRouter} from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loginsetup() {
      const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function emailPasswordLogin(email, pass) {
    if (email === "") {
      alert("Please enter an appropriate email address!")
      return;
    }

    // make sure passwords are same
    if (pass === "") {
      alert("Please enter an appropriate email address!");
      return;
    }

    let result = await authContext.loginUserWithEmailPassword(email, pass);

    if (result) {
      alert(result);
    }
  }


  return (
    <View style={nstyles.screen}>
      <SafeAreaView style={nstyles.saview}>
        {/* header view (1/3 screen) */}
        <View style={nstyles.headerView}>
          {/* Header */}
          <Text style={nstyles.headerText}>
            RECYCLE RIGHT WITH
          </Text>

          {/* Recyclepedia Logo */}
          <Image
            src="https://recyclepedia.vercel.app/Recyclepedia_Logo_Big-removebg-preview.png"
            style={nstyles.headerLogo}
          />
        </View>

        {/* body view (2/3 screen) */}
        <View style={nstyles.bodyView}>
          <Text style={nstyles.loginText}>
            LOGIN
          </Text>

          <View style={nstyles.inputContainer}>
            <Text style={nstyles.inputHeader}>
              EMAIL
            </Text>

            <TextInput
              placeholder="domain@example.com"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              style={nstyles.textInput}
            />
          </View>

          <View style={nstyles.inputContainer}>
            <Text style={nstyles.inputHeader}>
              PASSWORD
            </Text>
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              style={nstyles.textInput}
              autoComplete="new-password"
            />
          </View>

          <Pressable style={nstyles.signUpButton}
            onPress={() => emailPasswordLogin(email, password)}
          >
            {/* <Text style={[styles.signupText]} onPress={() => authContext.loginUserWithEmailPassword()}> */}
            <Text style={nstyles.buttonText}>
              SUBMIT
            </Text>
          </Pressable>

         <Text style={nstyles.noticeText}>
           Don't have an account?{" "}
           <Text onPress={() => router.push("/signupsetup")}>
             Sign Up
           </Text>
         </Text>
        </View>
      </SafeAreaView>
    </View>

    // <View style={styles.screen}>
    // <View style={styles.createAccountContainer}>
    //   <Text style={[styles.createAccountHeadingText, {marginTop: 45} ]}> LOGIN </Text>
    //     <Text style={styles.createAccountInfoText}>
    //       EMAIL
    //     </Text>
    //     <TextInput
    //       placeholder="domain@example.com"
    //       placeholderTextColor="gray"
    //       value={email}
    //       onChangeText={setEmail}
    //       style={styles.textInput}
    //     />
    //     <Text style={[styles.createAccountInfoText]}>
    //       PASSWORD
    //     </Text>
    //     <TextInput
    //       placeholder="Password"
    //       placeholderTextColor="gray"
    //       value={password}
    //       onChangeText={setPassword}
    //       style={styles.textInput}
    //       autoComplete="new-password"
    //     />
    //     <Pressable style={[styles.signupButton, {marginTop:40}]}
    //       onPress={() => emailPasswordLogin(email, password)}
    //     >
    //       {/* <Text style={[styles.signupText]} onPress={() => authContext.loginUserWithEmailPassword()}> */}
    //       <Text style={[styles.signupText]}>
    //         SUBMIT
    //       </Text>
    //     </Pressable>


    // {/* <View style={[styles.divider, {marginTop: 45}]}>
    //   <View style={styles.dividerLine}></View>
    //   <Text style={styles.dividerText}> Or login with </Text>
    //   <View style={styles.dividerLine}></View>
    // </View>
    
  


    //     <Pressable
    //       style={[styles.loginButton, {marginTop:45}]}
    //       onPress={() => authContext.login()}
    //     >
    //       <FontAwesome5
    //         name="google"
    //         size={20}
    //         color="black"
    //         style={styles.icon}
    //       />
    //       <Text style={styles.loginText}> Continue with Google </Text>
    //     </Pressable>
    //     <Pressable
    //       style={[styles.loginButton, {marginTop: 15}]}
    //       onPress={() => authContext.login()}
    //     >
    //       <FontAwesome5
    //         name="apple"
    //         size={20}
    //         color="black"
    //         style={styles.icon}
    //       />
    //       <Text style={styles.loginText}> Continue with Apple </Text>
    //     </Pressable> */}
        
    //     <Text style={[styles.noticeText, {marginTop: 40}]}>
    //       Don't have an account?{" "}
    //       <Text onPress={() => router.push("/signupsetup")}>
    //         Sign Up
    //       </Text>
    //     </Text>
    //     </View>
    //   </View>
    );
  } 

const nstyles = StyleSheet.create({
  // background
  screen: {
    backgroundColor: "#024935",
    flex: 1,
  },
  saview: {
    flex: 1,
    display: "flex",
  },

  // header
  headerView: {
    padding: 60,
    flex: 1,
  },
  headerText: {
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 32,
    textAlign: "center",
    color: "#FFFFFF",
  },
  headerLogo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },

  // body (login etc)
  bodyView: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 40,
    gap: "5%",
  },
  loginText: {
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 32,
    textAlign: "center",
    color: "#024935",
  },

  inputContainer: {
    gap: 10,
  },
  inputHeader: {
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 16,
    color: "#024935",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
  },

  // buttons
  signUpButton: {
    //flex: 1,
    backgroundColor: "#024935",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: "10%",
  },
  buttonText: {
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 16,
    //textAlign: "center",
    color: "#FFFFFF",
  },

  // signup text
  noticeText: {
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 16,
    color: "#024935",
    alignSelf: "center",
  },
});

  const styles = StyleSheet.create({
screen: {
  flex: 1,
  backgroundColor: "#024935",
},
  mainLogo: {
    height: normalize(70, "height"),
    width: normalize(340, "width"),
    backgroundColor: "#024935",
    marginTop: normalize(20),
    marginLeft: normalize(32),
    marginRight: normalize(32),
    alignSelf: "center",
  },
  secondaryLogo: {
    height: normalize(30, "height"),
    width: normalize(70, "width"),
  },
  headingContainer: {
    marginTop: normalize(90),
  },
  headingText: {
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: normalize(32),
    textAlign: "center",
    textAlignVertical: "center",
    color: "#FFFFFF",
  },
  createAccountContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: normalize(120, "height"),
    borderRadius: normalize(60),
    height: "100%",
  },
  createAccountHeadingText: {
    fontFamily: "Bebas Neue",
    fontWeight: 500,
    fontSize: normalize(30),
    textAlign: "center",
    color: "#024935",
    marginTop: normalize(40, "height"),
  },
  createAccountInfoText: {
    fontFamily: "Titillium Web",
    fontWeight: 300,
    fontSize: normalize(14),
    textAlign: "left",
    marginTop: normalize(20, "height"),
    color: "#024935",
    marginLeft: normalize(32, "width"),
    marginRight: normalize(16, "width"),
    paddingLeft: normalize(10, "width"),
  },
  textInput: {
    width: normalize(314, "width"),
    height: normalize(40, "height"),
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: normalize(32, "width"),
    marginRight: normalize(16, "width"),
    paddingLeft: normalize(10, "width"),
    alignSelf: "center",
  },
  signupButton: {
    width: normalize(314, "width"),
    height: normalize(40, "height"),
    borderRadius: 8,
    backgroundColor: "#024935",
    marginLeft: normalize(32, "width"),
    marginRight: normalize(16, "width"),
    marginTop: normalize(10, "height"),
    alignSelf: "center",
  },
  signupText: {
    width: normalize(330, "width"),
    height: normalize(40, "height"),
    borderRadius: 8,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: normalize(10, "height"),
  },
  loginButton: {
    width: normalize(314, "width"),
    height: normalize(40, "height"),
    borderWidth: normalize(1, "width"),
    borderRadius: normalize(8),
    marginBottom: normalize(5, "height"),
    marginTop: normalize(5, "height"),
    marginLeft: normalize(32, "width"),
    marginRight: normalize(32, "width"),
    paddingLeft: normalize(60, "width"),
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
  },
  loginText: {
    width: normalize(330, "width"),
    height: normalize(40, "height"),
    color: "#024935",
    marginTop: normalize(10, "height"),
    marginLeft: normalize(5, "width"),
  },
  noticeText: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: normalize(11),
    textAlign: "center",
    color: "#00853F",
    marginLeft: normalize(30, "width"),
    marginRight: normalize(32, "width"),
    marginTop: normalize(10, "height"),
    alignSelf: "center",
  },
  icon: {
    marginTop: normalize(7, "height"),
  },
   divider: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    marginLeft: 32,
    marginRight: 16,
    alignSelf: "center",
  },
  dividerLine: {
    backgroundColor: "#024935",
    height: 1,
    width: "43%",
    marginTop: 8,
  },
  dividerText: {
    fontWeight: 400,
    fontSize: 14,
    color: "#024935",
  },
});
