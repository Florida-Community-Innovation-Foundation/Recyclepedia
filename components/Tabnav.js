import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./tabs/Home.js";
import About from "./tabs/About.js";
import CurbsideDropoff from "./tabs/CurbsideDropoff.js";
import BarcodeScan from "./tabs/BarcodeScan.js";
import UserAccount from "./tabs/UserAccount.js";
import Icon from "react-native-vector-icons/MaterialIcons";
import Custombar from "./Custombar.js";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const Tab = createBottomTabNavigator();

function Tabnav() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Custombar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Curbside Dropoff"
        component={CurbsideDropoff}
        options={{
          tabBarIcon: ({ size, color }) => (
            <EvilIcons name="location" size={size} color={color} />
          ),
          tabBarLabel: "CurbsideDropoff",
        }}
      />
      <Tab.Screen
        name="Barcode Scan"
        component={BarcodeScan}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "BarcodeScan",
        }}
      />
      <Tab.Screen
        name="User Account"
        component={UserAccount}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
          tabBarLabel: "UserAccount",
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="contact-support" size={size} color={color} />
          ),
          tabBarLabel: "About",
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabnav;
