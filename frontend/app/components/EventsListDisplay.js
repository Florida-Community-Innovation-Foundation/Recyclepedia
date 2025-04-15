import { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import _ from "lodash";
import { EventDisplay } from "./EventDisplay";

export function EventsListDisplay({ calendarEvents, dayDisplayPressed }) {
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
        {dayDisplayPressed ? "EVENTS" : "UPCOMING EVENTS"}
      </Text>
      <View style={styles.eventsListContainer}>
        <FlatList
          scrollEnabled={false}
          data={calendarEvents}
          renderItem={renderItem}
          keyExtractor={(item) => item.eventId}
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
