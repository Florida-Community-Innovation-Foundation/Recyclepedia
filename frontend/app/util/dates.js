import _ from "lodash";

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
