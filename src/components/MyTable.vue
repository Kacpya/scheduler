<script setup>
import { ref } from 'vue';

const props = defineProps({
  cellId: String,
});

const EditpopupVisible = ref(false);
const CreatepopupVisible = ref(false);
const events = ref([]);
const eventsMap = ref(new Map()); // Map to store events by date and time
const createdEventCells = ref([]);

class Event {
  constructor(name, date, startHour, endHour, color) {
    this.name = name;
    this.date = date;
    this.startHour = startHour;
    this.endHour = endHour;
    this.color = color;
    this.duration = endHour - startHour + 1;
    this.cells = []; // Array to store related cells
  }
}

const eventDetails = ref({ date: new Date(), startHour: '', endHour: '', duration: 1 });
const eventName = ref('');

const padZero = (num) => (num < 10 ? `0${num}` : num);

const days = ref([]);
const hours = Array.from({ length: 24 }, (_, i) => i);
const showPastEvents = ref(false);

// Initialize days with the current week
updateDays();

function updateDays() {
  const currentDate = new Date();
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay()); // Start of current week (Sunday)

  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // End of current week (Saturday)

  days.value = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
    const targetDate = new Date(currentWeekStart);
    targetDate.setDate(currentWeekStart.getDate() + index);

    // Filter events for the current day
    const dayEvents = events.value.filter(event => {
      const eventDate = new Date(event.date);
      // Check if the event date is within the range of the current week
      const withinRange = eventDate >= currentWeekStart && eventDate <= currentWeekEnd;
      return withinRange;
    });

    return { name: day, date: targetDate, events: dayEvents };
  });

  updateEventsMap(); // Update events in the map after updating days
}

function clickCell(day, hour) {
  const date = new Date(day.date);
  date.setHours(hour);

  const event = getEventByDateTime(date);

  if (event) {
    // Set event details
    eventDetails.value = {
      date: event.date,
      startHour: event.startHour,
      endHour: event.endHour,
      duration: event.duration
    };
    eventName.value = event.name;
    EditpopupVisible.value = true;
  } else {
    // Set event details for new event
    eventDetails.value = { date, startHour: hour, endHour: hour, duration: 1 };
    EditpopupVisible.value = false;
    CreatepopupVisible.value = true;
  }
}

function handleEvent(action) {
  console.log('Event details:', eventDetails.value);
  if (action === 'create') {
    createEvent(eventDetails.value);
  } else if (action === 'edit') {
    editEvent();
  } else if (action === 'delete') {
    deleteEvent(eventDetails.value);
  }
}

function createEvent(eventDetails) {
  const { date, startHour, endHour } = eventDetails;
  const eventNameValue = eventName.value;
  const duration = endHour - startHour + 1; // Calculate duration

  const existingEvent = getEventByDateTime(date); // Check if an event already exists for the specified date

  if (existingEvent) {
    console.log('Event already exists for this date and time');
    return;
  }

  // Create a new event
  const randomColor = getRandomColor(); // Generate random color

  const eventColor = randomColor; //for storing event color


  const event = new Event(eventNameValue, new Date(date), startHour, endHour, randomColor);

  // Loop through each hour within the duration and add the event to each hour
  for (let i = 0; i < duration; i++) {
    const hour = startHour + i;
    const cellIdToAdd = cellId(date, hour);

    // Store the event object itself instead of the cell ID
    events.value.push(event);

    // Mark the cells occupied by the event
    const dayIndex = days.value.findIndex(day => getDateKey(day.date) === getDateKey(date));
    if (dayIndex !== -1) {
      const cell = document.getElementById(cellId(days.value[dayIndex], hour));
      if (cell) {
        cell.classList.add('event-cell');
        cell.style.backgroundColor = randomColor;

        // Store related cell in the event
        event.cells.push(cell);
      }
    }
  }

  postEvent(eventName.value, startHour, endHour, eventColor, date.toDateString());

  // Update the events map
  updateEventsMap();

  // Close the popup
  closePopup();

  // Clear event name after creating event
  eventName.value = '';
}

