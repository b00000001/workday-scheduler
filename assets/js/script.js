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
var time = moment();
var currentTime = document.querySelector(".current__time");
// var confirmButton = document.querySelector(".confirm__button");
// confirmButton.addEventListener("click", savetoStorage);
var inputCol = document.getElementById("input__col");
var confirmCol = document.getElementById("confirm__col");
var timeSlots = [
	{
		// Data structure for holding data of TODO App
		"9AM": { text: "", confirm: false, hour: 9 },
		"10AM": { text: "", confirm: false, hour: 10 },
		"12AM": { text: "", confirm: false, hour: 11 },
		"11AM": { text: "", confirm: false, hour: 12 },
		"1PM": { text: "", confirm: false, hour: 13 },
		"2PM": { text: "", confirm: false, hour: 14 },
		"3PM": { text: "", confirm: false, hour: 15 },
		"4PM": { text: "", confirm: false, hour: 16 },
		"5PM": { text: "", confirm: false, hour: 17 },
	},
];

function init() {
	checkAvail();
	for (var i = 0; i < confirmCol.children.length; i++) {
		var makeButton = document.createElement("button");
		makeButton.innerText = "Confirm";
		makeButton.setAttribute("class", "btn btn-primary");
		makeButton.addEventListener("click", function () {
			console.log("Click!");
		});
		console.log(makeButton);
		confirmCol.children[i].append(makeButton);
	}
	var clockDisplay = setInterval(() => {
		var time = new Date();
		currentTime.innerText = time;
	}, 1000);
	currentTime.innerText = clockDisplay;
}

function checkAvail() {
	var currentHour = time._d.getHours(); // Gets the current hour (0-24)
	// Checks if current time is within the range of times (9am - 5pm)
	if (currentHour > 9 && currentHour < 17) {
		for (var i = 0; i < Object.keys(timeSlots[0]).length; i++) {
			// For every item in timeslots[0]: 9 Items
			if (currentHour < timeSlots[0][Object.keys(timeSlots[0])[i]].hour) {
				var inputColchildren = inputCol.children;
				inputColchildren[i].children[0].setAttribute(
					"class",
					" form-control input-lg bg-success"
				);
			} else {
				inputColchildren = inputCol.children;
				for (var j = 0; j < inputColchildren.length; j++) {
					inputColchildren[j].children[0].setAttribute(
						"class",
						" form-control input-lg bg-secondary"
					);
				}
			}
		}
	}
}

function savetoStorage() {
	console.log("confirm button");
}

init();
