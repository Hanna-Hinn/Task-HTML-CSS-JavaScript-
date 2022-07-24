import { data, sett, dbRef, db } from "./service.js"; //importing required variables from the database

//Adding onclick event listeners for the form and +New button
document
  .getElementsByClassName("form-button")[0]
  .addEventListener("click", onClickFormAdd);
document
  .getElementsByClassName("create-new")[0]
  .addEventListener("click", onClickFormAdd);
/*Note: I forgot to tell you But when calling the already defined array in the displayCards.js
  it did not return any data so i re made it here also,
  and in case if the user went to the form mode directly.
*/
var arr = []; //Array of objects that will have the data saved in it


function onClickFormAdd() {
  formMode = "add";
  clickOnForm();
}


export function clickOnForm() {
  mode = "form";

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
  document.getElementsByClassName("list-button")[0].classList.remove("selected");


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

        //Checking the URL and Reading the eventId from it as a parameter
        if (formMode === "save" && mode === "form") {
          var obj = readReturnId(arr, eventId);
          callSubmitForm(arr);
          if (obj != undefined) {
            //Filling the form with the Event details we clicked on
            document.getElementById("name").value = obj.eventName;
            document.getElementById("text-area").innerHTML = obj.description;
            document.getElementById("date").value = deConvertDate(obj.date);
            document.getElementById("add-save").disabled = false;
          }
        } else if (formMode === "add" && mode === "form") {
          document.getElementById("name").value = null;
            document.getElementById("text-area").innerHTML = "";
            document.getElementById("date").value = undefined;
            document.getElementById("add-save").disabled = true;
          callSubmitForm(arr);
        }
      }
    })
    .catch(function error(error) {
      alert("UnSuccessFull" + error);
    });
}

/*
  The function that will write new event in the database if the it does not exists
  It will Update if the Id exists4
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

  var found = arr.find(element => element.id.toString() === id);

  return found;
}

//This function will add the event listener to the add/save button with the submitForm function=
//And remove the default properties of the form
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
