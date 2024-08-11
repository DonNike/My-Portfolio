//Original
//initial references
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarm");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio("alarm.mp3");

let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

//Append Zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

//Display time
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

//Display time
timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

//Alarm
alarmsArray.forEach((alarm, index) => {
    if(alarm.isActive){
        if(
            `${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`
        ){
            alarmSound.play();
            alarmSound.loop = true;
        }
    }
});
}

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if(inputValue < 10){
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

//Creating alarm div
const createAlarm = (alarmObj) =>{
  //Keys from object
  const {id, alarmHour, alarmMinute} = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

  //checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if(e.target.checked){
      startAlarm(e);
    } else{
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv)
};

//Set alarm 
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  //alarmObject
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
});

//Start Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let[exists, obj, index] = searchObject("id", searchId);
  if(exists){
    alarmsArray[index].isActive = true;
  }
};

//Stop Alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if(exists){
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

//Delete alarm
const deleteAlarm = (e) =>{
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if(exists){
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

window.onload = () => {
    setInterval(displayTimer);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
};






//Distance calculator
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarm");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio("alarm.mp3");

let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

let initialStopLocation = { latitude: null, longitude: null };

// Append zeroes for single digits
const appendZero = (value) => (value < 10 ? "0" + value : value);

// Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

// Display time
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

  // Display time
  timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  // Check alarms
  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}

// Function to calculate distance between two lat/lng points
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

// Function to get current location and execute callback
const getCurrentLocation = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      callback(latitude, longitude);
    }, (error) => {
      console.error("Geolocation error:", error);
    });
  } else {
    console.error("Geolocation not supported.");
  }
};

// Function to set the initial location when trying to stop the alarm
const setInitialStopLocation = (callback) => {
  getCurrentLocation((latitude, longitude) => {
    initialStopLocation = { latitude, longitude };
    callback();
  });
};

// Handle input validation
const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

// Create alarm div
const createAlarm = (alarmObj) => {
  const { id, alarmHour, alarmMinute } = alarmObj;
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};

// Set alarm
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  getCurrentLocation((latitude, longitude) => {
    let alarmObj = {};
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = false;
    alarmObj.setLocation = { latitude, longitude }; // Store the location when the alarm is set
    alarmsArray.push(alarmObj);
    createAlarm(alarmObj);
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
  });
});

// Start alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
  }
};

// Update Stop Alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    setInitialStopLocation(() => {
      getCurrentLocation((lat, lon) => {
        const distance = getDistance(lat, lon, initialStopLocation.latitude, initialStopLocation.longitude);
        distanceDisplay.innerText = distance.toFixed(2); // Show distance with 2 decimal places
        if (distance >= 8) { // Check if the distance moved is 8 meters or more
          alarmsArray[index].isActive = false;
          alarmSound.pause();
        } else {
          alert(`Move ${8 - distance.toFixed(2)} meters to turn off the alarm.`);
        }
      });
    });
  }
};

// Delete alarm
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

window.onload = () => {
  setInterval(displayTimer);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmsArray = [];
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
}

//Alarm page 2 Original
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alarm Sound</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #ff7e5f, #feb47b);
            font-family: 'Arial', sans-serif;
            color: white;
            text-align: center;
        }
        h1 {
            font-size: 3em;
            margin-bottom: 20px;
        }
        audio {
            display: none;
        }
        button {
            padding: 10px 20px;
            font-size: 1.2em;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div>
        <h1>Alarm is ringing!</h1>
        <audio id="alarmSound" autoplay loop>
            <source src="alarm.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <button onclick="stopAlarm()">Stop Alarm</button>
    </div>

    <script>
        const alarmSound = document.getElementById('alarmSound');

        function stopAlarm() {
            alarmSound.pause();
            alarmSound.currentTime = 0;

            // Extract alarm ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const alarmId = urlParams.get('alarmId');

            // Redirect to the main page
            window.location.href = `index7.html?stopAlarmId=${alarmId}`;
        }
    </script>
</body>
</html>
