import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="calendar"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="event"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="time"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
