import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const baseWidth = 375;

const calcFont = (percent) => {
  const scaleFactor = width / baseWidth;
  return Math.round(scaleFactor * percent);
};

export default function Custombar({ state, descriptors, navigation }) {
  // filters the calendar route from available
  // calendar.jsx is still used, but don't want it to be a route
  const filteredRoutes = state.routes.filter(route => route.name !== "calendar");

  return (
    <View style={styles.bar}>
      {filteredRoutes.map((route) => {
        const { options } = descriptors[route.key];
        // compare against the route's index in the UNfiltered array —
        // state.index is based on state.routes, not filteredRoutes
        const isFocused = state.routes[state.index]?.key === route.key;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={route.key} onPress={onPress}>
            {options.tabBarIcon &&
              options.tabBarIcon({
                size: calcFont(32),
                color: "#024935",
              })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    paddingBottom: 28,
    bottom: 0,
    height: 80,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopColor: "blue",
    elevation: 5,
  },
});
