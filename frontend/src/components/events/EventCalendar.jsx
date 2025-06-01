import dayjs from "dayjs";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Text } from "react-native";
import { Calendar } from "react-native-calendars";

export default function EventCalendar({ isCalendarVisible }) {
  const { setFieldValue, values } = useFormikContext();

  const getMarkedDates = () => {
    const markedDates = [values["Start Date"]];
    do {
      let currentDate = dayjs(markedDates[markedDates.length - 1])
        .add(1, "d")
        .format("YYYY-MM-DD");
      if (dayjs(currentDate).diff(dayjs(values["End Date"]), "d") <= 0) {
        markedDates.push(currentDate);
        currentDate = dayjs(currentDate).add(1, "d").format("YYYY-MM-DD");
      } else {
        break;
      }
    } while (true);
    return _.reduce(
      markedDates,
      (result, markedDate) => {
        let formatting = {
          color: "#70d7c7",
          textColor: "white",
        };
        if (dayjs(markedDate).diff(dayjs(values["Start Date"]), "d") === 0) {
          formatting.startingDay = true;
        }
        if (dayjs(markedDate).diff(dayjs(values["End Date"]), "d") === 0) {
          formatting.endingDay = true;
        }
        result[dayjs(markedDate).format("YYYY-MM-DD")] = formatting;
        return result;
      },
      {},
    );
  };

  const handleDayPress = (day) => {
    if (dayjs(day.dateString).diff(dayjs(values["Start Date"]), "d") < 0) {
      setFieldValue("Start Date", day.dateString);
    } else if (dayjs(day.dateString).diff(dayjs(values["End Date"]), "d") > 0) {
      setFieldValue("End Date", day.dateString);
    } else {
      setFieldValue("Start Date", day.dateString);
      setFieldValue("End Date", day.dateString);
    }
  };

  if (isCalendarVisible) {
    return (
      <Calendar
        markingType="period"
        renderHeader={(date) => {
          return <Text>{dayjs(date).format("MMM YYYY")}</Text>;
        }}
        disableAllTouchEventsForDisabledDays={true}
        minDate={dayjs().format("YYYY-MM-DD")}
        markedDates={getMarkedDates()}
        onDayPress={handleDayPress}
      />
    );
  }
  return <></>;
}
