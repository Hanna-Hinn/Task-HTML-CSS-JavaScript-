import { data, sett, dbRef, db } from "./service.js"; //importing required variables from the database
import { onClickList } from "./displayCards.js";

/*Note: I forgot to tell you But when calling the already defined array in the displayCards.js
  it did not return any data so i re made it here also,
  and in case if the user went to the form mode directly.
*/
var arr = []; //Array of objects that will have the data saved in it
var formMode;

//Will add the event Listeners to the form-button and create-new button
document
  .getElementsByClassName("form-button")[0]
  .addEventListener("click", onClickFormAdd);
document
  .getElementsByClassName("create-new")[0]
  .addEventListener("click", onClickFormAdd);

function onClickFormAdd() {
  clickOnForm();
}

//The main function that will change the document and assgining the formMode
export function clickOnForm(eventId) {
  if (!eventId) {
    formMode = "add";
  } else {
    formMode = "save";
  }


  var formHtml = `
  <form id="cont-form"> 
    <div class="col"> 
      <label for="name"> Name: </label> 
      <input type="text" id="name" name="name" placeholder="Event Name..." oninput ="checkNameAndDate();"/>
    </div>
    <div class="col">
      <label for="text-area"> Description: </label>
      <textarea id="text-area" name="text-area" placeholder="Details about the event..."></textarea> 
    </div> 
    <div class="col"> 
      <label for="date"> Date: </label> 
      <input type="date" id="date" name="date" oninput ="checkNameAndDate();"/> 
    </div> 
    <div class="col"> 
      <a href="index.html" class="cancel"> Cancel </a> 
      <input type="submit" value="Add" id="add-save" disabled/> 
    </div>
  </form>`;

  document.getElementById("container").style.display = "flex";
  document.getElementById("container").innerHTML = formHtml;

  document.getElementsByClassName("form-button")[0].classList.add("selected");
  document
    .getElementsByClassName("list-button")[0]
    .classList.remove("selected");

  if (formMode == "add") {
    document.getElementsByClassName("header-text")[0].innerHTML =
      "Create Events";
    document.getElementsByClassName("create-new")[0].style.display = "none";
    document.getElementById("add-save").value = "add";
  } else if (formMode == "save") {
    document.getElementsByClassName("create-new")[0].style.display = "block";
    document.getElementsByClassName("header-text")[0].innerHTML = "Edit Event";
    document.getElementById("add-save").value = "save";
  }
  document.getElementById("add-save").disabled = true;
  document.getElementById("add-save").style.cursor = "default";

  data
    .then(function feedback(snapshot) {
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

        if (formMode === "save") {
          var obj = readReturnId(arr, eventId);
          callSubmitForm(eventId);
          if (obj != undefined) {
            //Filling the form with the Event details we clicked on
            document.getElementById("name").value = obj.eventName;
            document.getElementById("text-area").innerHTML = obj.description;
            document.getElementById("date").value = deConvertDate(obj.date);
            document.getElementById("add-save").disabled = false;
          }
        } else if (formMode === "add") {
          document.getElementById("name").value = null;
          document.getElementById("text-area").innerHTML = "";
          document.getElementById("date").value = undefined;
          document.getElementById("add-save").disabled = true;
          callSubmitForm(eventId);
        }
      }
    })
    .catch(function error(error) {
      alert("UnSuccessFull" + error);
    });
}

/*
  The function that will write new event in the database if the it does not exists
  It will Update if the Id exists
  Note: The eventId is sequentially saved in the database
*/
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
  var found = arr.find((element) => element.id.toString() === id);

  return found;
}

//This function will add the event listener to the add/save button with the submitForm function=
//And remove the default properties of the form
function callSubmitForm(eventId) {
  var submit_form = document.getElementById("cont-form");
  submit_form.onsubmit = function (e) {
    e.preventDefault();
  };
  document.getElementById("add-save").addEventListener("click", function () {
    submitForm(eventId);
  });
}

//The function that is responsible for Saving or Adding the Events in the database
//Based on the form modes
function submitForm(eventId) {
  if (formMode == "save") {
    var index = readReturnId(arr, eventId)["id"];
    var eventName = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var description = document.getElementById("text-area").value;
    writeAndUpdate(index, eventName, description, date);
    onClickList();
  } else if (formMode == "add") {
    var newIndex = arr.length + 1;
    var eventName = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var description = document.getElementById("text-area").value;
    writeAndUpdate(newIndex, eventName, description, date);
    onClickList();
  }
}
