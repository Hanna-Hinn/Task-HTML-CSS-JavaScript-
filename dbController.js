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
var app = initializeApp(firebaseConfig);
var db = getDatabase();
var data;
var arr = [];

var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf("/") + 1);

var mode;

if (filename == "index.html") {
  mode = "list";
} else {
  mode = "form";
}



function callSubmitForm(arr){
  if(mode == "form"){
    document.getElementById("add-save").addEventListener("click", submitForm);
  }
}



var dbRef = ref(db);
get(child(dbRef, "events/"))
  .then(function feedback(snapshot) {
    if (snapshot.exists()) {
      data = snapshot.val();
      for (var i = 1; i < data.length; i++) {
        var obj = {
          id: i,
          eventName: data[i].eventName,
          description: data[i].description,
          date: data[i].date,
        };
        arr.push(obj);
      }

      if (mode == "list") {
        for (var i = 0; i < arr.length; i++) {
          drawEvent(arr[i]);
        }
      } else {
        var urlHref = window.location.href;
        var params = new URL(urlHref).searchParams;
        var paraId = params.get("id");
        var formMode = params.get("mode");
        if (formMode == null) {
          formMode = "add";
        }

        if (formMode === "save" && mode === "form") {
          console.log(paraId);
          var obj = readReturnId(arr, paraId);

          if (obj != undefined) {
            document.getElementById("name").value = obj.eventName;
            document.getElementById("text-area").innerHTML = obj.description;
            document.getElementById("date").value = deConvertDate(obj.date);
            document.getElementById("add-save").disabled = false;
          } else {
            alert("ERROR : Requested Object does not Exist in DataBase!!!");
          }
        }
      }


      callSubmitForm(arr);
      
    } else {
      alert("NO DATA FOUND");
    }
  })
  // .catch(function error(error) {
  //   alert("UnSuccessFull" + error);
  // });

//Functions

function drawEvent(obj) {
  var container = document.getElementById("container");
  var div = document.createElement("div");
  div.className = "item";
  var header = document.createElement("h5");
  header.innerHTML = obj.eventName;
  var id = document.createElement("p");
  id.innerHTML = obj["id"];
  id.style.display = "none";
  var date = document.createElement("p");
  date.className = "date";
  date.innerHTML = obj.date;
  div.appendChild(header);
  div.appendChild(date);
  div.appendChild(id);
  container.appendChild(div);

  var today = new Date();
  var formattedNumber = (today.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  var currDate =
    today.getFullYear() + "-" + formattedNumber + "-" + today.getDate();

    
  
    let objDate = deConvertDate(obj.date);
  if (objDate == currDate) {
    div.style.backgroundColor = "blue";
    div.style.color = "white";
  } else if (objDate > currDate) {
    div.style.backgroundColor = "purple";
    div.style.color = "white";
  } else {
    div.style.backgroundColor = "red";
    div.style.color = "white";
  }
}

function deConvertDate(date) {
  var tmp = new Date(date);

  var formattedNumber = (tmp.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  var newDate = tmp.getFullYear() + "-" + formattedNumber + "-" + tmp.getDate();

  return newDate;
}

function writeAndUpdate(eventId, name, description, date) {
  set(ref(db, "events/" + eventId), {
    eventName: name,
    description: description,
    date: date,
  })
    .then(function result() {
      alert("Data stored Successfully");
    })
    .catch(function error(error) {
      alert("Unsuccessful, error" + error);
    });
}


function readReturnId(arr, id) {
  console.log(id);
  for (var j = 0; j < arr.length; j++) {
    if (arr[j].id == id) {
      return arr[j];
    }
  }
}



function submitForm() {
  if (formMode == "save") {
    var urlHref = window.location.href;
    var params = new URL(urlHref).searchParams;
    var id = params.get("id");
    var index = readReturnId(arr, id)["id"];
    var eventName = document.getElementById("name").value;
    var oldDate = document.getElementById("date").value;
    var date = formatDate(oldDate);
    var description = document.getElementById("text-area").value;
    writeAndUpdate(index, eventName, description, date);
    window.open("index.html", "_self");
  } else if (formMode == "add") {
    var newIndex = arr.length+1;
    var eventName = document.getElementById("name").value;
    var oldDate = document.getElementById("date").value;
    var newDate = formatDate(oldDate);
    var description = document.getElementById("text-area").value;
    writeAndUpdate(newIndex, eventName, description, newDate);
    window.open("index.html", "_self");
  }
}


function formatDate(date) {
  var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var d = new Date(date);
  var day = weekday[d.getDay()];
  var month = months[d.getMonth()];
  var newDate = day + " " + month + " " + d.getDate() + " " +d.getFullYear();
  return newDate;
}

