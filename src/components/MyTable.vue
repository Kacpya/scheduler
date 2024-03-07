<script setup>
import { ref } from 'vue';

const props = defineProps({
  cellId: String,
});

const EditpopupVisible = ref(false);
const CreatepopupVisible = ref(false);
const events = ref([]);
const eventsMap = ref(new Map()); // Map to store events by date and time

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

  const event = {
    date: new Date(date), // Create a new date object to avoid reference issues
    startHour,
    endHour,
    name: eventNameValue,
    color: getRandomColor(),
    duration: duration // Add duration to event object
  };

  // Add the event to the events array
  events.value.push(event);
  console.log('Event created:', event);

  // Update the events map
  updateEventsMap();

  // Close the popup
  closePopup();

  // Clear event name after creating event
  eventName.value = '';
}

function editEvent() {
  const { date, startHour, endHour, duration } = eventDetails.value;

  const event = getEventByDateTime(date);

  if (event) {
    // Update existing event with new details
    event.startHour = startHour;
    event.endHour = startHour + duration - 1; // Adjust end hour based on duration
    event.name = eventName.value; // Update event name

    // Update the events map
    updateEventsMap();

    // Close the edit popup
    EditpopupVisible.value = false;
  }
}

function deleteEvent(eventDetails) {
  const { date, startHour, duration } = eventDetails;
  const startDateTime = new Date(date);
  startDateTime.setHours(startHour);

  for (let i = 0; i < duration; i++) {
    const currentDateTime = new Date(startDateTime);
    currentDateTime.setHours(startDateTime.getHours() + i);

    const eventIndex = events.value.findIndex(event =>
      event.date.getTime() === currentDateTime.getTime() &&
      event.startHour === startHour
    );

    if (eventIndex !== -1) {
      events.value.splice(eventIndex, 1);
    }

    const dateKey = getDateKey(currentDateTime);
    if (eventsMap.value.has(dateKey) && eventsMap.value.get(dateKey).has(startHour + i)) {
      eventsMap.value.get(dateKey).delete(startHour + i);
    }
  }

  // Close the edit popup
  EditpopupVisible.value = false;
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
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
    eventsMap.value.get(dateKey).set(event.startHour, event);
  });
}

function getDateKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function getEventByDateTime(dateTime) {
  const dateKey = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`;
  return eventsMap.value.get(getDateKey(dateTime))?.get(dateTime.getHours());
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
              <td v-for="day in days" :key="day.name + hour" @click="clickCell(day, hour)" :id="cellId(day.name, hour)"
                :class="{ 'current-date': isCurrentDate(day.date) }">
                <!-- Display event name if exists for the current hour -->
                <span v-if="eventsMap.has(getDateKey(day.date)) && eventsMap.get(getDateKey(day.date)).has(hour)">
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
