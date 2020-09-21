//This variable links the current date script to the DOM
const todayDateEl = document.querySelector("#todayDate");
// This variable grabs the current hour using moment.js
var currentHour = moment().hour();
//This variable grabs the current date using moment.js
const m = moment().format("dddd, MMMM Do YYYY");
//This array collects the appointment lobels so they can be indexed when pulling from localstorage
const appointments = [
  "appt9",
  "appt10",
  "appt11",
  "appt12",
  "appt13",
  "appt14",
  "appt15",
  "appt16",
  "appt17",
];
//These variables store user's location data
var latitude = "";
var longitude = "";
//This function indexes the appointment elements in the html and assigns local storage values
//that correspond with the appropriate keys in the appointments array. It then calls the function that
//checks the weather and then prints that information to the DOM
init();
function init() {
  $(document).ready(function () {
    for (var j = 9; j < 18; j++) {
      $(".appointment")
        .eq(j - 9)
        .val(localStorage.getItem(appointments[j - 9]));
    }
  });
  getLocation();
}
//prints today's date to the header
todayDateEl.innerHTML = m + "<br>";
//changes the color of the time block based on what time of day it is currently
for (var i = 9; i < 18; i++) {
  if (currentHour > i) {
    $(".timeValue")
      .eq(i - 9)
      .css("background-color", "lightgrey");
  }
  if (currentHour === i) {
    $(".timeValue")
      .eq(i - 9)
      .css("background-color", "pink");
  }
  if (currentHour < i) {
    $(".timeValue")
      .eq(i - 9)
      .css("background-color", "green");
  }
}
//Save Icon listener waits for a click on a save icon then searches that element's sibling elements
//to determine which hour the appointment is saved to and what the content of the appointment's details are
$(".saveIcon").click(function () {
  var appointment = $(this).siblings(".appointment").val();
  var timeSlot = $(this).siblings(".timeValue").attr("id");

  localStorage.setItem(timeSlot, appointment);
});
//This listener's function listens for a click on the recycle button and checks whether an appointment
//box has any content loaded. If so, it removes that content and refreshes the page.
$(".recycleIcon").click(function () {
  var appointment = $(this).siblings(".appointment").val();
  var timeSlot = $(this).siblings(".timeValue").attr("id");

  if (appointment !== "") {
    localStorage.removeItem(timeSlot);
    init();
  }
});
//This function rounds the raw coordinates gathered by getLocation() and inserts those
//rounded values into an openweathermap API call. Finally it references that weather data and prints
//helpful information to the DOM.
function checkWeather() {
  // 22ce314bdb5cf097792a93d02ec2e354 Open Weather API key
  var roundedLat = Math.round(latitude * 1000) / 1000;
  var roundedLong = Math.round(longitude * 1000) / 1000;

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    roundedLat +
    "&lon=" +
    roundedLong +
    "&appid=22ce314bdb5cf097792a93d02ec2e354";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var temperature = (Math.floor(response.main.temp - 273.15) * 9) / 5 + 32;
    var skyState = response.weather[0].description;
    $("#currentWeather").text(
      "Currently " + temperature + " degrees with " + skyState
    );
  });
}
//This function grabs the user's latitude and longitude
function getLocation() {
  var userCoords = navigator.geolocation.getCurrentPosition(function (
    position
  ) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });
  checkWeather();
}
