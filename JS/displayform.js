import { data, sett, dbRef, db } from "./service.js";

document.getElementById("form-button").addEventListener("click", onClickForm);
document.getElementById("create-new").addEventListener("click", onClickForm);

function onClickForm() {
  var formHtml =
    '<form id="cont-form"> <div class="col"> <label for="name"> Name: </label> <input type="text"id="name" name="name" placeholder="Event Name..." oninput ="checkNameAndDate();"/></div><div class="col"><label for="text-area"> Description: </label> <textarea id="text-area" name="text-area" placeholder="Details about the event..."></textarea> </div> <div class="col"> <label for="date"> Date: </label> <input type="date" id="date" name="date" oninput ="checkNameAndDate();"/> </div> <div class="col"> <a href="index.html" class="cancel"> Cancel </a> <input type="submit" value="Add" id="add-save" disabled/> </div>';

  document.getElementById("container").style.display = "flex";
  document.getElementById("container").innerHTML = formHtml;

  document.getElementById("list").style.backgroundColor = "transparent";
  document.getElementById("list").style.border = "none";
  document.getElementById("form-button").style.borderRadius = "50%";
  document.getElementById("form-button").style.backgroundColor = "yellow";
  document.getElementById("form-button").style.borderRadius = "50%";

  if (formMode == "add") {
    document.getElementById("header-text").innerHTML = "Create Events";
    document.getElementById("create-new").style.display = "none";
    document.getElementById("add-save").value = "add";
  } else if (formMode == "save") {
    document.getElementById("create-new").style.display = "block";
    document.getElementById("header-text").innerHTML = "Edit Event";
    document.getElementById("add-save").value = "save";
  }
  document.getElementById("add-save").disabled = true;
  document.getElementById("add-save").style.cursor = "default";
}

var arr = [];

if (mode == "form") {
  onClickForm();
  data.then(function feedback(snapshot) {
    if (snapshot.exists()) {
      var data = snapshot.val(); //Reading the data
      for (var i = 1; i < data.length; i++) {
        var obj = {
          // Obj that will represent each event
          id: i,
          eventName: data[i].eventName,
          description: data[i].description,
          date: data[i].date,
        };
        arr.push(obj); // pushing the objects in the Array
      }

      var urlHref = window.location.href;
      var params = new URL(urlHref).searchParams;
      var paraId = params.get("id");
      console.log(formMode +"//"+mode );
      if (formMode === "save" && mode === "form") {
        var obj = readReturnId(arr, paraId);
        callSubmitForm(arr);
        if (obj != undefined) {
          //Filling the form with the Event details we clicked on
          document.getElementById("name").value = obj.eventName;
          document.getElementById("text-area").innerHTML = obj.description;
          document.getElementById("date").value = deConvertDate(obj.date);
          document.getElementById("add-save").disabled = false;
        } else {
          alert("NO DATA FOUND");
        }
      } else if (formMode == "add" && mode == "form") {
        callSubmitForm(arr);
      }
    }
  })
  .catch(function error(error) {
    alert("UnSuccessFull" + error);
  });
};

function writeAndUpdate(eventId, name, description, date) {
  sett(dbRef(db, "events/" + eventId), {
    eventName: name,
    description: description,
    date: convertToMilliSeconds(date),
  })
    .then(function result() {
      alert("Data stored Successfully");
    })
    .catch(function error(error) {
      alert("Unsuccessful, error" + error);
    });
}

//This will return the obj that contains a certain id
function readReturnId(arr, id) {
  for (var j = 0; j < arr.length; j++) {
    if (arr[j].id == id) {
      return arr[j];
    }
  }
}

function callSubmitForm(arr) {
  var submit_form = document.getElementById("cont-form");
  submit_form.onsubmit = function (e) {
    e.preventDefault();
  };
  document.getElementById("add-save").addEventListener("click", submitForm);
}

//The function that is responsible for Saving or Adding the Events in the database
//Based on the form modes
function submitForm() {
  if (formMode == "save") {
    var urlHref = window.location.href;
    var params = new URL(urlHref).searchParams;
    var id = params.get("id");
    var index = readReturnId(arr, id)["id"];
    var eventName = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var description = document.getElementById("text-area").value;
    writeAndUpdate(index, eventName, description, date);
    window.open("./index.html?mode=list", "_self");
  } else if (formMode == "add") {
    var newIndex = arr.length + 1;
    var eventName = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var description = document.getElementById("text-area").value;
    writeAndUpdate(newIndex, eventName, description, date);
    window.open("./index.html?mode=list", "_self");
  }
}
