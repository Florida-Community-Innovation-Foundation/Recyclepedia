import _ from "lodash";
import { getDaysInMonth, format } from "date-fns";

export function getCalendarEvents() {
  const currentDate = new Date();
  const event = {
    month: format(currentDate, "MMM").toUpperCase(),
    name: "Event Name",
    organizer: "Organizer Name",
    time: "Time",
    location: "Location",
  };
  return _.map(
    _.range(
      1,
      getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) + 1,
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
