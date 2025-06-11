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
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { AuthContext } from "~/utils/authContext";
import Divider from "~/components/common/Divider";
import * as AppleAuthentication from "expo-apple-authentication";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    let result;

    if (isLogin) {
      result = await authContext.signInWithEmail(email, password);
    } else {
      result = await authContext.signUpWithEmail(email, password);
    }

    setLoading(false);

    if (!result.success) {
      Alert.alert("Authentication Error", result.error);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await authContext.signInWithGoogle();
    setLoading(false);

    if (!result.success) {
      Alert.alert("Google Sign-In Error", result.error);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    const result = await authContext.signInWithApple();
    setLoading(false);

    if (!result.success) {
      Alert.alert("Apple Sign-In Error", result.error);
    }
  };

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
        <Image
          src="https://recyclepedia.vercel.app/Recyclepedia_Logo_Big-removebg-preview.png"
          style={styles.mainLogo}
        />
      </View>

      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountHeadingText}>
          {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
        </Text>
        <Text style={styles.createAccountInfoText}>
          {isLogin
            ? "Enter your email and password to sign in"
            : "Enter your email to sign up for on-the-go access to recycling resources"}
        </Text>

        <TextInput
          placeholder="domain@example.com"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          secureTextEntry
          autoComplete="password"
        />

        <Pressable
          style={[styles.signupButton, loading && styles.disabledButton]}
          onPress={handleEmailAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.signupText}>
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => setIsLogin(!isLogin)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </Text>
        </Pressable>

        <Divider />

        <Pressable
          style={[styles.loginButton, loading && styles.disabledButton]}
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          <FontAwesome5
            name="google"
            size={13}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.loginText}>Continue with Google</Text>
        </Pressable>

        {Platform.OS === "ios" && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={8}
            style={styles.appleButton}
            onPress={handleAppleSignIn}
          />
        )}

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
    fontWeight: "400",
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
    fontWeight: "500",
    fontSize: 24,
    textAlign: "center",
    color: "#024935",
    marginTop: 40,
  },
  createAccountInfoText: {
    fontFamily: "Titillium Web",
    fontWeight: "300",
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
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
  toggleButton: {
    marginTop: 10,
    alignItems: "center",
  },
  toggleText: {
    color: "#024935",
    fontSize: 14,
  },
  loginButton: {
    width: 314,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#024935",
    marginLeft: 5,
  },
  appleButton: {
    width: 314,
    height: 40,
    marginLeft: 32,
    marginTop: 5,
    marginBottom: 5,
  },
  noticeText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 11,
    textAlign: "center",
    color: "#00853F",
    marginLeft: 30,
    marginRight: 32,
    marginTop: 10,
  },
  icon: {
    marginTop: 0,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
