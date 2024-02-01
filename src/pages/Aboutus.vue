

<script setup>

import { ref } from 'vue';
const rows = 12;
const columns = 7;
const globalEventsArray = Array.from({ length: rows }, () => Array(columns).fill(''));
getDate();



const eventDay = ref("");
const eventHour = ref(0);
const eventName = ref("");

const CreatepopupVisible = ref(false);
const popupVisible = ref(false); //popup for creating an event
const EditpopupVisible = ref(false); //popup for editing an event

function clickCell(eventDayAndHours) { //this function will open a popup, based on the contents of the cell
  eventDay.value = eventDayAndHours.substring(0, 3);
  eventHour.value = parseInt(eventDayAndHours.substring(3));

  let cellId = eventDay.value + eventHour.value;
  let cell = document.getElementById(cellId);

  if (cell.innerHTML.trim() !== '') { //if cell is not empty
    EditpopupVisible.value = true; //opens edit menu
  }
  else {
    popupVisible.value = true; //opens creation menu
  }
  console.log("Event Day: " + eventDay.value);
  console.log("Event Hour: " + eventHour.value);
  console.log("Event Hour: " + cell.value);
}

function getDate() {
  let currentDate = new Date();

// Get the current date, month, and year
  let dayOfWeek = currentDate.getDay();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  let year = currentDate.getFullYear();

  let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Output the current date
  console.log("Current Date: " + year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day);

      //document.getElementById("mon").value = "Boo";
}

function createEvent() { //used for creating events
  popupVisible.value = false;
  const eventNameValue = eventName.value;

  if (eventNameValue && eventHour.value > 6 && eventHour.value < 19) {
    let cellId = eventDay.value + eventHour.value;
    let cell = document.getElementById(cellId);
    cell.innerHTML = eventNameValue;
    cell.style.backgroundColor = document.getElementById("colorDropdown").value; // Change this to the desired color
  }
  else {
    alert("invalid");
  }

 
  
 //add event to array
const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (var i = 0; i < daysOfWeek.length; i++) {
  if(daysOfWeek[i] == eventDay.value) {
    globalEventsArray[i][eventHour.value - 7] = eventNameValue;
  }
}
for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 7; j++) {
      console.log("Value at row "+ i + " column "  + j + " " + globalEventsArray[i][j].value);
    }
  }
  eventName.value = "";
  closePopup();
}

function createEventButton() { //used for creating events
  CreatepopupVisible.value = true;
}
function displayEvent() {

}

function editEvent() {
  closePopup();
  alert("bana")
}
function closePopup() { //closes all popups
  popupVisible.value = false;
  EditpopupVisible.value = false;
  CreatepopupVisible.value = false;
}

function deleteEvent() {
  let cellId = eventDay.value + eventHour.value;
  let cell = document.getElementById(cellId);
  cell.innerHTML = "";
  cell.style.backgroundColor = "white";
  closePopup();
}
</script>

