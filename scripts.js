import { showWeekCalendar } from "./src/week";
import { showMonthCalendar } from "./src/month";
import { showYearCalendar } from "./src/year";

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

//FOR POPUP

// date_from.onchange = ({ target: { value } }) => {
//   date_till.setAttribute(
//     "min",
//     value || new Date().toISOString().split("T")[0]
//   );
// };

document.addEventListener("DOMContentLoaded", function () {
  route().then(() => showMonthCalendar(currentMonth, currentYear, false));
});

const Nowdate = new Date();
const WeekFirstDay = new Date(Nowdate - Nowdate.getDay() * 86400000);
const WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);

const menuBtn = document.querySelector(".menu-btn");
const mobileAside = document.querySelector(".mobile-aside");
const mobileAsideContainer = document.querySelector(".mobile-aside-container");

export function pushThemesInForm() {
  const select = document.getElementById("theme");
  let themes = [];
  try {
    themes = JSON.parse(localStorage.getItem("themes"));
  } catch {}
  themes.forEach((theme) => {
    const themeOption = document.createElement("option");
    themeOption.innerHTML = theme.name;
    themeOption.value = theme.name;
    select.appendChild(themeOption);
  });
}

export function pushThemes() {
  const themesContainer = document.getElementById("themes_container");
  let themes = [];
  try {
    themes = JSON.parse(localStorage.getItem("themes"));
  } catch {}
  themes.forEach((theme) => {
    const themeConteiner = document.createElement("div");
    themeConteiner.classList.add("theme-container");
    const themeTitle = document.createElement("label");
    themeTitle.classList.add("theme-title");
    themeTitle.innerHTML = theme.name;
    const themeCheckbox = document.createElement("input");
    themeCheckbox.setAttribute("type", "checkbox");
    themeCheckbox.classList.add("theme-checkbox");
    themeConteiner.appendChild(themeTitle);
    themeConteiner.appendChild(themeCheckbox);
    themeConteiner.style.backgroundColor = theme.color;
    themesContainer.appendChild(themeConteiner);
  });
}

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("active");
  mobileAsideContainer.classList.toggle("mobile-aside-container-active");
  mobileAside.classList.toggle("mobile-aside-active");
});

window.next = function (type) {
  switch (type) {
    case "month":
      currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      currentMonth = (currentMonth + 1) % 12;
      showMonthCalendar(currentMonth, currentYear);
      break;
    case "year":
      currentYear = currentYear + 1;
      showYearCalendar(currentYear);
      break;
  }
};

window.previous = function (type) {
  switch (type) {
    case "month":
      currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      showMonthCalendar(currentMonth, currentYear);
      break;
    case "year":
      currentYear = currentYear - 1;
      console.log("year");
      showYearCalendar(currentYear);
      break;
  }
};

window.onButtonClick = async function (type) {
  const [week, month, year] = document.querySelectorAll(".nav-button");
  const pressed = "nav-button--pressed";

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
