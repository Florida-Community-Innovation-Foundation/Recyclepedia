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

export default function LoginScreen() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.screen}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          RECYCLE RIGHT IN{" "}
          <Image
            src="https://www.miamidade.gov/resources/global/images/md-logo-color.png"
            style={styles.secondaryLogo}
          />{" "}
          WITH
        </Text>
        {/* Recyclepedia Logo */}
        <Image
          src="https://recyclepedia.vercel.app/Recyclepedia_Logo_Big-removebg-preview.png"
          style={styles.mainLogo}
        />
      </View>
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountHeadingText}> CREATE AN ACCOUNT </Text>
        <Text style={styles.createAccountInfoText}>
          Enter your email to sign up for the on-the-go access to recycling
          resources in our community
        </Text>
        <TextInput
          placeholder="domain@example.com"
          placeholderTextColor="gray"
          value={email}
          onChange={setEmail}
          style={styles.textInput}
        />
        <TextInput
          value={password}
          onChange={setPassword}
          style={styles.textInput}
          autoComplete="new-password"
        />
        <Pressable style={styles.signupButton}>
          <Text style={styles.signupText} onPress={() => authContext.login()}>
            CONTINUE
          </Text>
        </Pressable>
        <Divider />
        <Pressable
          style={styles.loginButton}
          onPress={() => authContext.login()}
        >
          <FontAwesome5
            name="google"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.loginText}> Continue with Google </Text>
        </Pressable>
        <Pressable
          style={styles.loginButton}
          onPress={() => authContext.login()}
        >
          <FontAwesome5
            name="apple"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.loginText}> Continue with Apple </Text>
        </Pressable>
        <Text style={styles.noticeText}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
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
    marginTop: normalize(10, "height"),
    alignSelf: "center",
  },
  icon: {
    marginTop: normalize(7, "height"),
  }
});
