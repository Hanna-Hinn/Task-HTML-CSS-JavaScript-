import { data } from "./service.js";

var arr = [];//Array of objects that will have the Data from the database

//checks the mode before Running
if ((formMode == "list")) {

    //Doing the required changes for the list
    document.getElementById("list").style.backgroundColor = "yellow";
    document.getElementById("list").style.borderRadius = "50%";
    document.getElementById("form-button").style.backgroundColor =
      "transparent";
    document.getElementById("form-button").style.border = "none";
    document.getElementById("header-text").innerHTML = "Events";
    document.getElementById("create-new").style.display = "block";

  //Reading the data
  data.then(function feedback(snapshot) {
    if (snapshot.exists()) {
      var data = snapshot.val(); //Reading the data
      for (var i = 1; i < data.length; i++) {
        var obj = {
          // Obj that will represent each event
          id: i,
          eventName: data[i].eventName,
          description: data[i].description,
          date: formatDate(data[i].date),
        };
        arr.push(obj); // pushing the objects in the Array
      }

      //Drawing the Event Cards
      for (var i = 0; i < arr.length; i++) {
        drawEvent(arr[i]);
      }
    } else { //If the Firebase is empty
      alert("NO DATA FOUND");
    }
  }) //If any errors happen
    .catch(function error(error) {
      alert("UnSuccessFull" + error);
    });
}

//Function that will dynamically build the event cards
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
    // this will make the months in 2 digital format, Ex: 07
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  var formattedDay = (today.getDate()).toLocaleString("en-US", {
    // this will make the days in 2 digital format, Ex: 07
    minimumIntegerDigits: 2,
    useGrouping: false,
  });


  var currDate =
    today.getFullYear() + "-" + formattedNumber + "-" + formattedDay;

  // This is the part of the code that will color the events
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

  // after making the cards we add onClick event listener
  div.addEventListener("click", function (event) {
    var eventId = div.getElementsByTagName("p")[1].innerHTML;
    window.open("../index.html?mode=save&id=" + eventId, "_self");
  });
}
