import _ from "lodash";
import { getDaysInMonth, format } from "date-fns";

function convertTime(timeString) {
  const [timePrefix, timeSuffix] = _.split(timeString, " ");
  if (timeSuffix == "AM") {
    if (timePrefix.length === 4) return `0${timeSuffix}`;
    return timePrefix;
  }
  const [hour, minutes] = _.split(timePrefix, ":");
  return hour === "12" ? timePrefix : `${parseInt(hour) + 12}:${minutes}`;
}

export function createDate(dateString, timeString) {
  return new Date(`${dateString}T${convertTime(timeString)}`);
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

export function generateIcsString(eventItem) {
  // Construct ICS string with \r\n line endings
  const icsString = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DiG//Recyclepedia V1.0//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:recyclepedia.events@gmail.com`,
    `DTSTAMP:${new Date().toISOString()}`,
    `DTSTART:${createDate(eventItem.startDate, eventItem.startTime).toISOString()}`,
    `DTEND:${createDate(eventItem.endDate, eventItem.endTime).toISOString()}`,
    `SUMMARY:${eventItem.title}`,
    `DESCRIPTION:${eventItem.details}`,
    `LOCATION:${eventItem.location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0", // Usually 0 for new events
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n"); // Use \r\n as the joiner

  return icsString + "\r\n";
}
