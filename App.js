import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { PaperProvider } from "react-native-paper";

// Import screens
import Home from "./components/tabs/Home.js";
import About from "./components/tabs/About.js";
import CurbsideDropoff from "./components/tabs/CurbsideDropoff.js";
import UserAccount from "./components/tabs/UserAccount.js";
import BarcodeScan from "./components/tabs/BarcodeScan.js";
import Tabnav from "./components/Tabnav.js";

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
            name="Barcode Scan"
            component={BarcodeScan}
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
