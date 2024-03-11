<template>
    <div>
      <Header />
  
      <div class="container">
        <div class="row justify-content-center">
          <div class="col">
            <div class="form-container">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" v-model="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter email">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with
                    anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" v-model="password" class="form-control"
                    id="exampleInputPassword1" placeholder="Password">
                </div>
                <button @click="register" class="btn btn-primary">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from '../components/Header.vue'
  import { ref } from 'vue';
  import app from "../api/firebase";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { getFunctions, httpsCallable } from "firebase/functions";
  
  const email = ref('');
  const password = ref('');
  
  const register = async () => {
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      const functions = getFunctions(app);
      const addUser = httpsCallable(functions, 'adduser');
      const result = await addUser({ "uid": user.uid });
      console.log(user);
      $router.push({ path: '/' });
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  };
  </script>
