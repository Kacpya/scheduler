<template>
    <div class="registration-container">
        
        

        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" v-model="email" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="example@gmail.com">
        </div>

        <div class="form-group">
            <label for="usernameInput">What can we call you?</label>
            <input type="text" v-model="username" class="form-control" placeholder = "Username">
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="password" class="form-control" id="exampleInputPassword1"
                placeholder="Password">
        </div>
        
        <button @click="register" class="btn btn-primary">Create Account</button>
    </div>
</template>

<script>
import app from "../api/firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
export default {
    name: "Registration", data() {
        return {
            email: "",
            username: "",
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
                    addUser({ "uid": user.uid, "username": this.username})
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


<style scoped>
.registration-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;
    height: 50vh;
}

.form-group {
    width: 100%; 
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

</style>
