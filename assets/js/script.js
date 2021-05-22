var time = moment();
var currentTime = document.querySelector(".current__time");
// var confirmButton = document.querySelector(".confirm__button");
// confirmButton.addEventListener("click", savetoStorage);
var inputCol = document.getElementById("input__col");
var confirmCol = document.getElementById("confirm__col");
var timeSlots = [
	{
		// Data structure for holding data of TODO App
		900: { text: "", confirm: false, hour: 9 },
		1000: { text: "", confirm: false, hour: 10 },
		1100: { text: "", confirm: false, hour: 11 },
		1200: { text: "", confirm: false, hour: 12 },
		1300: { text: "", confirm: false, hour: 13 },
		1400: { text: "", confirm: false, hour: 14 },
		1500: { text: "", confirm: false, hour: 15 },
		1600: { text: "", confirm: false, hour: 16 },
		1700: { text: "", confirm: false, hour: 17 },
	},
];

function init() {
	checkAvail();
	for (var i = 0; i < confirmCol.children.length; i++) {
		// Algorithm dynamically creates submit buttons based on the amount of input fields in the page
		var makeButton = document.createElement("button");
		makeButton.innerText = "Confirm";
		makeButton.setAttribute("class", "btn btn-primary");
		makeButton.addEventListener("click", savetoStorage);
		console.log(makeButton);
		confirmCol.children[i].append(makeButton);
	}
	// add event listeners to input fields
	for (var i = 0; i < inputCol.children.length; i++) {
		//add event listener for every input field
		inputCol.children[i].children[0].setAttribute("onkeydown", "getInput()");
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
			switch (
				currentHour === timeSlots[0][Object.keys(timeSlots[0])[i]].hour // Switch statement to check current hour and color chart accordingly
			) {
				case true:
					var inputColchildren = inputCol.children;
					inputColchildren[i].children[0].setAttribute(
						"class",
						" form-control input-lg bg-secondary"
					);
					break;
				case false:
					if (currentHour > timeSlots[0][Object.keys(timeSlots[0])[i]].hour) {
						var inputColchildren = inputCol.children;
						inputColchildren[i].children[0].setAttribute(
							"class",
							" form-control input-lg bg-danger"
						);
					} else {
						var inputColchildren = inputCol.children;
						inputColchildren[i].children[0].setAttribute(
							"class",
							" form-control input-lg bg-success"
						);
					}
					break;
			}
		}
	} else {
		for (var i = 0; i < Object.keys(timeSlots[0]).length; i++) {
			// For every item in timeslots[0]: 9 Items
			var inputColchildren = inputCol.children;
			inputColchildren[i].children[0].setAttribute(
				"class",
				" form-control input-lg bg-danger"
			);
		}
	}
}
function getInput() {
	console.log("Typing");
}
function savetoStorage(event) {
	console.log(event);
}

init();
