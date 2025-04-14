import _ from "lodash";

const monthNames = [
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

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function daysInMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const numOfDays = new Date(year, month, 0).getDate();
  console.log(numOfDays);
  const result = _.map(_.range(1, numOfDays + 1), (dayNum) => {
    return {
      dayOfWeek: dayNames[new Date(`${year}-${month}-${dayNum}`).getDay()],
      dayNum: dayNum,
      hasEvents: true,
    };
  });
  console.log(result);
  return result;
}

export function printMonthAndYear(date) {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}
