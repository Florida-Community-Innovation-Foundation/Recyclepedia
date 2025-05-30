import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import dayjs from "dayjs";
import * as Calendar from "expo-calendar";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import _ from "lodash";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { generateIcsString } from "~/app/utils/calendarEvents.js";
import { createDate } from "~/app/utils/dates";

export function EventDisplay({ eventItem }) {
  const handleLocationPress = (location) => {
    const locationParams = _.join(_.split(location, " "), "+");
    Linking.openURL(`https://www.google.com/maps/place/${locationParams}`);
  };

  const handleCalendarIconPress = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const eventData = {
          startDate: createDate(
            eventItem["Start Date"],
            eventItem["Start Time"],
          ),
          endDate: createDate(eventItem["End Date"], eventItem["End Time"]),
          location: eventItem["Event Location"],
          notes: eventItem["Event Description"],
          title: eventItem["Event Title"],
        };
        const { action } = await Calendar.createEventInCalendarAsync(eventData);
        if (action === "saved") {
          console.log("Calendar event created");
          console.log(eventData);
        }
      } else {
        console.error(`Failed to open calendar with status: ${status}`);
      }
    } catch (error) {
      console.error("Failed to open calendar:", error);
    }
  };

  const handleShareIconPress = async () => {
    const icsString = generateIcsString(eventDetails);
    const filename = `event-${Date.now()}.ics`; // Unique filename
    const fileUri = FileSystem.cacheDirectory + filename; // Use cache directory

    try {
      await FileSystem.writeAsStringAsync(fileUri, icsString, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log("ICS file written to:", fileUri);

      // Check if sharing is available
      if (!(await Sharing.isAvailableAsync())) {
        console.error("Sharing is not available on this device.");
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: "text/calendar", // IMPORTANT!
        dialogTitle: "Share Event via Calendar",
        UTI: "com.apple.ical.ics", // iOS specific UTI hint (optional but good)
      });
    } catch (error) {
      console.error("Error creating or sharing ICS file:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.eventDateContainer}>
        <Text style={styles.eventMonthText}>
          {dayjs(eventItem["Start Date"]).format("MMM")}
        </Text>
        <Text style={styles.eventDayOfMonthText}>
          {dayjs(eventItem["Start Date"]).format("D")}
        </Text>
      </View>
      <View style={styles.eventDetailsBox}>
        <View style={styles.topEventDetailsBoxSection}>
          <Text style={styles.eventTitleText}>
            {eventItem["Event Title"].toUpperCase()}
          </Text>
          <View style={styles.eventTimeContainer}>
            <EvilIcons name="clock" size={24} color="gray" />
            <Text style={styles.eventVenueText}>
              {eventItem["Start Time"]} - {eventItem["End Time"]}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => handleLocationPress(eventItem["Event Location"])}
          >
            <View style={styles.eventTimeContainer}>
              <EvilIcons name="location" size={24} color="gray" />
              <Text style={styles.eventVenueText}>
                {eventItem["Event Location"]}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.bottomEventDetailsBoxSection}>
          <Text style={styles.eventDetailsText}>
            {eventItem["Event Description"]}
          </Text>
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
