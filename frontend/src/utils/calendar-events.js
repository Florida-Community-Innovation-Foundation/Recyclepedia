import _ from "lodash";
import { daysInMonth, monthNames } from "./date";

export function getCalendarEvents() {
  const currentDate = new Date();
  const event = {
    month: monthNames[currentDate.getMonth()].toUpperCase().substring(0, 3),
    name: "Event Name",
    organizer: "Organizer Name",
    time: "Time",
    location: "Location",
  };
  return _.map(
    _.range(
      1,
      daysInMonth(currentDate.getFullYear(), currentDate.getMonth()) + 1,
    ),
    (eventId) => {
      return {
        eventId: eventId,
        dayOfMonth: eventId,
        ...event,
      };
    },
  );
}
