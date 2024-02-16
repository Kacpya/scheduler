<script setup>
import { ref } from 'vue';

const props = defineProps({
  cellId: String,
});

const EditpopupVisible = ref(false);
const CreatepopupVisible = ref(false);
const events = ref([]);

const eventDetails = ref({ day: '', startHour: '', duration: 1 }); // Modified to include duration
const eventName = ref('');

const padZero = (num) => (num < 10 ? `0${num}` : num);

// Function to get the dates for each day of the week 
const getDateForDayOfWeek = (dayOfWeek) => {
  const today = new Date();
  const targetDate = new Date(today);
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, ..., 6 = Saturday
  const daysToAdd = dayOfWeek - currentDayOfWeek;
  targetDate.setDate(targetDate.getDate() + daysToAdd);
  return targetDate;
};

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
      console.log(`Event: ${event.name}, Date: ${eventDate}, Within Range: ${withinRange}`);
      return withinRange;
    });

    return { name: day, date: targetDate, events: dayEvents };
  });
}

function clickCell(day, hour) {
  const event = events.value.find(event =>
    event.day === day.name && event.hour <= hour && hour < event.hour + event.duration
  );

  if (event) {
    const earliestHour = event.hour;
    eventDetails.value = {
      day: event.day,
      startHour: earliestHour,
      endHour: earliestHour + event.duration - 1,
      duration: event.duration
    };
    eventName.value = event.name;
    EditpopupVisible.value = true;
  } else {
    eventDetails.value = { day: day.name, startHour: hour, endHour: hour, duration: 1 };
    EditpopupVisible.value = false;
    CreatepopupVisible.value = true;
  }
}



function handleEvent(action) {
  if (action === 'create') {
    createEvent(eventDetails.value);
  } else if (action === 'edit') {
    editEvent(eventDetails.value);
  } else if (action === 'delete') {
    deleteEvent(eventDetails.value);
  }
}

function createEvent(eventDetails) {
  const { day, startHour, endHour } = eventDetails;
  const randomColor = getRandomColor();
  const eventNameValue = eventName.value; // Get the event name only once

  for (let i = startHour; i <= endHour; i++) {
    const event = {
      day,
      hour: i,
      name: i === startHour ? eventNameValue : '', // Set event name only for the start hour
      duration: endHour - startHour + 1,
      color: randomColor
    };
    events.value.push(event);

    const cell = document.getElementById(cellId(day, i));
    if (cell) {
      cell.style.backgroundColor = randomColor; // Set background color for all cells in the event's duration
    }
  }
  eventName.value = '';
  CreatepopupVisible.value = false;
}

function editEvent(eventDetails) {
  const { day, startHour, endHour } = eventDetails;

  // Find the index of the existing event
  const index = events.value.findIndex(event =>
    event.day === day && event.hour === startHour
  );

  // If the event exists, update it; otherwise, return
  if (index !== -1) {
    const existingEvent = events.value[index];

    // Remove the existing event's cells
for (let i = existingEvent.hour; i < existingEvent.hour + existingEvent.duration; i++) {
  const cell = document.getElementById(cellId(day, i));
  if (cell) {
    cell.style.backgroundColor = ''; // Clear background color of the cell in the existing event's duration
  }
}



    // Remove the existing event from the events array
    events.value.splice(index, 1);

    // Add the new event to the events array
    const newEvent = {
      day: day,
      hour: startHour,
      duration: endHour - startHour + 1,
      name: eventName.value ? eventName.value : '',
      color: getRandomColor()
    };
    events.value.push(newEvent);

    // Set background color for all cells in the new event's duration
    for (let i = startHour; i <= endHour; i++) {
      const cell = document.getElementById(cellId(day, i));
      if (cell) {
        cell.style.backgroundColor = newEvent.color;
      }
    }

  } else {
    return; // If the event does not exist, return without making any changes
  }

  // Clear input fields and close the edit popup
  eventName.value = '';
  EditpopupVisible.value = false;
}




function getRandomColor() {
  // Generate random RGB values
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  // Convert to hex format
  const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}


function deleteEvent(eventDetails) {
  const { day, startHour, duration } = eventDetails;
  for (let i = 0; i < duration; i++) {
    const index = events.value.findIndex(event => event.day === day && event.hour === startHour + i);
    if (index !== -1) {
      const deletedEvent = events.value.splice(index, 1)[0]; // Remove the event and get the deleted event
      for (let j = 0; j < deletedEvent.duration; j++) {
        const cell = document.getElementById(cellId(day, startHour + j));
        if (cell) {
          cell.style.backgroundColor = ''; // Clear background color of all cells in the event's duration
        }
      }
    }
  }
  EditpopupVisible.value = false;
}




function closePopup() {
  CreatepopupVisible.value = false;
  EditpopupVisible.value = false;
}


function cellId(day, hour) {
  return `cell-${day}-${hour}`;
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
}

function moveToNextWeek() {
  for (let i = 0; i < days.value.length; i++) {
    const targetDate = new Date(days.value[i].date);
    targetDate.setDate(targetDate.getDate() + 7); // Move forward 7 days (one week)
    days.value[i].date = targetDate;
  }
}

// Modify the getEventName function to return the event name only for the start hour
function getEventName(day, hour) {
  const event = events.value.find(
    (event) => event.day === day && event.hour === hour
  );
  return event ? event.name : '';
}
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
            <input type="number" v-model="eventDetails.startHour" min="0" max="23" required>
          </div>
          <div>
            <label for="endHour">End Hour:</label>
            <input type="number" v-model="eventDetails.endHour" min="0" max="23" required>
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

      <!-- Buttons for navigating to next and last weeks -->
      <div class="week-navigation">
        <button @click="moveToLastWeek">Last Week</button>
        <button @click="moveToNextWeek">Next Week</button>
      </div>
      <!-- Button to toggle past events visibility -->
      <div class="toggle-past-events">
        <input type="checkbox" v-model="showPastEvents"> Show Past Events
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
            <tr v-for="hour in hours" :key="hour">
              <th class="hour">{{ padZero(hour) }}:00</th>
              <td v-for="day in days" :key="day + hour" @click="clickCell(day, hour)" :id="cellId(day.name, hour)"
                :class="{ 'current-date': isCurrentDate(day.date) }">
                {{ getEventName(day.name, hour) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
     
