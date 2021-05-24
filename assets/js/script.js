var time = moment();
var currentTime = document.querySelector(".current__time");
// var confirmButton = document.querySelector(".confirm__button");
// confirmButton.addEventListener("click", savetoStorage);
var inputCol = document.getElementById("input__col");
var confirmCol = document.getElementById("confirm__col");
var currentHour = time._d.getHours(); // Gets the current hour (0-24)
var timeSlots = [
	{
		// Data structure for holding data of TODO App
		900: { text: "", confirm: false, hour: 9, button: "btn0" },
		1000: { text: "", confirm: false, hour: 10, button: "btn1" },
		1100: { text: "", confirm: false, hour: 11, button: "btn2" },
		1200: { text: "", confirm: false, hour: 12, button: "btn3" },
		1300: { text: "", confirm: false, hour: 13, button: "btn4" },
		1400: { text: "", confirm: false, hour: 14, button: "btn5" },
		1500: { text: "", confirm: false, hour: 15, button: "btn6" },
		1600: { text: "", confirm: false, hour: 16, button: "btn7" },
		1700: { text: "", confirm: false, hour: 17, button: "btn8" },
	},
];

function init() {
	checkAvail();
	for (var i = 0; i < confirmCol.children.length; i++) {
		// Algorithm dynamically creates submit buttons based on the amount of input fields in the page
		var makeButton = document.createElement("button");
		makeButton.innerText = "Confirm";
		makeButton.setAttribute("class", "btn btn-primary");
		makeButton.setAttribute("id", "submit__button");
		makeButton.setAttribute("data-buttonIndex", i);
		confirmCol.children[i].append(makeButton);
		makeButton.addEventListener("click", function (makeButton) {
			var buttonIndex = makeButton.originalTarget.dataset.buttonindex;
			var inputIndex =
				inputCol.children[makeButton.originalTarget.dataset.buttonindex]
					.children[0].dataset.indexnumber;
			var inputValue =
				inputCol.children[makeButton.originalTarget.dataset.buttonindex]
					.children[0].value;
			savetoStorage(inputValue, inputIndex);
			// var inputText = inputCol.children[makeButton.]
		});
	}
}

var clockDisplay = setInterval(() => {
	var time = new Date();
	currentTime.innerText = time;
}, 1000);
currentTime.innerText = clockDisplay;

function checkAvail() {
	// Checks if current time is within the range of times (9am - 5pm)
	if (currentHour > 9 && currentHour < 17) {
		for (var i = 0; i < Object.keys(timeSlots[0]).length; i++) {
			// For every item in timeSlots[0]: 9 Items
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
function savetoStorage(value, index) {
	console.log("savetoStorage()", value, index);
	timeSlots[0][Object.keys(timeSlots[0])[index]].text = value;
	timeSlots[0][Object.keys(timeSlots[0])[index]].index = index;
	localStorage.setItem(
		"timeSlotsstore",
		JSON.stringify(timeSlots[0])[Object.keys(timeSlots[0])[index]]
	);
}

init();
