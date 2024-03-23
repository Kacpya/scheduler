<template>
  <div class="login-container">
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
      <button @click="login" class="btn btn-primary">Login</button>
  </div>
</template>

<script>
import { getevents } from "../../functions";
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
                  this.$router.push({path: '/'})
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
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh; 
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