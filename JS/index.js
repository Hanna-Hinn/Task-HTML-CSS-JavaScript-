//Index.js this file contains functions that will be used in other javascript files
//It will also determine the mode ("list" Or "form")

//This Part of the Code will read the URL to check the mode
//If theres no mode it will be by default "list"
//If there is a mode it will read it and assign it
/*URL : if { index.html (no mode defined) --> mode="list" || index.html?mode=list --> mode="list" || index.html?mode=form --> mode="form" || 
index.html?mode="save" --> mode="form" and formMode="save" || index.html?mode="add" --> mode="form" and formMode="add"}*/
var mode = "list";
var formMode = "list";
var urlHref = window.location.href;
var params = new URL(urlHref).searchParams; //search for parameters in the URL
if (params.get("mode") != null) {
  formMode = params.get("mode");
} else {
  formMode = "list";
}
var name = params.get("id");

if (
  formMode == "list" ||
  formMode == null ||
  formMode == undefined ||
  formMode == ""
) {
  mode = "list";
} else {
  mode = "form";
}

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

//Onclick event function When the user clicks on the list button
function onclickList() {
  window.open("./index.html?mode=list", "_self");
}

/*
  Event function that will keep track of the input name and date
  if the name && date is filled the save/add button will be enabled
  Otherwise disabled
*/
function checkNameAndDate() {
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;

  if (
    name != "" &&
    name != null &&
    name != undefined &&
    date != "" &&
    date != null &&
    date != undefined
  ) {
    document.getElementById("add-save").disabled = false;
    document.getElementById("add-save").style.cursor = "pointer";
  } else {
    document.getElementById("add-save").disabled = true;
    document.getElementById("add-save").style.cursor = "default";
  }
}

//Onclick Event function for the +New and form button
function onClickNew() {
  window.open("./index.html?mode=add", "_self");
}
