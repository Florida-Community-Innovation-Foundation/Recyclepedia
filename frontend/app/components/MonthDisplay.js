import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { printMonthAndYear, daysInMonth } from "../util/date";
import { DayDisplay } from "./DayDisplay";

export function MonthDisplay() {
  const [date, setDate] = useState(new Date());
  const [selectedId, setSelectId] = useState();
  const renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight key={index}>
        <DayDisplay
          dayOfWeek={item.dayOfWeek}
          dayNum={item.dayNum}
          hasEvents={item.hasEvents}
        />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthToggle}>
        <View style={styles.monthTextContainer}>
          <Text style={styles.monthText}>{printMonthAndYear(date)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <EvilIcons name="arrow-left" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <EvilIcons name="arrow-right" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          horizontal={true}
          data={daysInMonth(date)}
          renderItem={renderItem}
          keyExtractor={(item) => item.dayNum}
          extraData={selectedId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  monthTextContainer: {
    flex: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 27,
    height: 27,
  },
  monthText: {
    fontWeight: 400,
    fontSize: 32,
    color: "#fff",
  },
  monthToggle: {
    flex: 1,
    flexDirection: "row",
    marginRight: 21,
  },
});
