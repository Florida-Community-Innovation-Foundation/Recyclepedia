import _ from "lodash";
import { daysInMonth } from "./date";

export function getCalendarEvents() {
  const event = {
    month: "JUL",
    name: "Event Name",
    organizer: "Organizer Name",
    time: "Time",
    location: "Location",
  };
  const currentDate = new Date();
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
