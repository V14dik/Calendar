import { showWeekCalendar } from "./src/week";
import { showMonthCalendar } from "./src/month";
import { showYearCalendar } from "./src/year";

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

//FOR POPUP

// date_from.min = new Date().toISOString().split("T")[0];
// date_till.min = new Date().toISOString().split("T")[0];
// date_from.onchange = ({ target: { value } }) => {
//   date_till.setAttribute(
//     "min",
//     value || new Date().toISOString().split("T")[0]
//   );
// };
// const calendarHeader = document.getElementById("calendar-header");
//showMonthCalendar(currentMonth, currentYear, false);

document.addEventListener("DOMContentLoaded", function () {
  route().then(() => showMonthCalendar(currentMonth, currentYear, false));
  console.log("hj");
});

const Nowdate = new Date();
const WeekFirstDay = new Date(Nowdate - Nowdate.getDay() * 86400000);
const WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);

const menuBtn = document.querySelector(".menu-btn");
const mobileAside = document.querySelector(".mobile-aside");
const calendarContainer = document.querySelector(".calendar-container");
const calendarTable = document.querySelector(".calendar-table");
const calendarBody = document.querySelector(".calendar-body");
const mobileAsideContainer = document.querySelector(".mobile-aside-container");

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("active");
  mobileAsideContainer.classList.toggle("mobile-aside-container-active");
  mobileAside.classList.toggle("mobile-aside-active");
});

window.next = function () {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showMonthCalendar(currentMonth, currentYear);
};

window.previous = function () {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showMonthCalendar(currentMonth, currentYear);
};

window.onButtonClick = async function (type) {
  const [week, month, year] = document.querySelectorAll(".nav-button");
  const pressed = "nav-button--pressed";
  const nonActive = "days-non-active";
  const weekTable = document.getElementById("week_table");
  const monthTable = document.getElementById("month_table");
  const yearTable = document.getElementById("year_table");

  week.classList.remove(pressed);
  month.classList.remove(pressed);
  year.classList.remove(pressed);

  switch (type) {
    case "week":
      week.classList.add(pressed);
      await route();
      showWeekCalendar(WeekFirstDay, WeekLastDay);
      break;
    case "month":
      month.classList.add(pressed);
      await route();
      showMonthCalendar(currentMonth, currentYear, false);
      break;
    case "year":
      year.classList.add(pressed);
      await route();
      showYearCalendar(currentYear);
      break;
  }
};
