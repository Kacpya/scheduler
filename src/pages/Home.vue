<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import LoginFile from '../components/LoginFile.vue'

const liked = ref(false);

function toggleLike() {
  liked.value = !liked.value;
}
</script>

<template>
  <Header/>
  <body>
    <div class="container">
      <div class="site-content">
        <div class="background-elements">
          <section id="mission">
            <h1>Welcome to</h1>
            <div class="logo2">
              <a href="https://imgbox.com/RD7oJCFi" target="_blank">
                <img src="https://thumbs2.imgbox.com/6b/d3/RD7oJCFi_t.jpg" alt="image host"/>
              </a>
            </div>
            <p>Schedulite is the fastest and easiest way to schedule anything — from meetings to the next great collaboration.</p>
          </section>

          <section id="signup" class="button-section">
            <h2>Sign up now!</h2>
            <div class="button-wrapper">
              <a href="/register" class="signup-button" @click="toggleLike" :class="{ liked: liked }">Sign up</a>
              <a href="/login" class="login-button" @click="toggleLike" :class="{ liked: liked }">Log in</a>
            </div>
          </section>

          <section id="history">
            <h2>Purpose</h2>
            <p>
              Tailored for educational institutions, professionals, and personal use, Schedulite offers versatile applications. Whether organizing academic timetables, managing work-related meetings, or harmonizing personal engagements, Schedulite simplifies event planning and collaboration. Say hello to a more organized, efficient way of orchestrating your daily, weekly, or monthly agendas with Schedulite.
            </p>
          </section>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
.button-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  gap: 100px; /* Adjust the space between buttons */
}

.button-wrapper a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 30px 50px; 
  border: 0;
  position: relative;
  overflow: hidden;
  border-radius: 10rem;
  transition: all 0.02s;
  font-weight: bold;
  color: rgb(37, 37, 37);
  z-index: 0;
  box-shadow: 0 0px 7px -5px rgba(0, 0, 0, 0.5);
  text-decoration: none; 
  font-size: 26px; 
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s;
  background-image: linear-gradient(144deg, #AF40FF, #7b6ae6 50%, #00DDEB); 
}



.signup-button {
  background-color: #4CAF50; /* Green */
  color: white;
}

.signup-button:hover {
  background-color: #45a049; /* Darker Green */
}

.login-button {
  background-color: #008CBA; /* Blue */
  color: white;
}

.login-button:hover {
  background-color: #0077A3; /* Darker Blue */
}



@keyframes bounce {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.button-wrapper a:hover {
  animation: bounce 0.5s;
}

.button-wrapper a:active,
.button-wrapper a:hover {
  outline: 0;
}

.button-wrapper a span {
  background-color: rgb(5, 6, 45); /* Set background color for span */
  padding: 16px 24px; /* Adjust padding */
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

.button-wrapper a:hover span {
  background: none; /* Remove background on hover */
}

.button-wrapper a:active {
  transform: scale(0.9);
}
</style>