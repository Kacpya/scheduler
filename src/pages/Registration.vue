<script setup>
import Header from '../components/Header.vue'
</script>

<script>
import app from "../api/firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

export default {
    name: "Registration", data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        register() {
            const auth = getAuth(app);
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    const functions = getFunctions(app);
                    const addUser = httpsCallable(functions, 'adduser');
                    addUser({ "uid": user.uid })
                        .then((result) => {
                            // Read result of the Cloud Function.
                            /** @type {any} */
                            console.log(user)
                            this.$router.push({ path: '/' })
                        });
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

<template>
    <Header />

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    </head>

    <body>
        <div class="site-content>">
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
    </body>
</template>
