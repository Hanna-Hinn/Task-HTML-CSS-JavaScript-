var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf("/") + 1);
let urlHref = window.location.href;
let params = new URL(urlHref).searchParams;
let name = params.get("id");
let formMode = params.get("mode");
if (formMode == null) {
  formMode = "add";
}

if (filename === "index.html") {
  mode = "list";
  checkMode();
} else {
  mode = "form";
  checkMode();
}

if (formMode === "save" && mode === "form") {
  checkFormMode();
} else if (formMode === "add" && mode === "form") {
  checkFormMode();
}

function checkMode() {
  if (mode === "list") {
    document.getElementById("list").style.backgroundColor = "yellow";
    document.getElementById("list").style.borderRadius = "50%";
    document.getElementById("form-button").style.backgroundColor =
      "transparent";
    document.getElementById("form-button").style.border = "none";
    document.getElementById("header-text").innerHTML = "Events";
    document.getElementById("create-new").style.display = "block";
  } else if (mode === "form") {
    document.getElementById("list").style.backgroundColor = "transparent";
    document.getElementById("list").style.border = "none";
    document.getElementById("form-button").style.borderRadius = "50%";
    document.getElementById("form-button").style.backgroundColor = "yellow";
    document.getElementById("form-button").style.borderRadius = "50%";
  }
}
// Add Or Save

function checkFormMode() {
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
}

// checkFormMode();

function onClickNew() {
  window.open("./createEventPage.html?mode=add", "_self");
}

function clickOnItem() {
  const collection = document.getElementsByClassName("item");

  for (let i = 0; i < collection.length; i++) {
    collection[i].addEventListener("click", function (event) {
      // do something
      var eventId = collection[i].getElementsByTagName("p")[1].innerHTML;
      console.log(eventId);
      window.open(
        "./createEventPage.html?mode=save&id=" + eventId,
        "_self"
      );
    });
  }
}

function requestForm() {

  window.open(
    "./createEventPage.html?mode=add",
    "_self"
  );
}

function requestNewForm() {
  window.open("./createEventPage.html?mode=add", "_self");
}


var delayInMilliseconds = 2000; //2 second

setTimeout(function () {
  //your code to be executed after 2 second
  clickOnItem();
}, delayInMilliseconds);



function checkNameAndDate() {
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;

  if ( name != "" && name != null && name!=undefined && date != "" && date != null && date != undefined ){
    document.getElementById("add-save").disabled = false;
  }else {
    document.getElementById("add-save").disabled = true;
  }
}
