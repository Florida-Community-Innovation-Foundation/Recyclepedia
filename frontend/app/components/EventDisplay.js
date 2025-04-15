import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import _ from "lodash";
import { format } from "date-fns";
import * as Calendar from "expo-calendar";
import { convertTime } from "../util/calendar-events";

export function EventDisplay({ eventItem }) {
  const handleLocationPress = (location) => {
    const locationParams = _.join(_.split(location, " "), "+");
    Linking.openURL(`https://www.google.com/maps/place/${locationParams}`);
  };

  const handleCalendarIconPress = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        console.log(
          `${eventItem.startDate}T${convertTime(eventItem.startTime)}`,
        );
        const eventData = {
          startDate: new Date(
            `${eventItem.startDate}T${convertTime(eventItem.startTime)}`,
          ),
          endDate: new Date(
            `${eventItem.endDate}T${convertTime(eventItem.endTime)}`,
          ),
          location: eventItem.location,
          notes: eventItem.details,
          title: eventItem.title,
        };
        const { status } = await Calendar.createEventInCalendarAsync(eventData);
        console.log("Calendar opened to date:", eventItem.startDate);
      } else {
        console.error(`Failed to open calendar with status: ${status}`);
      }
    } catch (error) {
      console.error("Failed to open calendar:", error);
    }
  };

  const handleShareIconPress = () => {
    console.log("Pressed share icon");
  };

  return (
    <View style={styles.container}>
      {console.log(eventItem.startDate)}
      <View style={styles.eventDateContainer}>
        <Text style={styles.eventMonthText}>
          {format(eventItem.startDate, "MMM").toUpperCase()}
        </Text>
        <Text style={styles.eventDayOfMonthText}>
          {parseInt(format(eventItem.startDate, "d")) + 1}
        </Text>
      </View>
      <View style={styles.eventDetailsBox}>
        <View style={styles.topEventDetailsBoxSection}>
          <Text style={styles.eventTitleText}>
            {eventItem.title.toUpperCase()}
          </Text>
          <View style={styles.eventTimeContainer}>
            <EvilIcons name="clock" size={24} color="gray" />
            <Text style={styles.eventVenueText}>
              {eventItem.startTime} - {eventItem.endTime}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => handleLocationPress(eventItem.location)}
          >
            <View style={styles.eventTimeContainer}>
              <EvilIcons name="location" size={24} color="gray" />
              <Text style={styles.eventVenueText}>{eventItem.location}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.bottomEventDetailsBoxSection}>
          <Text style={styles.eventDetailsText}>{eventItem.details}</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={handleCalendarIconPress}>
              <View style={styles.calendarIconContainer}>
                <Text style={styles.shareText}>Add to &nbsp;</Text>
                <Entypo name="calendar" size={12} color="#fff" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShareIconPress}>
              <View style={styles.shareIconContainer}>
                <Entypo name="share-alternative" size={12} color="#fff" />
                <Text style={styles.shareText}>Share</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
    paddingTop: 5,
  },
  topEventDetailsBoxSection: {
    paddingLeft: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  eventTitleText: {
    fontWeight: 600,
    fontSize: 15,
    color: "#fff",
  },
  eventVenueText: {
    marginLeft: 5,
    fontWeight: 400,
    fontSize: 14,
    color: "gray",
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
  eventTimeContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  eventDetailsText: {
    marginLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 400,
    fontSize: 14,
    color: "#fff",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 30,
    marginTop: 10,
  },
  calendarIconContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    width: 85,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  shareIconContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    width: 75,
    padding: 10,
    borderRadius: 5,
  },
  shareText: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 10,
  },
  bottomEventDetailsBoxSection: {
    paddingLeft: 16,
    paddingBottom: 20,
  },
});
