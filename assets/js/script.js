/* GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist */

/*variable for saving current time
- object for storing user's input todo and append current time

*/

var currentTime = document.querySelector(".current__time");
var timeSlots = {
	"9AM": { text: "", confirm: false },
	"10AM": { text: "", confirm: false },
	"11AM": { text: "", confirm: false },
	"12AM": { text: "", confirm: false },
	"1PM": { text: "", confirm: false },
	"2PM": { text: "", confirm: false },
	"3PM": { text: "", confirm: false },
	"4PM": { text: "", confirm: false },
	"5PM": { text: "", confirm: false },
};
function init() {
	var clockDisplay = setInterval(() => {
		var time = new Date();
		currentTime.innerText = time;
	}, 1000);
}
// console.log(time);
// console.log("Current Time:", currentTime);
// currentTime.innerHTML = time;
init();
