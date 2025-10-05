import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "~/utils/authContext";
import { RecyclingProvider } from "../utils/recyclingContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RecyclingProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="(protected)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="featuredGameScreen" />
        <Stack.Screen name="learnGameScreen" />
      </Stack>
    </RecyclingProvider>
    </AuthProvider>
  );
}
