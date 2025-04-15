import { View, Text, StyleSheet } from "react-native";

export function DayDisplay({ dayOfWeek, dayNum, isPressed, hasEvents }) {
  return (
    <View
      style={
        isPressed
          ? { ...styles.container, backgroundColor: "#fff" }
          : styles.container
      }
    >
      <View>
        <Text
          style={
            isPressed
              ? { ...styles.dayOfWeekText, color: "#024935" }
              : { ...styles.dayOfWeekText, color: "#fff" }
          }
        >
          {dayOfWeek.toUpperCase().substring(0, 3)}
        </Text>
      </View>
      <View>
        <Text
          style={
            isPressed
              ? { ...styles.dayNumText, color: "#024935" }
              : { ...styles.dayNumText, color: "#fff" }
          }
        >
          {dayNum}
        </Text>
      </View>
      <View>{hasEvents && <View style={styles.eventsIndicator} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayOfWeekText: {
    fontWeight: 400,
    fontSize: 21,
  },
  dayNumText: {
    fontWeight: 400,
    fontSize: 42,
  },
  container: {
    marginTop: 30,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
    marginLeft: 6,
    alignItems: "center",
    width: 80,
    height: 100,
  },
  eventsIndicator: {
    width: 50,
    borderRadius: "50%",
    backgroundColor: "#fff",
  },
});
