import { BebasNeue_400Regular, useFonts } from "@expo-google-fonts/bebas-neue";
import { TitilliumWeb_400Regular } from "@expo-google-fonts/titillium-web";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { enableScreens } from "react-native-screens";

// Import screens
import Tabnav from "./app/components/Tabnav.js";
import About from "./app/components/tabs/About.js";
import BarcodeScan from "./app/components/tabs/BarcodeScan.js";
import CurbsideDropoff from "./app/components/tabs/CurbsideDropoff.js";
import Home from "./app/components/tabs/Home.js";
import UserAccount from "./app/components/tabs/UserAccount.js";

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    TitilliumWeb_400Regular,
    BebasNeue_400Regular,
  });

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
