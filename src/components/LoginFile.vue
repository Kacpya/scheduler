<script setup>
</script>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input class="login_Input" type="text" id="username" v-model="username" required />

      <label class="login_Label" for="password">Password:</label>
      <input class="login_Input" type="password" id="password" v-model="password" required />

      <button type="submit" class="loginFileButton">Login</button>
    </form>

    <div v-if="error" class="login_error-message">{{ error }}</div>
  </div>
</template>

<style scoped></style>
