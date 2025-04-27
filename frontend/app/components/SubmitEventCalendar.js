import dayjs from "dayjs";
import { useFormikContext } from "formik";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";

export default function SubmitEventCalendar({ isCalendarVisible }) {
  const [markedDates, setMarkedDates] = useState([
    dayjs().format("YYYY-MM-DD"),
  ]);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    console.log(markedDates);
    setFieldValue("start", markedDates[0]);
    setFieldValue("end", markedDates[markedDates.length - 1]);
  }, [markedDates]);

  const handleDayPressed = (day) => {
    setMarkedDates((markedDates) => {
      let currentDate;
      const selectedDay = dayjs(day.dateString);
      let newMarkedDates = _.clone(markedDates);
      if (selectedDay.diff(dayjs(newMarkedDates[0])) < 0) {
        currentDate = dayjs(newMarkedDates[0]).subtract(1, "day");
        // Iterate through all the days in the range
        // from start date to current chosen date and mark them
        while (selectedDay.diff(currentDate) <= 0) {
          newMarkedDates.unshift(currentDate.format("YYYY-MM-DD"));
          currentDate = currentDate.subtract(1, "day");
        }
      } else if (
        selectedDay.diff(dayjs(newMarkedDates[newMarkedDates.length - 1])) > 0
      ) {
        currentDate = dayjs(newMarkedDates[newMarkedDates.length - 1]).add(
          1,
          "day",
        );
        // Iterate through all the days in the range
        // from end date to current chosen date and mark them
        while (selectedDay.diff(currentDate) >= 0) {
          newMarkedDates.push(currentDate.format("YYYY-MM-DD"));
          currentDate = currentDate.add(1, "day");
        }
      } else {
        newMarkedDates = _.filter(
          newMarkedDates,
          (markedDate) => selectedDay.diff(markedDate) >= 0,
        );
      }
      return newMarkedDates;
    });
  };

  if (isCalendarVisible) {
    return (
      <Calendar
        markingType="period"
        disableAllTouchEventsForDisabledDays={true}
        minDate={dayjs().format("YYYY-MM-DD")}
        markedDates={_.reduce(
          markedDates,
          (result, markedDate) => {
            result[dayjs(markedDate).format("YYYY-MM-DD")] = {
              color: "#70d7c7",
              textColor: "white",
            };
            return result;
          },
          {},
        )}
        onDayPress={handleDayPressed}
      />
    );
  }
  return <></>;
}
