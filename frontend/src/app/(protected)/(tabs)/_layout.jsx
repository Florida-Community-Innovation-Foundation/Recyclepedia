import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import Custombar from "~/components/Custombar";

export default function BottomTabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Custombar {...props} />}
      backBehavior="order"
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="curbside"
        options={{
          tabBarIcon: ({ size, color }) => (
            <EvilIcons name="location" size={size} color={color} />
          ),
          tabBarLabel: "CurbsideDropoff",
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="camera-image"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "BarcodeScan",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
          tabBarLabel: "UserProfile",
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="contact-support" size={size} color={color} />
          ),
          tabBarLabel: "About",
        }}
      />
    </Tabs>
  );
}
