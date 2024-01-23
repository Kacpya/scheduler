<script setup>
</script>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>

    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: #ff0000;
  margin-top: 10px;
}

</style>