import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { EventDisplay } from "./EventDisplay";

export function EventsListDisplay({
  calendarEvents,
  dayDisplaysPressed,
  currentDate,
}) {
  const [displayedCalendarEvents, setDisplayedCalendarEvents] =
    useState(calendarEvents);

  useEffect(() => {
    if (_.indexOf(dayDisplaysPressed, true) !== -1) {
      const filteredCalendarEvents = _.filter(
        calendarEvents,
        (event) =>
          dayjs(event["Start Date"]).date() ===
          _.indexOf(dayDisplaysPressed, true) + 1,
      );
      setDisplayedCalendarEvents(filteredCalendarEvents);
    }
  }, [dayDisplaysPressed]);

  useEffect(() => {
    const filteredCalendarEvents = _.filter(
      calendarEvents,
      (event) =>
        dayjs(event["Start Date"]).month() === dayjs(currentDate).month(),
    );
    setDisplayedCalendarEvents(filteredCalendarEvents);
  }, [currentDate]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight key={index}>
        <EventDisplay eventItem={item} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventsDisplayHeader}>
        {_.indexOf(dayDisplaysPressed, true) !== -1
          ? "EVENTS"
          : "UPCOMING EVENTS"}
      </Text>
      <View style={styles.eventsListContainer}>
        <FlatList
          scrollEnabled={false}
          data={displayedCalendarEvents}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
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
