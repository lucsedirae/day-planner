const todayDateEl = document.querySelector("#todayDate");

var currentHour = moment().hour();
var timeArray = ["9","10","11","12","13","14","15","16","17"];

const m = moment().format("dddd, MMMM Do YYYY");

//prints today's date to the header
todayDateEl.innerHTML = m;

//changes the color of the time block based on what time of day it is currently
for (var i = 9; i < 18; i++) {
    if (currentHour > i){
        $(".timeValue").eq(i-9).css("background-color", "lightgrey");
    }
    if (currentHour === i){
        $(".timeValue").eq(i-9).css("background-color", "pink");
    }
    if (currentHour < i){
        $(".timeValue").eq(i-9).css("background-color", "green");
    }
}

