import { View, Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export function EventDisplay({
  month,
  dayOfMonth,
  name,
  organizer,
  time,
  location,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.eventDateContainer}>
        <Text style={styles.eventMonthText}>{month}</Text>
        <Text style={styles.eventDayOfMonthText}>{dayOfMonth}</Text>
      </View>
      <View style={styles.eventDetailsBox}>
        <Text style={styles.eventDetailsText}>{name}</Text>
        <Text style={styles.eventOrganizerNameText}>{organizer}</Text>
        <Text style={styles.eventVenueText}>
          {time}.{location}
        </Text>
        <View style={styles.shareIconContainer}>
          <Entypo name="share-alternative" size={24} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 120,
    marginTop: 16,
    marginRight: 16,
  },
  eventDateContainer: {
    flex: 1,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 2,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  eventDetailsBox: {
    flex: 3,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingLeft: 16,
    paddingTop: 5,
  },
  eventDetailsContainer: {},
  eventDetailsText: {
    fontWeight: 600,
    fontSize: 15,
    color: "#fff",
  },
  eventOrganizerNameText: {
    fontWeight: 400,
    fontSize: 12,
    color: "#fff",
  },
  eventVenueText: {
    marginTop: 10,
    fontWeight: 400,
    fontSize: 14,
    color: "#fff",
  },
  eventMonthText: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 21,
    color: "#fff",
    marginTop: 10,
  },
  eventDayOfMonthText: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 42,
    color: "#fff",
  },
  shareIconContainer: {
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: 15,
  },
});
