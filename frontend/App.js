import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { enableScreens } from "react-native-screens";

// Import screens
import About from "./app/screens/About.js";
import CurbsideDropoff from "./app/screens/CurbsideDropoff.js";
import Home from "./app/screens/Home.js";
import UserAccount from "./app/screens/UserAccount.js";
import Tabnav from "./Tabnav.js";

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          {/* Tabnav as a screen */}
          <Stack.Screen
            name="MainTabs"
            component={Tabnav}
            options={{ headerShown: false }}
          />
          {/* Additional screens */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="User Account"
            component={UserAccount}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Item Scan"
            component={ItemScan}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Curbside Dropoff"
            component={CurbsideDropoff}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
