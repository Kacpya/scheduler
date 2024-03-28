<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  cellId: String,
});

const EditpopupVisible = ref(false);
const CreatepopupVisible = ref(false);
const events = ref([]);
const eventsMap = ref(new Map()); // Map to store events by date and time

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

let eventForEditing = null;

let eventsArray = [];
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

  //console.log("event in clickcell " + event)


  if (event) {
    // Set event details
    eventDetails.value = {
      date: event.date,
      startHour: event.startHour,
      endHour: event.endHour,
      duration: event.duration
    };
    eventName.value = event.name;
    eventForEditing = event; //for storing clicked event when editing event for deletion from database
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
    editEvent(eventDetails.value);
  } else if (action === 'delete') {
    deleteEvent(eventDetails.value);
  }
}



function createEvent(eventDetails) {
  const { date, startHour, endHour } = eventDetails;
  console.log("date", date);
  postEvent(eventName.value, startHour, endHour, getRandomColor(), date.toDateString());
  updateEventsMap();
  getEvents();
  closePopup();
  eventName = "";
}

 
function editEvent(eventDetails) {
  const { date, startHour, endHour } = eventDetails;
  console.log(" new eventDetails to delete: ", eventForEditing); //previous event (event to be edited)
  console.log("eventDetails to delete: ", eventDetails);  //new event to be created
  deleteEvent(eventForEditing);
  postEvent(eventName.value, startHour, endHour, getRandomColor(), date.toDateString()).then(getEvents());
  
}
 
 

 //delete event from database and then update the schedule
function deleteEvent(eventDetails) {
  findEventForDeletionInDatabase(eventDetails).then(() => { 
    events.value = events.value.filter(event => {
      const eventToDeleteDate = eventDetails.date.toDateString();
      const eventDate = event.date.toDateString();
      const isSameDate = eventToDeleteDate === eventDate;
      const isSameTimeRange = event.startHour === eventDetails.startHour && event.endHour === eventDetails.endHour;
      return !(isSameDate && isSameTimeRange);
    });
    getEvents();
    closePopup();
  }).catch(error => {
    console.error('Error deleting event:', error);
  });
}

function findEventForDeletionInDatabase(eventToDelete) {
  return new Promise((resolve, reject) => {
    //console.log("findEventForDeletionInDatabase start")
    if (eventToDelete != null) {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;
      const currentUserID = currentUser.uid;

      let eventToDeleteDate = eventToDelete.date.toDateString();

      //console.log("findEventForDeletionInDatabase 1");

      for (var i = 0; i < eventsArray.length; i++) {
        if (currentUserID == eventsArray[i].data.uid) { //if current users event
          //console.log("findEventForDeletionInDatabase 2");
          //database information
          const eventDetailsSplit = eventsArray[i].data.event.split(',');
          const [eventName, startHour, endHour, eventColor, dateString] = eventDetailsSplit;



          if (dateString == eventToDeleteDate && startHour == eventToDelete.startHour && endHour == eventToDelete.endHour) { //find event with same date and time
            //console.log("findEventForDeletionInDatabase 3");
            //console.log("eventsArray[i].data", eventsArray[i].id);
            deleteEventFromDatabase(eventsArray[i].id);
            resolve();
            return;
          }
        }
      }
      reject(new Error('Event not found'));
    }

    if (eventToDelete) {
      for (let i = eventToDelete.startHour; i <= eventToDelete.endHour; i++) {
        const cellIdToDelete = cellId(eventToDelete.date, i);
        const cellToDelete = document.getElementById(cellIdToDelete);
        if (cellToDelete) {
          cellToDelete.classList.remove('event-cell');
          cellToDelete.style.backgroundColor = ''; //reser background
        }
      }
    }

    getEvents();
    //console.log("findEventForDeletionInDatabase end")
  });
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

    const formattedDate = formatDate(new Date(days.value[0].date));

    document.getElementById('currentDateDisplay').innerHTML = formattedDate;
  }
  updateEventsMap();
}

function moveToCurrentWeek() {
  const currentDate = new Date();

  const firstDayOfWeek = new Date(currentDate);
  firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  for (let i = 0; i < days.value.length; i++) {
    const targetDate = new Date(firstDayOfWeek);
    targetDate.setDate(firstDayOfWeek.getDate() + i); // Move to current week
    days.value[i].date = targetDate;

    const formattedDate = formatDate(new Date(days.value[0].date));

    document.getElementById('currentDateDisplay').innerHTML = formattedDate;
  }
  updateEventsMap();
}

function moveToNextWeek() {
  for (let i = 0; i < days.value.length; i++) {
    const targetDate = new Date(days.value[i].date);
    targetDate.setDate(targetDate.getDate() + 7); // Move forward 7 days (one week)
    days.value[i].date = targetDate;

    const formattedDate = formatDate(new Date(days.value[0].date));

    document.getElementById('currentDateDisplay').innerHTML = formattedDate;
  }

  updateEventsMap();
}
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function formatDate(date) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth(); 
  const month = months[monthIndex]; 
  

  return `${month}-${year}`;
}