<template>
  <table class='table'>
    <tr>
      <th></th>
      <th id="mon">Mon</th>
      <th id="tue">Tue</th>
      <th id="wed">Wed</th>
      <th id="thu">Thu</th>
      <th id="fri">Fri</th>
      <th id="sat">Sat</th>
      <th id="sun">Sun</th>
    </tr>
    <tr>
      <th class="hour">07:00</th>
      <td id="mon7" @click="clickCell('mon7')" @dblclick="editEvent('mon7')"></td>
      <td id="tue7" @click="clickCell('tue7')"></td>
      <td id="wed7" @click="clickCell('wed7')"></td>
      <td id="thu7" @click="clickCell('thu7')"></td>
      <td id="fri7" @click="clickCell('fri7')"></td>
      <td id="sat7" @click="clickCell('sat7')"></td>
      <td id="sun7" @click="clickCell('sun7')"></td>
    </tr>
    <tr>
      <th class="hour">08:00</th>
      <td id="mon8" @click="clickCell('mon8')"></td>
      <td id="tue8" @click="clickCell('tue8')"></td>
      <td id="wed8" @click="clickCell('wed8')"></td>
      <td id="thu8" @click="clickCell('thu8')"></td>
      <td id="fri8" @click="clickCell('fri8')"></td>
      <td id="sat8" @click="clickCell('sat8')"></td>
      <td id="sun8" @click="clickCell('sun8')"></td>
    </tr>
    <tr>
      <th class="hour">09:00</th>
      <td id="mon9" @click="clickCell('mon9')"></td>
      <td id="tue9" @click="clickCell('tue9')"></td>
      <td id="wed9" @click="clickCell('wed9')"></td>
      <td id="thu9" @click="clickCell('thu9')"></td>
      <td id="fri9" @click="clickCell('fri9')"></td>
      <td id="sat9" @click="clickCell('sat9')"></td>
      <td id="sun9" @click="clickCell('sun9')"></td>
    </tr>
    <tr>
      <th class="hour">10:00</th>
      <td id="mon10" @click="clickCell('mon10')"></td>
      <td id="tue10" @click="clickCell('tue10')"></td>
      <td id="wed10" @click="clickCell('wed10')"></td>
      <td id="thu10" @click="clickCell('thu10')"></td>
      <td id="fri10" @click="clickCell('fri10')"></td>
      <td id="sat10" @click="clickCell('sat10')"></td>
      <td id="sun10" @click="clickCell('sun10')"></td>
    </tr>
    <tr>
      <th class="hour">11:00</th>
      <td id="mon11" @click="clickCell('mon11')"></td>
      <td id="tue11" @click="clickCell('tue11')"></td>
      <td id="wed11" @click="clickCell('wed11')"></td>
      <td id="thu11" @click="clickCell('thu11')"></td>
      <td id="fri11" @click="clickCell('fri11')"></td>
      <td id="sat11" @click="clickCell('sat11')"></td>
      <td id="sun11" @click="clickCell('sun11')"></td>
    </tr>
    <tr>
      <th class="hour">12:00</th>
      <td id="mon12" @click="clickCell('mon12')"></td>
      <td id="tue12" @click="clickCell('tue12')"></td>
      <td id="wed12" @click="clickCell('wed12')"></td>
      <td id="thu12" @click="clickCell('thu12')"></td>
      <td id="fri12" @click="clickCell('fri12')"></td>
      <td id="sat12" @click="clickCell('sat12')"></td>
      <td id="sun12" @click="clickCell('sun12')"></td>
    </tr>
    <tr>
      <th class="hour">13:00</th>
      <td id="mon13" @click="clickCell('mon13')"></td>
      <td id="tue13" @click="clickCell('tue13')"></td>
      <td id="wed13" @click="clickCell('wed13')"></td>
      <td id="thu13" @click="clickCell('thu13')"></td>
      <td id="fri13" @click="clickCell('fri13')"></td>
      <td id="sat13" @click="clickCell('sat13')"></td>
      <td id="sun13" @click="clickCell('sun13')"></td>
    </tr>
    <tr>
      <th class="hour">14:00</th>
      <td id="mon14" @click="clickCell('mon14')"></td>
      <td id="tue14" @click="clickCell('tue14')"></td>
      <td id="wed14" @click="clickCell('wed14')"></td>
      <td id="thu14" @click="clickCell('thu14')"></td>
      <td id="fri14" @click="clickCell('fri14')"></td>
      <td id="sat14" @click="clickCell('sat14')"></td>
      <td id="sun14" @click="clickCell('sun14')"></td>
    </tr>
    <tr>
      <th class="hour">15:00</th>
      <td id="mon15" @click="clickCell('mon15')"></td>
      <td id="tue15" @click="clickCell('tue15')"></td>
      <td id="wed15" @click="clickCell('wed15')"></td>
      <td id="thu15" @click="clickCell('thu15')"></td>
      <td id="fri15" @click="clickCell('fri15')"></td>
      <td id="sat15" @click="clickCell('sat15')"></td>
      <td id="sun15" @click="clickCell('sun15')"></td>
    </tr>
    <tr>
      <th class="hour">16:00</th>
      <td id="mon16" @click="clickCell('mon16')"></td>
      <td id="tue16" @click="clickCell('tue16')"></td>
      <td id="wed16" @click="clickCell('wed16')"></td>
      <td id="thu16" @click="clickCell('thu16')"></td>
      <td id="fri16" @click="clickCell('fri16')"></td>
      <td id="sat16" @click="clickCell('sat16')"></td>
      <td id="sun16" @click="clickCell('sun16')"></td>
    </tr>
    <tr>
      <th class="hour">17:00</th>
      <td id="mon17" @click="clickCell('mon17')"></td>
      <td id="tue17" @click="clickCell('tue17')"></td>
      <td id="wed17" @click="clickCell('wed17')"></td>
      <td id="thu17" @click="clickCell('thu17')"></td>
      <td id="fri17" @click="clickCell('fri17')"></td>
      <td id="sat17" @click="clickCell('sat17')"></td>
      <td id="sun17" @click="clickCell('sun17')"></td>
    </tr>
    <tr>
      <th class="hour">18:00</th>
      <td id="mon18" @click="clickCell('mon18')"></td>
      <td id="tue18" @click="clickCell('tue18')"></td>
      <td id="wed18" @click="clickCell('wed18')"></td>
      <td id="thu18" @click="clickCell('thu18')"></td>
      <td id="fri18" @click="clickCell('fri18')"></td>
      <td id="sat18" @click="clickCell('sat18')"></td>
      <td id="sun18" @click="clickCell('sun18')"></td>
    </tr>
  </table>

 
  <div id="popupEdit" v-if="EditpopupVisible" class="popup-content">
    <span @click="closePopup()" class="close">&times;</span>
    <h3>Edit Event</h3>

    <label for="eventName">Event Name:</label>
    <input type="text" v-model="eventName" id="eventName" placeholder="Event Name" required>

    <label for="eventDescription">Event Description:</label>
    <textarea v-model="eventDescription" id="eventDescription" placeholder="Event Description"></textarea>

    <label for="eventColor">Change Color:<br></label>
    <select id="colorDropdown">
      <option value="pink">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <!-- Add more color options as needed -->
    </select>
    <table>
      <br>
      <tr>
        <th><button class="createEventButton" @click="createEvent()">Confirm Changes</button></th>
      </tr>
      <br>
      <tr>
        <th><button class="createEventButton" @click="deleteEvent()">Clear Event</button></th>
      </tr>
    </table>
  </div>




  <div id="popupCreate" v-if="CreatepopupVisible" class="popup-content">
    <span @click="closePopup()" class="close">&times;</span>
    <h3>Create Event</h3>

    <label for="eventName">Event Name:</label>
    <input type="text" v-model="eventName" id="eventName" placeholder="Event Name" required>

    <label for="eventDescription">Event Description:</label>
    <textarea v-model="eventDescription" id="eventDescription" placeholder="Event Description"></textarea>

    <label for="startTime">Start Time:</label>
    <input type="number" id="startTime" value="8" min="0" max="23"><br>

    <label for="endTime">End Time:</label>
    <input type="number" id="endTime" value="18" min="0" max="23"><br>

    <label>Select Day:</label><br>
    <select id="dayDropdown">
      <option value="mon">Monday</option>
      <option value="tue">Tuesday</option>
      <option value="wed">Wednesday</option>
      <option value="thu">Thursday</option>
      <option value="fri">Friday</option>
      <option value="sat">Saturday</option>
      <option value="sun">Sunday</option>
    </select><br>

    <label for="eventColor">Select Color:<br></label>
    <select id="colorDropdown">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <!-- Add more color options as needed -->
    </select>

    <button class="createEventButton" @click="createEvent()">Create Event</button>


  </div>

  <!--popup menu to make event-->
  <button class="createEventButton" @click="createEventButton()"> Add to Schedule </button>

  <div id="popupContainer" v-if="popupVisible" class="popup-content">
    <span @click="closePopup()" class="close">&times;</span>
    <h3>Create Event</h3>

    <label for="eventName">Event Name:</label>
    <input type="text" v-model="eventName" id="eventName" placeholder="Event Name" required>

    <label for="eventDescription">Event Description:</label>
    <textarea v-model="eventDescription" id="eventDescription" placeholder="Event Description"></textarea>

    <label for="eventColor">Choose Color:<br></label>
    <select id="colorDropdown">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <!-- Add more color options as needed -->
    </select>

    <!--<button class="createEventButton" @click= "createEvent()">Create Event</button>-->
    <button class="createEventButton" @click= "createEvent()">Store Event</button>

    <label>Make Persistent: </label>
    <input type="checkbox" name="availableDays" value="mon">
  </div>

</template>

<script>
import app from '../api/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";

export default {
    data() {
        return {
            eventName: '',
            comment: ''
        }

    },
    methods: {
        storeEvent() {
            console.log(this.handle);
            console.log(this.comment);
            const functions = getFunctions(app);
            console.log(app);
            const postComment = httpsCallable(functions, 'postcomment');
            postComment({ "handle": this.handle, "comment": this.comment })
                .then((result) => {
                    // Read result of the Cloud Function.
                    /** @type {any} */
                    console.log(result);
                });
        }
    }
  }

</script>

<style scoped>
</style>