const todayDateEl = document.querySelector("#todayDate");
const input9 = document.querySelector("#input9");

var currentHour = moment().hour();

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


// $(".saveIcon").eq(0).click(function(){
//     var value = input9.value;

//     if (value != "") {
//         localStorage.setItem("input9", value);
//     }
// });

$(".saveIcon").click(function(){

    console.log(this);


    var appointment = $(this).siblings(".appointment").val();
    var timeSlot = $(this).siblings(".timeValue").attr("id");

    // if (apptInput != "") {
        localStorage.setItem(timeSlot, appointment);
    // }
});


console.log(localStorage);