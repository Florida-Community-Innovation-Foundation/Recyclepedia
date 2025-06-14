import { Stack } from "expo-router";

export default function ProfileTabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "PROFILE", headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "SETTINGS AND PRIVACY",
          headerTitleStyle: { color: "#024935", fontWeight: "bold" },
        }}
      />
    </Stack>
  );
}
