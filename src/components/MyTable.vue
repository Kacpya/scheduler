
<script setup>
import { ref } from 'vue';

const eventDay = ref("");
const eventHour = ref(0);
const eventName = ref("");

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

  eventName.value = "";
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
}
</script>



<template>
  <table class='table'>
    <tr>
      <th></th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
      <th>Sun</th>
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

  <div id="popupContainer" v-if="popupVisible" class="popup-content">
    <span @click="closePopup()" class="close">&times;</span>
    <h3>Create Event</h3>

    <label for="eventName">Event Name:</label>
    <input type="text" v-model="eventName" id="eventName" placeholder="Event Name" required>

    <label for="eventDescription">Event Description:</label>
    <textarea v-model="eventDescription" id="eventDescription" placeholder="Event Description"></textarea>

    <label for="eventColor">Event Color:</label>
    <select id="colorDropdown">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <!-- Add more color options as needed -->
    </select>

    <table class="popupbuttons">
      <tr>
        <th><button class="createEventButton" @click="createEvent()">Create Event</button></th>
        <th><button class="createEventButton" @click="">Make Persistent</button></th>
      </tr>
    </table>
  </div>

  <div id="popupEdit" v-if="EditpopupVisible" class="popup-content">
    <span @click="closePopup()" class="close">&times;</span>
    <h3>Edit Event</h3>

    <label for="eventName">Event Name:</label>
    <input type="text" v-model="eventName" id="eventName" placeholder="Event Name" required>

    <label for="eventDescription">Event Description:</label>
    <textarea v-model="eventDescription" id="eventDescription" placeholder="Event Description"></textarea>

    <label for="eventColor">Event Color:</label>
    <select id="colorDropdown">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <!-- Add more color options as needed -->
    </select>

    <table class="popupbuttons">
      <tr>
        <th><button class="createEventButton" @click="displayEvents()">Edit Event</button></th>
        <th><button class="createEventButton" @click="displayEvents()">Make Persistent</button></th>
      </tr>
    </table>
  </div>

  <!--popup menu to make event-->
  <button class="createEventButton" onclick=""> Create Event </button>

</template>

<style scoped>
</style>