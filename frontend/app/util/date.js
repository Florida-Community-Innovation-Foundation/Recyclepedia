export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export function printMonthAndYear(date) {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}
