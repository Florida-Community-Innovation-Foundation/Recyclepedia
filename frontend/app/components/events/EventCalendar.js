import dayjs from "dayjs";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Calendar } from "react-native-calendars";

export default function EventCalendar({ isCalendarVisible }) {
  const { setFieldValue, values } = useFormikContext();

  const getMarkedDates = () => {
    const markedDates = [values["Start Date"]];
    do {
      let currentDate = dayjs(markedDates[markedDates.length - 1])
        .add(1, "d")
        .format("YYYY-MM-DD");
      if (dayjs(currentDate).diff(dayjs(values["End Date"], "d")) <= 0) {
        markedDates.push(currentDate);
        currentDate = dayjs(currentDate).add(1, "d").format("YYYY-MM-DD");
      } else {
        break;
      }
    } while (true);
    return _.reduce(
      markedDates,
      (result, markedDate) => {
        result[dayjs(markedDate).format("YYYY-MM-DD")] = {
          color: "#70d7c7",
          textColor: "white",
        };
        return result;
      },
      {},
    );
  };

  const handleDayPressed = (day) => {
    if (dayjs(day.dateString).diff(dayjs(values["Start Date"]), "d") < 0) {
      setFieldValue("Start Date", day.dateString);
    } else if (dayjs(day.dateString).diff(dayjs(values["End Date"]), "d") > 0) {
      setFieldValue("End Date", day.dateString);
    } else {
      setFieldValue("Start Date", day.dateString);
    }
  };

  if (isCalendarVisible) {
    return (
      <Calendar
        markingType="period"
        disableAllTouchEventsForDisabledDays={true}
        minDate={values["Start Date"]}
        markedDates={getMarkedDates()}
        onDayPress={handleDayPressed}
      />
    );
  }
  return <></>;
}
