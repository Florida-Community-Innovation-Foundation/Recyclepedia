import { Redirect, Stack } from "expo-router";
import { useContext, useMemo } from "react";
import { AuthContext } from "~/utils/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setStatusBarStyle } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: "(tabs)", // anchor
};

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);
  const queryClient = useMemo(() => new QueryClient(), []);

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) {
    console.log("User isn't logged in!");
    console.log("Auth state: ", authState);
    return <Redirect href="/login" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Stack screenOptions={{ headerShown: false, statusBarStyle: "inverted", }}> */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}
