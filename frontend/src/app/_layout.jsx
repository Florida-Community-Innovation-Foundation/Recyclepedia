import { Stack } from "expo-router";
import React from "react";
import { Alert, Text, View, ScrollView } from "react-native";
import { AuthProvider } from "~/utils/authContext";
import { RecyclingProvider } from "../utils/recyclingContext";
import { firebaseInitError } from "~/configs/firebaseConfig";

if (global.ErrorUtils) {
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    Alert.alert("JS Error", `${error?.message}\n\n${error?.stack?.slice(0, 300)}`);
  });
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: firebaseInitError || null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "red", marginBottom: 10 }}>
            Startup Error (please screenshot this)
          </Text>
          <ScrollView>
            <Text style={{ fontSize: 13, color: "#333" }}>
              {this.state.error?.message}{"\n\n"}{this.state.error?.stack}
            </Text>
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RecyclingProvider>
          <Stack screenOptions={{ headerShown: false, animation: "none" }}>
            <Stack.Screen name="(protected)" />
            <Stack.Screen name="login" />
          </Stack>
        </RecyclingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
