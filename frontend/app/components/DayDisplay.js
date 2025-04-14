import { View, Text, StyleSheet } from "react-native";

export function DayDisplay({ dayOfWeek, dayNum, hasEvents }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dayOfWeekText}>
          {" "}
          {dayOfWeek.toUpperCase().substring(0, 3)}{" "}
        </Text>
      </View>
      <View>
        <Text style={styles.dayNumText}> {dayNum} </Text>
      </View>
      <View>{hasEvents && <View style={styles.eventsIndicator} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayOfWeekText: {
    fontWeight: 400,
    fontSize: 21,
    color: "#fff",
  },
  dayNumText: {
    fontWeight: 400,
    fontSize: 42,
    color: "#fff",
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
