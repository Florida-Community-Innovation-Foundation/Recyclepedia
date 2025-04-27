import EvilIcons from "@expo/vector-icons/EvilIcons";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";
import _ from "lodash";
import { useEffect, useState } from "react";
import { InstantSearch } from "react-instantsearch-core";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { EventsListDisplay } from "../components/EventsListDisplay";
import SubmitEventModal from "../components/modals/SubmitEventModal";
import { MonthDisplay } from "../components/MonthDisplay";
import { SearchBox } from "../components/SearchBox";
import { getCalendarEvents } from "../util/calendarEvents";

const searchClient = algoliasearch("YourApplicationID", "YourSearchOnlyAPIKey");

export default function Home({ navigation }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [dayDisplaysPressed, setDayDisplaysPressed] = useState(
    _.map(_.range(0, dayjs(currentDate).daysInMonth()), (dayNum) => false),
  );
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);

  useEffect(() => {
    setCalendarEvents(getCalendarEvents(currentDate));
  }, [currentDate]);

  useEffect(() => {
    if (_.indexOf(dayDisplaysPressed, true) !== -1) {
      setCalendarEvents(
        _.filter(
          getCalendarEvents(currentDate),
          (event) =>
            parseInt(dayjs(event.startDate).date()) ===
            _.indexOf(dayDisplaysPressed, true) + 1,
        ),
      );
    }
  }, [dayDisplaysPressed]);

  const submitEventButtonHandlePress = () => {
    setIsCalendarVisible(true);
    setIsEventModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Search bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBarIconContainer}>
            <EvilIcons name="search" size={24} color="black" />
          </View>
          <InstantSearch searchClient={searchClient} indexName="INDEX_NAME">
            <SearchBox />
          </InstantSearch>
        </View>
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
            dayDisplayPressed={_.indexOf(dayDisplaysPressed, true) !== -1}
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
    paddingBottom: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  adSpaceContainer: {
    marginTop: 10,
    backgroundColor: "#16513D",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  adSpaceText: {
    color: "#fff",
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 52,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  searchBarIconContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 8,
  },
  monthViewContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  eventsViewContainer: {
    marginTop: 20,
  },
  submitEventViewContainer: {
    position: "absolute",
    top: 640,
    height: 120,
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
    marginTop: 25,
    padding: 10,
  },
  submitEventButtonText: {
    color: "#fff",
    justifyContent: "center",
    textAlign: "center",
  },
});
