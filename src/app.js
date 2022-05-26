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
const { app } = require("./firebase");

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
    //window.history.back();
  } catch ({ message }) {
    alert(message);
  }
};

window.enter = async function () {
  console.log("jk");
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
      }
    });
    emailLoginInput.value = "";
    passwordLoginInput.value = "";
    //window.history.back();
  } catch ({ message }) {
    alert(message);
  }
};

window.exit = function () {
  console.log("exit");
  localStorage.removeItem("UID");
  auth.signOut();
};
