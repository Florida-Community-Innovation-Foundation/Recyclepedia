import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "~/app/screens/Home";
import About from "~/app/screens/About";
import CurbsideDropoff from "~/app/screens/CurbsideDropoff";
import BarcodeScan from "~/app/screens/BarcodeScan";
import UserAccount from "~/app/screens/UserAccount";
import Icon from "react-native-vector-icons/MaterialIcons";
import Custombar from "~/app/components/navigation/Custombar";
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
