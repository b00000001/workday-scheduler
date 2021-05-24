var time = moment();
var currentTime = document.querySelector(".current__time");
// var confirmButton = document.querySelector(".confirm__button");
// confirmButton.addEventListener("click", savetoStorage);
var inputCol = document.getElementById("input__col");
var confirmCol = document.getElementById("confirm__col");
var timeslotArray = [];
var currentHour = time._d.getHours(); // Gets the current hour (0-24)
var timeSlots = [
	{
		// Data structure for holding data of TODO App
		900: { hour: "9", buttonId: "btn0" },
		1000: { hour: "10", buttonId: "btn1" },
		1100: { hour: "11", buttonId: "btn2" },
		1200: { hour: "12", buttonId: "btn3" },
		1300: { hour: "13", buttonId: "btn4" },
		1400: { hour: "14", buttonId: "btn5" },
		1500: { hour: "15", buttonId: "btn6" },
		1600: { hour: "16", buttonId: "btn7" },
		1700: { hour: "17", buttonId: "btn8" },
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

	/* 
    ----
    This section checks if the local storage timeSlotsstore Array exists and if it does then
    A message is logged to the console and for each object entry in storageData object
    a check is run to verify if the object at the position of the iterator has a 'text' field
    if so, the corresponding input value is retrieved from storage.
    ----
    */
	// if (window.localStorage.timeSlotsstore) {
	// 	storageData = JSON.parse(window.localStorage.timeSlotsstore);
	// 	console.log("Data in local store", storageData);
	// 	for (var i = 0; i < Object.keys(storageData).length; i++) {
	// 		if (storageData[Object.keys(storageData)[i]].text) {
	// 			inputCol.children[i].children[0].value =
	// 				storageData[Object.keys(storageData)[0]].text;
	// 		}
	// 	}
	// }
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
		/* 
        --------
        This section creates input fields dynamically based on the number of timeslots.

        --------
        */
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

	timeslotArray.push(timeSlots[0][Object.keys(timeSlots[0])[index]]);
	console.log(JSON.stringify(timeslotArray));
	console.log("parsed", JSON.parse(timeslotArray));
	localStorage.setItem("timeSlotsstore", timeslotArray);
}

init();
