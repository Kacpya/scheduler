
<script setup>
import { ref } from 'vue';

const eventDay = ref("");
const eventHour = ref(0);
const eventName = ref("");

const popupVisible = ref(false);

function createEvents(eventDayAndHours) {
    eventDay.value = eventDayAndHours.substring(0, 3);
    eventHour.value = parseInt(eventDayAndHours.substring(3));
    popupVisible.value = true;
    console.log("Event Day: " + eventDay.value);
    console.log("Event Hour: " + eventHour.value);
}

function displayEvents() {
    popupVisible.value = false;
    const eventNameValue = eventName.value;
    
    if (eventNameValue && eventHour.value > 6 && eventHour.value < 19) {
        document.getElementById(eventDay.value + eventHour.value).innerHTML = eventNameValue;
    } 
    else {
        alert("invalid");
    }

    eventName.value = "";
    
}

function closePopup() {
    popupVisible.value = false;
    }
</script>



<template>
    <table class='table'>
        <tr>
            <th></th>
            <th onclick="generatetable(5)">Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
        </tr>
        <tr>
            <th class="hour">07:00</th>
            <td id="mon7" @click="createEvents('mon7')"></td>
    <td id="tue7" @click="createEvents('tue7')"></td>
    <td id="wed7" @click="createEvents('wed7')"></td>
    <td id="thu7" @click="createEvents('thu7')"></td>
    <td id="fri7" @click="createEvents('fri7')"></td>
    <td id="sat7" @click="createEvents('sat7')"></td>
    <td id="sun7" @click="createEvents('sun7')"></td>
        </tr>
        <tr>
            <th class="hour">08:00</th>
            <td id="mon8" @click="createEvents('mon8')"></td>
    <td id="tue8" @click="createEvents('tue8')"></td>
    <td id="wed8" @click="createEvents('wed8')"></td>
    <td id="thu8" @click="createEvents('thu8')"></td>
    <td id="fri8" @click="createEvents('fri8')"></td>
    <td id="sat8" @click="createEvents('sat8')"></td>
    <td id="sun8" @click="createEvents('sun8')"></td>
</tr>
<tr>
    <th class="hour">09:00</th>
    <td id="mon9" @click="createEvents('mon9')"></td>
    <td id="tue9" @click="createEvents('tue9')"></td>
    <td id="wed9" @click="createEvents('wed9')"></td>
    <td id="thu9" @click="createEvents('thu9')"></td>
    <td id="fri9" @click="createEvents('fri9')"></td>
    <td id="sat9" @click="createEvents('sat9')"></td>
    <td id="sun9" @click="createEvents('sun9')"></td>
</tr>
<tr>
    <th class="hour">10:00</th>
    <td id="mon10" @click="createEvents('mon10')"></td>
    <td id="tue10" @click="createEvents('tue10')"></td>
    <td id="wed10" @click="createEvents('wed10')"></td>
    <td id="thu10" @click="createEvents('thu10')"></td>
    <td id="fri10" @click="createEvents('fri10')"></td>
    <td id="sat10" @click="createEvents('sat10')"></td>
    <td id="sun10" @click="createEvents('sun10')"></td>
</tr>
<tr>
    <th class="hour">11:00</th>
    <td id="mon11" @click="createEvents('mon11')"></td>
    <td id="tue11" @click="createEvents('tue11')"></td>
    <td id="wed11" @click="createEvents('wed11')"></td>
    <td id="thu11" @click="createEvents('thu11')"></td>
    <td id="fri11" @click="createEvents('fri11')"></td>
    <td id="sat11" @click="createEvents('sat11')"></td>
    <td id="sun11" @click="createEvents('sun11')"></td>
</tr>
<tr>
    <th class="hour">12:00</th>
    <td id="mon12" @click="createEvents('mon12')"></td>
    <td id="tue12" @click="createEvents('tue12')"></td>
    <td id="wed12" @click="createEvents('wed12')"></td>
    <td id="thu12" @click="createEvents('thu12')"></td>
    <td id="fri12" @click="createEvents('fri12')"></td>
    <td id="sat12" @click="createEvents('sat12')"></td>
    <td id="sun12" @click="createEvents('sun12')"></td>
</tr>
<tr>
    <th class="hour">13:00</th>
    <td id="mon13" @click="createEvents('mon13')"></td>
    <td id="tue13" @click="createEvents('tue13')"></td>
    <td id="wed13" @click="createEvents('wed13')"></td>
    <td id="thu13" @click="createEvents('thu13')"></td>
    <td id="fri13" @click="createEvents('fri13')"></td>
    <td id="sat13" @click="createEvents('sat13')"></td>
    <td id="sun13" @click="createEvents('sun13')"></td>
    </tr>
        <tr>
            <th class="hour">14:00</th>
            <td id="mon14" @click="createEvents('mon14')"></td>
    <td id="tue14" @click="createEvents('tue14')"></td>
    <td id="wed14" @click="createEvents('wed14')"></td>
    <td id="thu14" @click="createEvents('thu14')"></td>
    <td id="fri14" @click="createEvents('fri14')"></td>
    <td id="sat14" @click="createEvents('sat14')"></td>
    <td id="sun14" @click="createEvents('sun14')"></td>
        </tr>
        <tr>
            <th class="hour">15:00</th>
            <td id="mon15" @click="createEvents('mon15')"></td>
    <td id="tue15" @click="createEvents('tue15')"></td>
    <td id="wed15" @click="createEvents('wed15')"></td>
    <td id="thu15" @click="createEvents('thu15')"></td>
    <td id="fri15" @click="createEvents('fri15')"></td>
    <td id="sat15" @click="createEvents('sat15')"></td>
    <td id="sun15" @click="createEvents('sun15')"></td>
</tr>
<tr>
    <th class="hour">16:00</th>
    <td id="mon16" @click="createEvents('mon16')"></td>
    <td id="tue16" @click="createEvents('tue16')"></td>
    <td id="wed16" @click="createEvents('wed16')"></td>
    <td id="thu16" @click="createEvents('thu16')"></td>
    <td id="fri16" @click="createEvents('fri16')"></td>
    <td id="sat16" @click="createEvents('sat16')"></td>
    <td id="sun16" @click="createEvents('sun16')"></td>
</tr>
<tr>
    <th class="hour">17:00</th>
    <td id="mon17" @click="createEvents('mon17')"></td>
    <td id="tue17" @click="createEvents('tue17')"></td>
    <td id="wed17" @click="createEvents('wed17')"></td>
    <td id="thu17" @click="createEvents('thu17')"></td>
    <td id="fri17" @click="createEvents('fri17')"></td>
    <td id="sat17" @click="createEvents('sat17')"></td>
    <td id="sun17" @click="createEvents('sun17')"></td>
</tr>
<tr>
    <th class="hour">18:00</th>
    <td id="mon18" @click="createEvents('mon18')"></td>
    <td id="tue18" @click="createEvents('tue18')"></td>
    <td id="wed18" @click="createEvents('wed18')"></td>
    <td id="thu18" @click="createEvents('thu18')"></td>
    <td id="fri18" @click="createEvents('fri18')"></td>
    <td id="sat18" @click="createEvents('sat18')"></td>
    <td id="sun18" @click="createEvents('sun18')"></td>
</tr>
    </table>

    <div id="popupContainer" v-if="popupVisible" class="popup-content">
    
            <span @click ="closePopup()" class="close">&times;</span><br>
            <input type="text" v-model="eventName" placeholder="Event Name" required><br>
            <button class="createEventButton" id="createEventButton" @click="displayEvents()">Create Event</button>
    </div>

</template>

<style scoped>

</style>