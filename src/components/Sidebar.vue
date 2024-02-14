<template>
  <div class="menu-container">
    <div class="logo-container">
      <img src="C:\Users\mbunc\samplevue\src\assets\logo.png">
    </div>

    <aside class="sidebar">
      <!-- Sidebar content goes here -->
      <ul>
        <nav>
          <a href="#"> <router-link to="/">Home</router-link></a>
          <a href="#"> <router-link to="/about-us">About-Us</router-link> </a>
          <a href="#" class="login"> <router-link to="/login">Login</router-link></a>
          <div class="animation start-home"></div>

        </nav>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>
