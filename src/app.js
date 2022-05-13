import "../style.css";
import "../scripts";
import { enter, reg } from "./registery";

const regButton = document.getElementById("sign_up_button");
const enterButton = document.getElementById("sign_in_button");

const emailRegistrationInput = document.getElementById("reg_login");
const passwordRegistrationInput = document.getElementById("reg_password");

const emailLoginInput = document.getElementById("enter_login");
const passwordLoginInput = document.getElementById("enter_password");

regButton.onclick = async () => {
  try{
    await reg(emailRegistrationInput.value, passwordRegistrationInput.value);
    emailRegistrationInput.value = "";
    passwordRegistrationInput.value = "";
  }catch({message}){
    alert(message);
  }
}

enterButton.onclick = async () => {
  try{
    await enter(emailLoginInput.value, passwordLoginInput.value);
    emailLoginInput.value = "";
    passwordLoginInput.value = "";
  }catch({message}){
    alert(message);
  }
}