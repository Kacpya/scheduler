<template>
  <div class="site-content">
    <div class="sidebar">      
      <div class="week-navigation">
        <button class="button-17 " @click="toggleCalendar">
   
    Calendar
</button>

    </div>
    </div>
    <div class="page-container">
      <div v-if="showCalendar" class="calendar-overlay">
        <div class="real-time-calendar">
          <h2>{{ currentMonth }}</h2>
          <button class="close-calendar" @click="toggleCalendar">X</button>

          <table>
            <thead>
              <tr>
                <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in weeksInMonth" :key="week">
                <td v-for="day in 7" :key="day" :class="{ 'current-day': isCurrentDay(currentDate) && currentDate.getDate() === getDateInWeek(week, day) }">
                  {{ getDateInWeek(week, day) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      showCalendar: false // Initialize boolean property to control calendar visibility
    };
  },
  computed: {
    currentMonth() {
      return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    },
    weeksInMonth() {
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
      const weeks = Math.ceil((firstDayOfWeek + daysInMonth) / 7);
      return Array.from({ length: weeks }, (_, index) => index);
    },
  },
  methods: {
    isCurrentDay(date) {
      const today = new Date();
      return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    },
    getDateInWeek(week, day) {
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const firstDateOfMonth = firstDayOfMonth.getDate();
      const date = firstDateOfMonth + week * 7 + day - firstDayOfWeek;
      return date > 0 && date <= this.getTotalDaysInMonth() ? date : '';
    },
    getTotalDaysInMonth() {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
    },
    toggleCalendar() {
      this.showCalendar = !this.showCalendar; // Toggle calendar visibility
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentDate = new Date(); // Update the current date every second
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer); // Clear the timer to prevent memory leaks
  },
};
</script>
