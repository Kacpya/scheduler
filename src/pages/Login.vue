<!--

<script setup>

import LoginFile from '../components/LoginFile.vue'
</script>
<template>
  <router-view></router-view>
  <button> Boo </button>


  <Sidebar/>
  <LoginFile/>


</template>


<style scoped>
</style>
-->

<template>
  <div class="container">
      <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1"
              placeholder="Password">
      </div>
      <button @click="login" class="btn btn-primary">Login</button>
  </div>
</template>

<script>
import app from "../api/firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "Login", data() {
      return {
          email: "",
          password: ""
      }
  },
  methods: {
      login() {
          const auth = getAuth(app);
          signInWithEmailAndPassword(auth, this.email, this.password)
              .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log(user)
                  this.$router.push({path: '/secure'})
                  // ...
              })
              .catch((error) => {
                  const errorCode = error.code; 
                  const errorMessage = error.message; 
                  
                  console.log(errorCode)
                  console.log(errorMessage)
                  // ..          
              });
      }
  }
}
</script>