function editEvent() {
  const { date, startHour, endHour, duration } = eventDetails.value;

  console.log('Edit Event Details:', { date, startHour, endHour, duration });

  const eventToUpdate = getEventByDateTime(date);

  if (eventToUpdate) {
    console.log('Event to Update:', eventToUpdate);

    // Remove the existing event from events array and events map
    deleteEvent(eventToUpdate);

    console.log('Event Deleted:', eventToUpdate);

    // Create a new event with updated details
    const updatedEvent = new Event(eventName.value, new Date(date), parseInt(startHour), parseInt(endHour), eventToUpdate.color);

    console.log('New Event:', updatedEvent);

    // Loop through each hour within the duration and add the event to each hour
    for (let i = 0; i < duration; i++) {
      const hour = parseInt(startHour) + i;
      const cellIdToAdd = cellId(date, hour);
      // Mark the cells occupied by the event
      const dayIndex = days.value.findIndex(day => getDateKey(day.date) === getDateKey(date));
      if (dayIndex !== -1) {
        const cell = document.getElementById(cellId(days.value[dayIndex], hour));
        if (cell) {
          cell.classList.add('event-cell');
          cell.style.backgroundColor = updatedEvent.color;
          // Store related cell in the event
          updatedEvent.cells.push(cell);
        }
      }
    }

    // Add the updated event back to events array and events map
    events.value.push(updatedEvent);
    updateEventsMap();

    console.log('Event Updated:', updatedEvent);

    // Close the edit popup
    EditpopupVisible.value = false;
  }
}

