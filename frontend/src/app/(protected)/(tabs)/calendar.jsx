import dayjs from "dayjs";
import { BlurView } from "expo-blur";
import _ from "lodash";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { EventsListDisplay } from "~/components/events/EventsListDisplay";
import { MonthDisplay } from "~/components/events/MonthDisplay";
import SubmitEventModal from "~/components/events/SubmitEventModal";
import { getCalendarEvents } from "~/utils/calendarEvents.js";
import { normalize } from "~/utils/normalize";

export default function Home({ navigation }) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [calendarEvents, setCalendarEvents] = useState(getCalendarEvents());
  const [dayDisplaysPressed, setDayDisplaysPressed] = useState(
    _.map(_.range(0, dayjs(currentDate).daysInMonth()), () => false),
  );
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);

  const submitEventButtonHandlePress = () => {
    setIsCalendarVisible(true);
    setIsEventModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Ad space */}
        <View style={styles.adSpaceContainer}>
          <Text style={styles.adSpaceText}> AD SPACE </Text>
        </View>
        {/* Month view */}
        <View style={styles.monthViewContainer}>
          <MonthDisplay
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            dayDisplaysPressed={dayDisplaysPressed}
            setDayDisplaysPressed={setDayDisplaysPressed}
          />
        </View>
        {/* Events View */}
        <View style={styles.eventsViewContainer}>
          <EventsListDisplay
            calendarEvents={calendarEvents}
            dayDisplaysPressed={dayDisplaysPressed}
            currentDate={currentDate}
          />
        </View>
      </ScrollView>
      {/* Submit Event View */}
      <BlurView intensity={10} style={styles.submitEventViewContainer}>
        <View style={styles.submitEventButton}>
          <Button
            title="SUBMIT AN EVENT"
            color="#fff"
            onPress={submitEventButtonHandlePress}
          />
        </View>
      </BlurView>
      <SubmitEventModal
        isEventModalVisible={isEventModalVisible}
        setIsEventModalVisible={setIsEventModalVisible}
        setCalendarEvents={setCalendarEvents}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#024935",
    height: "100%",
  },
  scrollContainer: {
    paddingBottom: normalize(20, "height"),
    marginLeft: normalize(16, "width"),
    marginRight: normalize(16, "width"),  
  },
  adSpaceContainer: {
    marginTop: normalize(50, "height"),
    backgroundColor: "#16513D",
    height: normalize(56, "height"),
    justifyContent: "center",
    alignItems: "center",
  },
  adSpaceText: {
    color: "#fff",
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: normalize(52, "height"),
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  searchBarIconContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: normalize(8, "width"),
  },
  monthViewContainer: {
    marginLeft: normalize(5, "width"),
    marginRight: normalize(5, "width"),
    marginTop: normalize(10, "height"),
  },
  eventsViewContainer: {
    marginTop: normalize(20, "height"),
  },
  submitEventViewContainer: {
    position: "absolute",
    top: 640,
    height: normalize(120, "height"),
    backgroundColor: "#024935",
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },
  submitEventButton: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#fff",
    height: "50%",
    justifyContent: "center",
    marginTop: normalize(25, "height"),
    padding: normalize(10),
  },
  submitEventButtonText: {
    color: "#fff",
    justifyContent: "center",
    textAlign: "center",
  },
});
