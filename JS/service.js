// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";
import {
  getDatabase,
  onValue,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDK1-uZnCbsABA1LxSa95oDj9SlIZAm238",
  authDomain: "test-ada92.firebaseapp.com",
  databaseURL: "https://test-ada92-default-rtdb.firebaseio.com",
  projectId: "test-ada92",
  storageBucket: "test-ada92.appspot.com",
  messagingSenderId: "434390758256",
  appId: "1:434390758256:web:e6896a3d241ceb514715b5",
  measurementId: "G-VFPDL4P1WX",
};

// Variables
const app = initializeApp(firebaseConfig);
export var db = getDatabase(); //Initializing the database

export var dbRef = ref;
export var data = get(child(dbRef(db), "events/"));
export var sett = set;