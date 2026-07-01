import _ from "lodash";

function convertTime(timeString) {
  const [timePrefix, timeSuffix] = _.split(timeString, " ");
  const [hour, minutes] = _.split(timePrefix, ":");
  let hour24 = parseInt(hour, 10);
  if (timeSuffix === "AM" && hour24 === 12) hour24 = 0; // 12:xx AM is 00:xx
  if (timeSuffix === "PM" && hour24 !== 12) hour24 += 12;
  return `${String(hour24).padStart(2, "0")}:${minutes}`;
}

export function createDate(dateString, timeString) {
  return new Date(`${dateString}T${convertTime(timeString)}`);
}
