import { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { EventDisplay } from "./EventDisplay";
import { getCalendarEvents } from "../util/calendar-events";

export function EventsListDisplay({ dayDisplayPressed }) {
  const [calendarEvents, setCalendarEvents] = useState([]);

  const [selectedId, setSelectId] = useState();

  useEffect(() => {
    setCalendarEvents(getCalendarEvents());
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight key={index}>
        <EventDisplay
          month={item.month}
          dayOfMonth={item.dayOfMonth}
          name={item.name}
          organizer={item.organizer}
          time={item.time}
          location={item.location}
        />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventsDisplayHeader}>
        {dayDisplayPressed ? "EVENTS" : "UPCOMING EVENTS"}
      </Text>
      <View style={styles.eventsListContainer}>
        <FlatList
          scrollEnabled={false}
          data={calendarEvents}
          renderItem={renderItem}
          keyExtractor={(item) => item.eventId}
          extraData={selectedId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  eventsDisplayHeader: {
    fontWeight: 400,
    fontSize: 21,
    color: "#fff",
  },
  eventsListContainer: {
    marginTop: 6,
    marginLeft: 6,
  },
});
