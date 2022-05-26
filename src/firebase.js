// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const { apiKey } = require("./token");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "calendar-57a3d.firebaseapp.com",
  projectId: "calendar-57a3d",
  storageBucket: "calendar-57a3d.appspot.com",
  messagingSenderId: "28412066807",
  appId: "1:28412066807:web:c09279063e190be7484cf2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
