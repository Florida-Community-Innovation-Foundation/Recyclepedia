import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "~/utils/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="(protected)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="featuredGameScreen" />
        <Stack.Screen name="learnGameScreen" />
      </Stack>
    </AuthProvider>
  );
}
