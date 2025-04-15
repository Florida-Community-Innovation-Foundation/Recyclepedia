import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { DayDisplay } from "./DayDisplay";
import _ from "lodash";
import { addMonths, subMonths, getDaysInMonth, getDay, format } from "date-fns";

function getMonthDisplayData(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return _.map(_.range(1, getDaysInMonth(date) + 1), (dayNum) => {
    return {
      dayOfWeek: format(new Date(year, month, dayNum), "iii").toUpperCase(),
      dayNum: dayNum,
    };
  });
}

export function MonthDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());
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

  const handleLeftButtonPress = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleRightButtonPress = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthToggle}>
        <View style={styles.monthTextContainer}>
          <Text style={styles.monthText}>
            {format(currentDate, "LLLL yyyy")}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLeftButtonPress}
          >
            <EvilIcons name="arrow-left" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRightButtonPress}
          >
            <EvilIcons name="arrow-right" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          horizontal={true}
          data={getMonthDisplayData(currentDate)}
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