// Function to display the current date in a div
function displayCurrentDate() {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const currentDateDisplay = document.getElementById('currentDateDisplay');
  currentDateDisplay.textContent = formattedDate;

  document.getElementById('currentDateDisplay').innerHTML = formattedDate;
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

function displayDatabaseEvents(eventsArray) {
  generateUsersEventsFromDatabase(eventsArray); //generate events from database
}



function generateUsersEventsFromDatabase(eventsArray) {

  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const currentUserID = currentUser.uid;
  console.log("currentUser.uid ", currentUser.uid)
  console.log(eventsArray)

  //create user events from database
  for (var i = 0; i < eventsArray.length; i++) {
    if (currentUserID == eventsArray[i].data.uid) { //if current users event
      
      //console.log("Event: " + eventsArray[i].data.event + " loaded from database into schedule");
      
      //split event string into its smaller components
      const eventDetailsSplit = eventsArray[i].data.event.split(',');

      const [eventName, startHour, endHour, eventColor, dateString] = eventDetailsSplit;
      const startHourInt = parseInt(startHour);
      const endHourInt = parseInt(endHour);
      let evColor = '#73EC7F';

      const date = new Date(dateString);
      
      const event = new Event(eventName, new Date(date), startHourInt, endHourInt, evColor);

  
      let duration = endHour - startHour + 1;
      // Loop through each hour within the duration and add the event to each hour
      for (let i = 0; i < duration; i++) {
        const hour = startHour + i;
        
        // store the event object
        events.value.push(event);

        // Mark the cells occupied by the event
        const dayIndex = days.value.findIndex(day => getDateKey(day.date) === getDateKey(date));
        if (dayIndex !== -1) {
          const cell = document.getElementById(cellId(days.value[dayIndex], hour));
          if (cell) {
            cell.classList.add('event-cell');
            cell.style.backgroundColor = evColor;

            // Store related cell in the event
            event.cells.push(cell);
          }
        }
      }
      
      
    }
    
  }
  //update the events map
  updateEventsMap();

}

import app from '../api/firebase';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { store } from '../store/store';

let userHandle = "";


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
    //getUserHandle();
    // User is signed in
  } else {
    console.log("No user found")
    // User is not signed in
  }
});


const postEvent = (eventName, startHour, endHour, color, date) => {

  //let loader = this.$loading.show({
    // Optional parameters  
    //container: this.$refs.container,
    //canCancel: false
  //});

  const functions = getFunctions(app);

  //console.log("2 " + eventName, startHour, endHour, color, date);

  const eventString = eventName + "," + startHour + "," + endHour + "," + color + "," + date;

  const postEvent = httpsCallable(functions, 'postuserschedule');

  try {
    postEvent({ "event": eventString })
      .then((result) => {
        console.log(result);
        // Read result of the Cloud Function.
        /** @type {any} */
        if (getEvents) {
          getEvents(); //recall getEvents 
        }
        //console.log(result);
        //loader.hide();
      });
  }
  catch (error) {
    console.error("Error posting event:", error);
  }
};



const getEvents = () => {
  //console.log("getEvents called")
  const functions = getFunctions(app);
  const getEvents = httpsCallable(functions, 'getevents');

  eventsArray = [];

  try {
    getEvents()
      .then((result) => {
        // Read result of the Cloud Function.
        // /** @type {any} */
        //console.log(result); 
        //loader.hide(); 
        if (result.data != "No data in database") {
          //console.log("getEvents if statement")
          eventsArray = result.data;
          displayDatabaseEvents(eventsArray);
          //console.log("eventsArray1: ");
          //console.log(eventsArray);
        } else {
          eventsArray = [];
  
        }
      });
  } catch (error) {
    console.error("Error getting events:", error);
  }
  
  //console.log("getEvents end")
};

const deleteEventFromDatabase = (id) => {
  const functions = getFunctions(app);
  const deleteEvent = httpsCallable(functions, 'deleteuserevent');
  
  //let loader = this.$loading.show({
  // Optional parameters  
  //container: this.$refs.container,
  //canCancel: false
  //});
  deleteEvent({ id: id }).then((result) => {
    console.log(result);
    //loader.hide();
    if (result.data == "Document successfully deleted") {
      getEvents(); // To refresh the client
    } else {
        console.log("Deletion not successful");
      }
    })
};


//call getEvents upon load
onMounted(() => { 
  getEvents();
  displayCurrentDate();
});

</script>


<template>



  <div class="container">
    <div class="site-content">
      <div class="popup-wrapper" v-if="CreatepopupVisible || EditpopupVisible">
        <div class="popup">
          <button class="close-button" @click="closePopup">X</button>
          <h3>{{ EditpopupVisible ? 'Edit Event' : 'Create Event' }}</h3>
          <form>
            <div class="form-group">
              <label for="eventName">Event Name:</label>
              <input type="text" v-model="eventName" :id="EditpopupVisible ? 'editEventName' : 'createEventName'"
                placeholder="Enter event name">
            </div>
            <div class="form-group">
              <label for="startHour">Start Hour:</label>
              <input type="number" v-model="eventDetails.startHour" min="0" max="23" required id="startHour">
            </div>
            <div class="form-group">
              <label for="endHour">End Hour:</label>
              <input type="number" v-model="eventDetails.endHour" min="0" max="23" required id="endHour">
            </div>
            <template v-if="EditpopupVisible">
              <button class="btn-edit" @click="handleEvent('edit')">Save Changes</button>
              <button class="btn-delete" @click="handleEvent('delete')">Delete</button>
            </template>
            <template v-else>
              <button class="btn-create" @click="handleEvent('create')">Save</button>
            </template>
          </form>
        </div>
      </div>
      <div class="display-date">
        <h1 class = "monthDisplay" id="currentDateDisplay"></h1>
      </div>
      <div class="week-navigation">
        <button class="button-17 " @click="moveToLastWeek">Last Week</button>
        <button class="button-17 " @click="moveToCurrentWeek">Current Week</button>
        <button class="button-17 " @click="moveToNextWeek">Next Week</button>
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