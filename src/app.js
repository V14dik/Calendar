import "../style.css";
import "../scripts";
import "./routing";
import "./month-table.html";
import "./week-table.html";
import "./year-table.html";
import "./add-new.html";
import "./add-theme.html";
import "./sign-in.html";
import "./sign-up.html";
import "./month";
import "./week";
import "./year";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { async } from "@firebase/util";
import { User } from "./user";
import { pushThemes } from "../scripts";
import { showMonthCalendar } from "./month";
const { app } = require("./firebase");
const { db } = require("./firebase");

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const asideSignUpButton = document.getElementById("aside_sign_in");
  const asideExitButton = document.getElementById("aside_exit_button");
  const signInButton = document.getElementById("enter_button");
  const signUpButton = document.getElementById("reg_button");
  const exitButton = document.getElementById("exit_button");
  const asideSignInButton = document.getElementById("asid_sign_up");
  if (user) {
    if (localStorage.getItem("UID") !== null) {
      signInButton.classList.add("button-not-active");
      signUpButton.classList.add("button-not-active");
      exitButton.classList.remove("button-not-active");
      asideSignInButton.classList.add("button-not-active");
      asideSignUpButton.classList.add("button-not-active");
      asideExitButton.classList.remove("button-not-active");
      pushThemes();
    }
  } else {
    signInButton.classList.remove("button-not-active");
    signUpButton.classList.remove("button-not-active");
    exitButton.classList.add("button-not-active");
    asideSignInButton.classList.remove("button-not-active");
    asideSignUpButton.classList.remove("button-not-active");
    asideExitButton.classList.add("button-not-active");
  }
});

window.registration = async function () {
  const emailRegistrationInput = document.getElementById("reg_login");
  const passwordRegistrationInput = document.getElementById("reg_password");
  try {
    await createUserWithEmailAndPassword(
      auth,
      emailRegistrationInput.value,
      passwordRegistrationInput.value
    );
    emailRegistrationInput.value = "";
    passwordRegistrationInput.value = "";
    alert("Вы зарегистрированы");
    //window.history.back();
  } catch ({ message }) {
    alert(message);
  }
};

window.enter = async function () {
  const emailLoginInput = document.getElementById("enter_login");
  const passwordLoginInput = document.getElementById("enter_password");
  try {
    await signInWithEmailAndPassword(
      auth,
      emailLoginInput.value,
      passwordLoginInput.value
    );
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        localStorage.setItem("UID", uid);
        User.readEventsFromDB(uid);
        User.readThemesFromDB(uid);
      }
    });
    emailLoginInput.value = "";
    passwordLoginInput.value = "";
  } catch ({ message }) {
    alert(message);
  }
};

window.exit = function () {
  localStorage.removeItem("UID");
  localStorage.removeItem("events");
  localStorage.removeItem("themes");
  auth.signOut();
  const themesContainer = document.getElementById("themes_container");
  themesContainer.innerHTML = "";
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  showMonthCalendar(currentMonth, currentYear, false);
};

window.addEventToDB = async function () {
  const eventName = document.getElementById("event_name");
  const day = document.getElementById("date_from");
  const timeFrom = document.getElementById("time_from");
  const timeTill = document.getElementById("time_till");
  const theme = document.getElementById("theme");
  const user = auth.currentUser;
  if (user) {
    const event = {
      uid: user.uid,
      name: eventName.value,
      day: day.value,
      timeFrom: timeFrom.value,
      timeTill: timeTill.value,
      theme: theme.value,
    };
    await User.addEvent(event, user.uid);
  }
};

window.addThemeToDB = async function () {
  const themeName = document.getElementById("new_theme_name");
  const themeColor = document.getElementById("new_theme_color");
  const user = auth.currentUser;
  if (user) {
    const theme = {
      uid: user.uid,
      name: themeName.value,
      color: themeColor.value,
    };
    await User.addTheme(theme, user.uid);
  }
};
