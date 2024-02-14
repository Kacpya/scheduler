<script setup>
import { ref } from 'vue';

const props = defineProps({
  cellId: String,
});

const EditpopupVisible = ref(false);
const CreatepopupVisible = ref(false);
const events = ref([]);

const eventDetails = ref({ day: '', hour: '' });
const eventName = ref('');

const padZero = (num) => (num < 10 ? `0${num}` : num);

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

function clickCell(day, hour) {
  eventDetails.value = { day, hour };
  const cellContent = getEventName(day, hour);
  if (cellContent) {
    EditpopupVisible.value = true;
  } else {
    CreatepopupVisible.value = true;
  }
}

function handleEvent(action) {
  if (action === 'create') {
    createEvent(eventDetails.value);
  } else if (action === 'edit') {
    // Implement edit logic here
  } else if (action === 'delete') {
    deleteEvent(eventDetails.value);
  }
}

function createEvent(eventDetails) {
  const { day, hour } = eventDetails;
  const event = {
    day,
    hour,
    name: eventName.value // Get the name from the reactive reference
  };
  events.value.push(event);
  CreatepopupVisible.value = false;
}

function deleteEvent(eventDetails) {
  const index = events.value.findIndex(event => event.day === eventDetails.day && event.hour === eventDetails.hour);
  if (index !== -1) {
    events.value.splice(index, 1);
  }
  EditpopupVisible.value = false; // Close the popup after deleting the event
}

function getEventName(day, hour) {
  const event = events.value.find(event => event.day === day && event.hour === hour);
  return event ? event.name : '';
}

function cellId(day, hour) {
  return `cell-${day}-${hour}`;
}
</script>

<template>
  <div class="container">
    <div v-if="CreatepopupVisible" class="popup">
      <h2>Create Event</h2>
      <input type="text" v-model="eventName" id="createEventName" placeholder="Event Name">
      <button @click="handleEvent('create')">Save</button>
    </div>
    <div v-if="EditpopupVisible" class="popup">
      <h2>Edit Event</h2>
      <input type="text" v-model="eventName" id="editEventName" placeholder="Event Name">
      <button @click="handleEvent('edit')">Save Changes</button>
      <button @click="handleEvent('delete')">Delete</button>
    </div>
    <div class="table-wrapper">
      <table class="fl-table">
        <thead>
          <tr>
            <th></th>
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hour in hours" :key="hour">
            <th class="hour">{{ padZero(hour) }}:00</th>
            <td v-for="day in days" :key="day + hour" @click="clickCell(day, hour)" :id="cellId(day, hour)">
              {{ getEventName(day, hour) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
