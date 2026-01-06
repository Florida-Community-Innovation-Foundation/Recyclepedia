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
import {useRouter} from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
            LOGIN OR SIGNUP
          </Text>
          {/* <Pressable style={[styles.signupButton, { marginTop: normalize(125, "height") }]}> */}
          <Pressable style={nstyles.signUpButton} onPress={() => router.push("/loginsetup")}>
            {/* <Text style={nstyles.buttonText} onPress={() => router.push("/loginsetup")}> */}
            <Text style={nstyles.buttonText}>
              LOGIN
            </Text>
          </Pressable>

          {/* <Pressable style={[styles.signupButton, { marginTop: normalize(40, "height") }]}> */}
          <Pressable style={nstyles.signUpButton} onPress={() => router.push("/signupsetup")}>
            {/* <Text style={nstyles.buttonText} onPress={() => router.push("/signupsetup")}> */}
            <Text style={nstyles.buttonText}>
              REGISTER
            </Text>
          </Pressable>

          {/* <Pressable style={[styles.signupButton, { backgroundColor: 'grey' }, { marginTop: normalize(40, "height") }]}> */}
          <Pressable style={[nstyles.signUpButton, {backgroundColor: 'grey'}]} onPress={() => authContext.login()}>
            {/* <Text style={nstyles.buttonText} onPress={() => authContext.login()}> */}
            <Text style={nstyles.buttonText}>
              CONTINUE AS GUEST
            </Text>
          </Pressable>

          <Text style={nstyles.footerText}>
            By clicking continue, you agree to our{" "}
            <Link href="https://recyclepedia.vercel.app/terms-of-service">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="https://recyclepedia.vercel.app/privacy-policy">
              Privacy Policy
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </View>
    // <View style={nstyles.screen}>
    //   <SafeAreaView style={nstyles.saview}>
    //     <View style={nstyles.mainView}>
    //       <View style={nstyles.headerView}>
    //         {/* Header Text */}
    //         <Text style={nstyles.headerText}>
    //           RECYCLE RIGHT WITH
    //         </Text>

    //         {/* Recyclepedia Logo */}
    //         <Image
    //           src="https://recyclepedia.vercel.app/Recyclepedia_Logo_Big-removebg-preview.png"
    //           style={nstyles.headerLogo}
    //         />
    //       </View>
    //     </View>
    //   </SafeAreaView>      
    // </View>
    // <View style={styles.screen}>
    //   <View style={styles.headingContainer}>
    //     <Text style={ styles.headingText }>
    //       RECYCLE RIGHT WITH
    //     </Text>
    //     {/* <Text style={styles.headingText}>
    //       RECYCLE RIGHT IN{" "}
    //       <Image
    //         src="https://www.miamidade.gov/resources/global/images/md-logo-color.png"
    //         style={styles.secondaryLogo}
    //       />{" "}
    //       WITH
    //     </Text> */}
    //     {/* Recyclepedia Logo */}
    //     <Image
    //       src="https://recyclepedia.vercel.app/Recyclepedia_Logo_Big-removebg-preview.png"
    //       style={styles.mainLogo}
    //     />
    //   </View>
    //   <View style={styles.createAccountContainer}>

    //       {/*add on */}
    //     <Pressable style={[styles.signupButton, { marginTop: normalize(125, "height") }]}>
    //       <Text style={styles.signupText} onPress={() => router.push("/loginsetup")}>
    //         LOGIN
    //       </Text>
    //     </Pressable>

    //     <Pressable style={[styles.signupButton, { marginTop: normalize(40, "height") }]}>
    //       <Text style={styles.signupText} onPress={() => router.push("/signupsetup")}>
    //         REGISTER
    //       </Text>
    //     </Pressable>

    //     <Pressable style={[styles.signupButton, {backgroundColor:'grey'}, { marginTop: normalize(40, "height") }]}>
    //       <Text style={styles.signupText} onPress={() => authContext.login()}>
    //         CONTINUE AS GUEST
    //       </Text>
    //     </Pressable>
    //     <Text style={styles.noticeText}>
    //       By clicking continue, you agree to our{" "}
    //       <Link href="https://recyclepedia.vercel.app/terms-of-service">
    //         Terms of Service
    //       </Link>{" "}
    //       and{" "}
    //       <Link href="https://recyclepedia.vercel.app/privacy-policy">
    //         Privacy Policy
    //       </Link>
    //     </Text>
    //   </View>
    // </View>
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
  mainView: {
    paddingTop: "10%",
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
    gap: 40,
  },
  loginText: {
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 32,
    textAlign: "center",
    color: "#024935",
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

  // footer
  footerText: {
    fontFamily: "Bebas Neue",
    color: "#024935",
    textAlign: "center",
  }
});

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#024935",
  },
  mainLogo: {
    height: normalize(60, "height"),
    width: normalize(320, "width"),
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
    marginTop: normalize(50, "height"),
    borderRadius: normalize(60),
    height: "100%",
  },
  createAccountHeadingText: {
    fontFamily: "Bebas Neue",
    fontWeight: 500,
    fontSize: normalize(24),
    textAlign: "center",
    color: "#024935",
    marginTop: normalize(40, "height"),
  },
  createAccountInfoText: {
    fontFamily: "Titillium Web",
    fontWeight: 300,
    fontSize: normalize(14),
    textAlign: "center",
    marginTop: normalize(10, "height"),
    color: "#024935",
    marginBottom: normalize(20, "height"),
    marginLeft: normalize(16, "width"),
    marginRight: normalize(32, "width"),
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
    marginTop: normalize(150, "height"),
    alignSelf: "center",
  },
  icon: {
    marginTop: normalize(7, "height"),
  }
});
