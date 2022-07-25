//Index.js this file contains functions that will be used in other javascript files

//This function will change the date format from dayName Month dayNum Year(Mun Jul 07 2022) to YYYY-MM-DD
function deConvertDate(date) {
  var tmp = new Date(date);

  var formattedNumber = (tmp.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  var formattedDay = tmp.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  var newDate = tmp.getFullYear() + "-" + formattedNumber + "-" + formattedDay;

  return newDate;
}

//This function will change the date format from YYYY-MM-DD to dayName Month dayNum Year(Mun Jul 07 2022)
function formatDate(date) {
  var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var d = new Date(date);
  var day = weekday[d.getDay()];
  var month = months[d.getMonth()];
  var newDate = day + " " + month + " " + d.getDate() + " " + d.getFullYear();
  return newDate;
}

//This function will change the date to milliseconds
function convertToMilliSeconds(date) {
  var date = new Date(date);
  var milliseconds = date.getTime();
  return milliseconds;
}

/*
  Event function that will keep track of the input name and date
  if the name && date is filled the save/add button will be enabled
  Otherwise disabled
*/
function checkNameAndDate() {
  var name = document.getElementById("name").value;
  var date = document.getElementById("date").value;
  if (name && date) {
    document.getElementById("add-save").disabled = false;
    document.getElementById("add-save").style.cursor = "pointer";
  } else {
    document.getElementById("add-save").disabled = true;
    document.getElementById("add-save").style.cursor = "default";
  }
}

