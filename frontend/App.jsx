import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { StyleSheet } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { PaperProvider } from "react-native-paper";
import { enableScreens } from "react-native-screens";

// Import screens
import { ActivityIndicator } from "react-native-paper";
import Tabnav from "~/app/components/navigation/Tabnav";
import About from "~/app/screens/About";
import ItemScan from "~/app/screens/ItemScan";
import CurbsideDropoff from "~/app/screens/CurbsideDropoff";
import Home from "~/app/screens/Home";
import UserAccount from "~/app/screens/UserAccount";

enableScreens();

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<ActivityIndicator size="large" animating={true} />}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
