//This variable links the current date script to the DOM
const todayDateEl = document.querySelector("#todayDate");
// This variable grabs the current hour using moment.js
var currentHour = moment().hour();
//This variable grabs the current date using moment.js
const m = moment().format("dddd, MMMM Do YYYY");
//This array collects the appointment lobels so they can be indexed when pulling from localstorage
const appointments = ["appt9", "appt10", "appt11", "appt12", "appt13", "appt14", "appt15", "appt16", "appt17"]

//This function indexes the appointment elements in the html and assigns local storage values
//that correspond with the appropriate keys in the appointments array
init();
function init() {
$(document).ready(function(){
    for (var j = 9; j < 18; j++){
        $(".appointment").eq(j-9).val(localStorage.getItem(appointments[j-9]));
    }
});
}

//prints today's date to the header
todayDateEl.innerHTML = (m + "<br>");

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

//Save Icon listener waits for a click on a save icon then searches that element's sibling elements
//to determine which hour the appointment is saved to and what the content of the appointment's details are
$(".saveIcon").click(function(){
    var appointment = $(this).siblings(".appointment").val();
    var timeSlot = $(this).siblings(".timeValue").attr("id");

    localStorage.setItem(timeSlot, appointment);
});

//This listener's function listens for a click on the recycle button and checks whether an appointment 
//box has any content loaded. If so, it removes that content and refreshes the page. 
$(".recycleIcon").click(function(){
    var appointment = $(this).siblings(".appointment").val();
    var timeSlot = $(this).siblings(".timeValue").attr("id");

    if (appointment !== ""){
        localStorage.removeItem(timeSlot);
        init();
    };
});


function checkWeather() {

}