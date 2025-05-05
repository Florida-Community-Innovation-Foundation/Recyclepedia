export function getCalendarEvents() {
  return [
    {
      "Start Date": "2025-04-16",
      "End Date": "2025-04-16",
      "Event Title": "Community Recycling Workshop",
      "Start Time": "10:22 AM",
      "End Time": "12:22 PM",
      "Event Location": "Community Center",
      "Event Description": "Learn about recycling best practices",
    },
    {
      "Start Date": "2025-04-17",
      "End Date": "2025-04-17",
      "Event Title": "Beach Cleanup",
      "Start Time": "10:22 AM",
      "End Time": "01:22 PM",
      "Event Location": "Miami Beach",
      "Event Description": "Join us for a community beach cleanup",
    },
  ];
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
    `DTSTART:${createDate(eventItem["Start Date"], eventItem["Start Time"]).toISOString()}`,
    `DTEND:${createDate(eventItem["End Date"], eventItem["End Time"]).toISOString()}`,
    `SUMMARY:${eventItem["Event Title"]}`,
    `DESCRIPTION:${eventItem["Event Description"]}`,
    `LOCATION:${eventItem["Event Location"]}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0", // Usually 0 for new events
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n"); // Use \r\n as the joiner

  return icsString + "\r\n";
}