function deleteEvent(eventDetails) {
  const { date, startHour, duration } = eventDetails;

  const eventToDelete = getEventByDateTime(date); // Find the event using its date

  if (eventToDelete) {
    // Remove the event from the events array
    events.value = events.value.filter(event =>
      !(event.date.getTime() === eventToDelete.date.getTime() &&
        event.startHour === eventToDelete.startHour)
    );

    // Remove the event from the events map
    const dateKey = getDateKey(date);
    for (let i = 0; i < duration; i++) {
      if (eventsMap.value.has(dateKey) && eventsMap.value.get(dateKey).has(startHour + i)) {
        eventsMap.value.get(dateKey).delete(startHour + i);

        // If there are no more events for this date, delete the date key
        if (eventsMap.value.get(dateKey).size === 0) {
          eventsMap.value.delete(dateKey);
        }
      }

      // Clear the related cell
      const cellIdToDelete = cellId(getDateKey(date), startHour + i);
      const cellToDelete = document.getElementById(cellIdToDelete);
      if (cellToDelete) {
        cellToDelete.classList.remove('event-cell');
        cellToDelete.style.backgroundColor = ''; // Reset background color
      }
    }

    // Close the edit popup
    EditpopupVisible.value = false;
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function closePopup() {
  CreatepopupVisible.value = false;
  EditpopupVisible.value = false;
}

function cellId(day, hour) {
  return `cell-${day.name}-${hour}`;
}

function isCurrentDate(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

function moveToLastWeek() {
  for (let i = 0; i < days.value.length; i++) {
    const targetDate = new Date(days.value[i].date);
    targetDate.setDate(targetDate.getDate() - 7); // Move back 7 days (one week)
    days.value[i].date = targetDate;
  }
  updateEventsMap();
}

function moveToNextWeek() {
  for (let i = 0; i < days.value.length; i++) {
    const targetDate = new Date(days.value[i].date);
    targetDate.setDate(targetDate.getDate() + 7); // Move forward 7 days (one week)
    days.value[i].date = targetDate;
  }
  updateEventsMap();
}

function updateEventsMap() {
  eventsMap.value.clear();
  events.value.forEach(event => {
    const dateKey = getDateKey(event.date);
    if (!eventsMap.value.has(dateKey)) {
      eventsMap.value.set(dateKey, new Map());
    }
    for (let i = event.startHour; i <= event.endHour; i++) {
      eventsMap.value.get(dateKey).set(i, event);
    }
  });
}

function getDateKey(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date:', date);
    return '';
  }
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function getEventByDateTime(dateTime) {
  const dateKey = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`;
  return eventsMap.value.get(getDateKey(dateTime))?.get(dateTime.getHours());
}

function isEventCell(date, hour) {
  const event = getEventByDateTime(date);
  return event && hour >= event.startHour && hour <= event.endHour;
}


function hasEvent(date, hour) {
  return eventsMap.value.has(getDateKey(date)) && eventsMap.value.get(getDateKey(date)).has(hour);
}

import app from '../api/firebase';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { store } from '../store/store';



const eventNameForStoring = ref('');
const startHour = ref('');
const endHour = ref('');
const color = ref('');
const date = ref('');
const user = ref(null);


const auth = getAuth(app);
onAuthStateChanged(auth, (curUser) => {
  if (curUser) {
    console.log("User", user);
    user.value = curUser; // set the user object to the user prop
    // User is signed in
  } else {
    console.log("No user found")
    // User is not signed in
  }
});
// this.getComments();

const functions = getFunctions(app, 'europe-west1'); //specify region for cloud functions

const postEvent = (eventName, startHour, endHour, color, date) => {

  const functions = getFunctions(app);
  /*if (window.location.hostname === 'localhost') // Check if working locally            
      connectFunctionsEmulator(functions, "localhost", 5001);
  */
  console.log("2 " + eventName, startHour, endHour, color, date);

  const eventString = eventName + "," + startHour + "," + endHour + "," + color + "," + date; 

  const postEvent = httpsCallable(functions, 'postuserschedule');

  try {
  postEvent({ "event": eventString })
    .then((result) => {
      console.log(result);
      // Read result of the Cloud Function.
      /** @type {any} */
      if (getEvents) {
        getEvents(); // Call getEvents if it's provided
      }
      console.log(result);
      //loader.hide();
    });
  }
  catch (error) {
    console.error("Error posting event:", error);
  }
};

const getEvents = () => {
  const functions = getFunctions(app);
  const getEvents = httpsCallable(functions, 'getevents');
  //let loader = this.$loading.show({
    // Optional parameters  
    //container: this.$refs.container,
    //canCancel: false
  //});
  try {
  getEvents()
  .then((result) => {
    // Read result of the Cloud Function.
    // /** @type {any} */
    console.log(result);
    loader.hide();
    if (result.data != "No data in database") {
      this.eventsArray = result.data;
      console.log("eventsArray: " + eventsArray);
    } else {
      this.eventsArray = [];
      console.log("eventsArray: " + eventsArray);
    }
  });
  } catch (error) {
    console.error("Error getting events:", error);
  }
};

const deleteComment = (id) => {
  const functions = getFunctions(app);
  const deleteComment = httpsCallable(functions, 'deleteusercomment');
  let loader = this.$loading.show({
    // Optional parameters  
    container: this.$refs.container,
    canCancel: false
  });
  deleteComment({ id: id }).then((result) => {
    console.log(result);
    loader.hide();
    if (result.data == "Document successfully deleted")
      this.getComments() // To refresh the client
  });
};

</script>

<template>
  <div class="container">
    <div class="site-content">
      <div class="popup-wrapper" v-if="CreatepopupVisible || EditpopupVisible">
        <div v-if="CreatepopupVisible || EditpopupVisible" class="popup">
          <button class="close-button" @click="closePopup">&#10006;</button>
          <h2>{{ EditpopupVisible ? 'Edit Event' : 'Create Event' }}</h2>
          <input type="text" v-model="eventName" :id="EditpopupVisible ? 'editEventName' : 'createEventName'"
            placeholder="Event Name">
          <div>
            <label for="startHour">Start Hour:</label>
            <input type="number" v-model="eventDetails.startHour" min="0" max="23" required id="startHour">
          </div>
          <div>
            <label for="endHour">End Hour:</label>
            <input type="number" v-model="eventDetails.endHour" min="0" max="23" required id="endHour">
          </div>

          <template v-if="EditpopupVisible">
            <button @click="handleEvent('edit')">Save Changes</button>
            <button @click="handleEvent('delete')">Delete</button>
          </template>
          <template v-else>
            <button @click="handleEvent('create')">Save</button>
          </template>
        </div>
      </div>

      <div class="week-navigation">
        <button @click="moveToLastWeek">Last Week</button>
        <button @click="moveToNextWeek">Next Week</button>
      </div>
      <div class="table-wrapper">
        <table class="fl-table">
          <thead>
            <tr>
              <th></th>
              <th v-for="day in days" :key="day.name">
                {{ day.name }} {{ day.date.getDate() }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Table body -->
            <tr v-for="hour in hours" :key="hour">
              <th class="hour">{{ padZero(hour) }}:00</th>
              <td v-for="(day, dayIndex) in days" :key="day.name + hour" @click="clickCell(day, hour)"
                :id="cellId(day.name, hour)"
                :class="{ 'current-date': isCurrentDate(day.date), 'event-cell': hasEvent(day.date, hour) }">
                <!-- Display event name only in the first cell of the event -->
                <span
                  v-if="eventsMap.has(getDateKey(day.date)) && eventsMap.get(getDateKey(day.date)).has(hour) && eventsMap.get(getDateKey(day.date)).get(hour).startHour === hour">
                  {{ eventsMap.get(getDateKey(day.date)).get(hour).name }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>