<template>


  <div class="site-content">
            <div class="form-container">
      <h2>Login</h2>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="example@gmail.com">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="password" class="form-control" id="exampleInputPassword1"
                placeholder="Password">
        </div>
        <button @click="login" class="login-btn ">Log in</button>
  
  </div>
  </div>
  </template>
  
  <script>
  //import { getevents } from "../../functions";
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
                    console.log(user);
                    this.$router.push({path: '/Schedule'})
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
  
  
  <style scoped>
  h2{
    color:rgb(3, 3, 3);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  
  .form-group {
    width: 250px;
  
  }
  
  </style>