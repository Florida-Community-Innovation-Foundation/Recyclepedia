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
import Divider from "../components/Divider";

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
    height: 70,
    width: 340,
    backgroundColor: "#024935",
    marginTop: 20,
    marginLeft: 32,
    marginRight: 32,
  },
  secondaryLogo: {
    height: 30,
    width: 70,
  },
  headingContainer: {
    marginTop: 90,
  },
  headingText: {
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 32,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#FFFFFF",
  },
  createAccountContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 50,
    borderRadius: 60,
    height: "100%",
  },
  createAccountHeadingText: {
    fontFamily: "Bebas Neue",
    fontWeight: 500,
    fontSize: 24,
    textAlign: "center",
    color: "#024935",
    marginTop: 40,
  },
  createAccountInfoText: {
    fontFamily: "Titillium Web",
    fontWeight: 300,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    color: "#024935",
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 32,
  },
  textInput: {
    width: 314,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 32,
    marginRight: 16,
    paddingLeft: 10,
  },
  signupButton: {
    width: 314,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#024935",
    marginLeft: 32,
    marginRight: 16,
    marginTop: 10,
  },
  signupText: {
    width: 330,
    height: 40,
    borderRadius: 8,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 10,
  },
  loginButton: {
    width: 314,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 32,
    marginRight: 32,
    paddingLeft: 60,
    display: "flex",
    flexDirection: "row",
  },
  loginText: {
    width: 330,
    height: 40,
    color: "#024935",
    marginTop: 10,
    marginLeft: 5,
  },
  noticeText: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 11,
    textAlign: "center",
    color: "#00853F",
    marginLeft: 30,
    marginRight: 32,
    marginTop: 10,
  },
  icon: {
    marginTop: 7,
  },
});
