import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useFormikContext } from "formik";
import _ from "lodash";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const capitalizeEachWord = (string) => {
  return _.chain(string)
    .split(" ")
    .map((word) => _.capitalize(word))
    .join(" ")
    .value();
};

export default function SubmitEventInput({
  inputField,
  inputFieldCategory,
  setIsCalendarVisible,
}) {
  const { handleChange, handleBlur, values, setFieldValue, errors, touched } =
    useFormikContext();

  const handleCalendarIconPress = () => {
    setIsCalendarVisible((isCalendarVisible) => !isCalendarVisible);
  };

  const handleTimeInputChange = (event, dateTime) => {
    if (event.type === "set") {
      dayjs.extend(utc);
      setFieldValue(
        inputField,
        dayjs(dateTime).local().format("YYYY-MM-DD, hh:mm A"),
      );
    }
  };

  return (
    <View key={inputField}>
      <View
        style={
          inputFieldCategory === "Date"
            ? styles.calendarInput
            : { ...styles.calendarInput, paddingBottom: 10 }
        }
      >
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={capitalizeEachWord(
              inputFieldCategory === "Date"
                ? `${inputField} ${inputFieldCategory}`
                : `${inputFieldCategory} ${inputField}`,
            )}
            placeholderTextColor="#888888" // Set the desired placeholder color
            onChangeText={handleChange(inputField)}
            onBlur={handleBlur(inputField)}
            value={values[inputField]}
            multiline={inputField === "description"}
            style={inputFieldCategory === "Date" ? styles.textInput : {}}
          />
        </View>
        {inputFieldCategory === "Date" ? (
          <View style={styles.dateTimeContainer}>
            <View style={styles.timePicker}>
              <DateTimePicker
                mode="time"
                value={dayjs(values[inputField]).toDate()}
                onChange={handleTimeInputChange}
              />
            </View>
            <View style={styles.calendarIcon}>
              <TouchableWithoutFeedback onPress={handleCalendarIconPress}>
                <Entypo name="calendar" size={13} color="black" />
              </TouchableWithoutFeedback>
            </View>
          </View>
        ) : null}
      </View>
      {errors[inputField] && touched[inputField] && (
        <Text style={styles.errorText}>{errors[inputField]}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 13,
    color: "red",
    marginBottom: 10,
    marginLeft: 10,
  },
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
  calendarIcon: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 5,
  },
  timePicker: {
    flex: 6,
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    marginTop: 10,
  },
  dateTimeContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
});
