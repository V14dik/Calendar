const Nowdate = new Date();
const WeekFirstDay = new Date(Nowdate - Nowdate.getDay() * 86400000);
const WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);

//showWeekCalendar(WeekFirstDay, WeekLastDay);

export function showWeekCalendar(start, end) {
  const calendarHeader = document.getElementById("week-calendar-header");
  let dayStartWeek = start.getDate();
  let monthStartWeek = start.getMonth();
  let dayEndWeek = end.getDate();
  let monthEndWeek = end.getMonth();
  if (dayStartWeek < 10) {
    dayStartWeek = "0" + dayStartWeek;
  }
  if (monthStartWeek < 10) {
    monthStartWeek = "0" + monthStartWeek;
  }
  if (dayEndWeek < 10) {
    dayEndWeek = "0" + dayEndWeek;
  }
  if (monthEndWeek < 10) {
    monthEndWeek = "0" + monthEndWeek;
  }
  calendarHeader.innerHTML = `${dayStartWeek}.${monthStartWeek}-${dayEndWeek}.${monthEndWeek}`;
  const tbl = document.getElementById("week-body");
  tbl.innerHTML = "";
  for (let i = 0; i < 24; i++) {
    const row = document.createElement("tr");
    row.classList.add("week-tr");
    const hourCell = document.createElement("td");
    hourCell.classList.add("week-td");
    hourCell.innerHTML = i + ":00";
    row.appendChild(hourCell);

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      cell.classList.add("week-table-body-cell");
      cell.classList.add("week-td");
      row.appendChild(cell);
    }
    tbl.appendChild(row);
  }
}
