import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "~/utils/authContext";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export const unstable_settings = {
  initialRouteName: "(tabs)", // anchor
};

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);
  const queryClient = new QueryClient();

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}
