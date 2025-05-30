import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function DateInput({
  setIsCalendarVisible,
  dateInputField,
  timeInputField,
}) {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [text, setText] = useState(
    `${values[dateInputField]}, ${values[timeInputField]}`,
  );

  const handleCalendarIconPress = () => {
    setIsCalendarVisible((isCalendarVisible) => !isCalendarVisible);
  };

  const handleTimeChange = (event, date) => {
    if (event.type === "set" && date) {
      setSelectedTime(date);
    }
  };

  useEffect(() => {
    const timeString = dayjs(selectedTime).format("hh:mm A");
    setText(`${values[dateInputField]}, ${timeString}`);
    setFieldValue(timeInputField, timeString);
  }, [selectedTime, values]);

  return (
    <View>
      <View style={styles.calendarInput}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={dateInputField}
            placeholderTextColor="#888888" // Set the desired placeholder color
            value={text}
            editable={false}
            pointerEvents="none"
            style={styles.textInput}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <View style={styles.timePicker}>
            <DateTimePicker
              mode="time"
              value={selectedTime}
              display="default"
              onChange={handleTimeChange}
            />
          </View>
          <View style={styles.calendarIcon}>
            <TouchableWithoutFeedback onPress={handleCalendarIconPress}>
              <Entypo name="calendar" size={13} color="black" />
            </TouchableWithoutFeedback>
          </View>
          {((touched[dateInputField] && errors[dateInputField]) ||
            (touched[timeInputField] && errors[timeInputField])) && (
            <Text style={styles.errorText}>
              Valid format: yyyy-mm-dd, hh:mm [AM|PM]
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  textInput: {
    marginTop: 10,
  },
  errorText: {
    fontSize: 13,
    color: "red",
    marginBottom: 10,
    marginLeft: 10,
  },
  calendarIcon: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 5,
  },
  timePicker: {
    flex: 7,
  },
  textInputContainer: {
    flex: 5,
  },
  dateTimeContainer: {
    flex: 4,
    display: "flex",
    flexDirection: "row",
  },
});
