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
  const cellContent = getEventName(day.name, hour);
  if (cellContent) {
    EditpopupVisible.value = true;
  } else {
    // Check if there's an event occupying this cell
    const existingEvent = events.value.find(event => {
      const eventStartHour = event.hour;
      const eventEndHour = event.hour + event.duration - 1; // Calculate event end hour
      return event.day === day.name && hour >= eventStartHour && hour <= eventEndHour;
    });

    if (existingEvent) {
      // If there's an event occupying this cell, open edit popup for that event
      eventDetails.value = { day: existingEvent.day, startHour: existingEvent.hour, duration: existingEvent.duration };
      eventName.value = existingEvent.name;
      EditpopupVisible.value = true;
    } else {
      // Otherwise, open create popup for a new event
      eventDetails.value = { day: day.name, startHour: hour, duration: 1 };
      CreatepopupVisible.value = true;
    }
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
  const { day, startHour, duration } = eventDetails; // Modified to include duration
  for (let i = 0; i < duration; i++) {
    const event = {
      day,
      hour: startHour + i,
      name: eventName.value
    };
    events.value.push(event);
  }
  eventName.value = '';
  CreatepopupVisible.value = false;
}

function deleteEvent(eventDetails) {
  const { day, startHour, duration } = eventDetails; // Modified to include duration
  for (let i = 0; i < duration; i++) {
    const index = events.value.findIndex(event => event.day === day && event.hour === startHour + i);
    if (index !== -1) {
      events.value.splice(index, 1);
    }
  }
  EditpopupVisible.value = false;
}

function editEvent(eventDetails) {
  const { day, startHour, duration } = eventDetails; // Modified to include duration
  for (let i = 0; i < duration; i++) {
    const index = events.value.findIndex(event => event.day === day && event.hour === startHour + i);
    if (index !== -1) {
      const existingEvent = events.value[index];
      existingEvent.name = eventName.value;
      eventName.value = '';
    }
  }
  EditpopupVisible.value = false;
}

function getEventName(day, hour) {
  const event = events.value.find(event => event.day === day && event.hour === hour);
  return event ? event.name : '';
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
</script>



<template>
  <div class="container">
    <div class="site-content">
      <div v-if="CreatepopupVisible" class="popup">
        <h2>Create Event</h2>
        <input type="text" v-model="eventName" id="createEventName" placeholder="Event Name">
        <input type="number" v-model="eventDetails.duration" min="1" placeholder="Duration (hours)">
        <button @click="handleEvent('create')">Save</button>
      </div>
      <div v-if="EditpopupVisible" class="popup">
        <h2>Edit Event</h2>
        <input type="text" v-model="eventName" id="editEventName" placeholder="Event Name">
        <input type="number" v-model="eventDetails.duration" min="1" placeholder="Duration (hours)">
        <button @click="handleEvent('edit')">Save Changes</button>
        <button @click="handleEvent('delete')">Delete</button>
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
              <td v-for="day in days" :key="day + hour" @click="clickCell(day, hour)" :id="cellId(day.name, hour)" :class="{ 'current-date': isCurrentDate(day.date) }">
                {{ getEventName(day.name, hour) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
     
