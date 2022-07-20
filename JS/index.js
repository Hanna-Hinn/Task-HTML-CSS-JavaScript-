var mode = "list";
var formMode = "list";
var urlHref = window.location.href;
var params = new URL(urlHref).searchParams;
if(params.get("mode") != null){
    formMode = params.get("mode");
}else {
    formMode = "list";
}
var name = params.get("id");

if(formMode == "list" || formMode == null || formMode == undefined || formMode == "" ){
    mode = "list";
}else {
    mode = "form";
}

function deConvertDate(date) {
    var tmp = new Date(date);
  
    var formattedNumber = (tmp.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    var formattedDay = (tmp.getDate()).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
  
    var newDate = tmp.getFullYear() + "-" + formattedNumber + "-" + formattedDay;
  
    return newDate;
  }

  

  //This function will change the date format from YYYY-MM-DD to dayName Month dayNum Year(Mun Jul 07 2022)
function formatDate(date) {
    var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var d = new Date(date);
    var day = weekday[d.getDay()];
    var month = months[d.getMonth()];
    var newDate = day + " " + month + " " + d.getDate() + " " +d.getFullYear();
    return newDate;
  }


  //This function will change the date to milliseconds
  function convertToMilliSeconds(date){
    var date = new Date(date);
    var milliseconds = date. getTime();
    return milliseconds;
}



  function onclickList(){
    window.open("./index.html?mode=list", "_self");
  }

  

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


  function onClickNew() {
    window.open("./index.html?mode=add", "_self");
}