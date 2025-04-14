import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { printMonthAndYear, daysInMonth, dayNames } from "../util/date";
import { DayDisplay } from "./DayDisplay";
import _ from "lodash";

function getMonthDisplayData(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const numOfDays = daysInMonth(year, month);

  return _.map(_.range(1, numOfDays + 1), (dayNum) => {
    return {
      dayOfWeek: dayNames[new Date(`${year}-${month}-${dayNum}`).getDay()],
      dayNum: dayNum,
    };
  });
}

export function MonthDisplay() {
  const [date, setDate] = useState(new Date());
  const [selectedId, setSelectId] = useState();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={index}>
        <DayDisplay
          dayOfWeek={item.dayOfWeek}
          dayNum={item.dayNum}
          hasEvents={item.hasEvents}
        />
      </TouchableOpacity>
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
          data={getMonthDisplayData(date)}
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
