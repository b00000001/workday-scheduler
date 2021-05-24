var time = moment();
var currentTime = document.querySelector(".current__time");
// var confirmButton = document.querySelector(".confirm__button");
// confirmButton.addEventListener("click", savetoStorage);
var inputCol = document.getElementById("input__col");
var confirmCol = document.getElementById("confirm__col");
var timeslotArray = []; // Array to hold the full array of timeslots that have been altered
var currentHour = 11; // Gets the current hour (0-24)
var timeSlots = JSON.parse(localStorage.getItem("timeSlots")) || {
	// Data structure for holding data of TODO App
	9: "",
	10: "",
	11: "",
	12: "",
	13: "",
	14: "",
	15: "",
	16: "",
	17: "",
};

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

	/* 
    ----
    
    ----
    */

	for (var i = 0; i < Object.keys(timeSlots).length; i++) {
		inputCol.children[i].children[0].value =
			timeSlots[Object.keys(timeSlots)[i]];
	}
}

var clockDisplay = setInterval(() => {
	var time = new Date();
	currentTime.innerText = time;
}, 1000);
currentTime.innerText = clockDisplay;
/* 
----
This section dynamically colors the input fields based on past present and future
Past: Red
Present: Grey
Future: Green
----
*/
function checkAvail() {
	// Checks if current time is within the range of times (9am - 5pm)
	if (currentHour >= 9 && currentHour <= 17) {
		console.log("Currently within office hours");
		for (var i = 0; i < Object.keys(timeSlots).length; i++) {
			// For every item in timeSlots: 9 Items

			var inputColchildren = inputCol.children[i].children[0];
			switch (currentHour === parseInt(Object.keys(timeSlots)[i])) {
				// Switch statement to check current hour and color chart accordingly
				case true:
					inputColchildren.setAttribute(
						"class",
						" form-control input-lg bg-secondary"
					);
					break;
				case false:
					if (currentHour > parseInt(Object.keys(timeSlots)[i])) {
						inputColchildren.setAttribute(
							"class",
							" form-control input-lg bg-danger"
						);
					} else {
						inputColchildren.setAttribute(
							"class",
							" form-control input-lg bg-success"
						);
					}
					break;
			}
		}
	} else {
		/* 
        --------
        This section creates input fields dynamically based on the number of timeslots.

        --------
        */
		for (var i = 0; i < Object.keys(timeSlots).length; i++) {
			// For every item in timeSlots: 9 Items

			inputColchildren[i].children[0].setAttribute(
				"class",
				" form-control input-lg bg-danger"
			);
		}
	}
}

function savetoStorage(value, index) {
	console.log("savetoStorage()", value, index);
	timeSlots[Object.keys(timeSlots)[index]] = value;

	// timeslotArray.push(timeSlots[Object.keys(timeSlots)[index]]);

	localStorage.setItem("timeSlots", JSON.stringify(timeSlots));
}

init();
