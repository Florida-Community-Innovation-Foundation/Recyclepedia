import _ from "lodash";
import { getDaysInMonth, format } from "date-fns";

export function convertTime(timeString) {
  const [timePrefix, timeSuffix] = _.split(timeString, " ");
  if (timeSuffix == "AM") {
    if (timePrefix.length === 4) return `0${timeSuffix}`;
    return timePrefix;
  }
  const [hour, minutes] = _.split(timePrefix, ":");
  return hour === "12" ? timePrefix : `${parseInt(hour) + 12}:${minutes}`;
}
export function getCalendarEvents(currentDate) {
  const events = [
    {
      eventId: 1,
      startDate: "2025-04-16",
      endDate: "2025-04-16",
      title: "Community Recycling Workshop",
      startTime: "10:22 AM",
      endTime: "12:22 PM",
      location: "Community Center",
      details: "Learn about recycling best practices",
    },
    {
      eventId: 2,
      startDate: "2025-04-17",
      endDate: "2025-04-17",
      title: "Beach Cleanup",
      startTime: "10:22 AM",
      endTime: "01:22 PM",
      location: "Miami Beach",
      details: "Join us for a community beach cleanup",
    },
  ];
  return _.filter(
    events,
    (event) =>
      format(new Date(event.startDate), "MMMM") === format(currentDate, "MMMM"),
  );
}
