const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const months = [
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

export function showMonthCalendar(month, year, flag = false) {
  const calendarHeader = document.getElementById("calendar-header");
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  let tbl = null;
  if (flag === true) {
    tbl = document.createElement("tbody");
  } else {
    tbl = document.getElementById("calendar-body");
  }

  tbl.innerHTML = "";
  if (flag === false) {
    calendarHeader.innerHTML = months[month] + " " + year;
  }
  let date = 1;
  for (let i = 0; i < 6; i++) {
    if (date > daysInMonth) {
      break;
    }
    const row = document.createElement("tr");
    if (flag === true) {
    } else {
      row.classList.add("month-tr");
    }

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else {
        const cell = document.createElement("td");
        cell.classList.add("month-td");
        const cellContent = document.createElement("div");
        cellContent.classList.add("calendar-cell");
        const cellText = document.createElement("span");
        cellText.innerHTML = date;
        cellText.classList.add("cell-number");
        cellContent.appendChild(cellText);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("calendar-event-td");
          cellContent.classList.add("calendar-event-cell");
          const eventName = document.createElement("span");
          eventName.innerHTML = "Meeting";
          cellContent.appendChild(eventName);
          const time = document.createElement("span");
          time.innerHTML = "10:00 - 11:00";
          time.classList.add("event-time");
          cellContent.appendChild(time);
        } // color today's date
        cell.appendChild(cellContent);
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row);
  }
  return tbl;
}
