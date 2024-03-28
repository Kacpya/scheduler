
<template>
    <div class = "site-content">
    <div class="registration-container">
        
        

        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" v-model="email" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="example@gmail.com">
        </div>



        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="password" class="form-control" id="exampleInputPassword1"
                placeholder="Password">
        </div>
        
        <button @click="register" class="btn btn-primary">Create Account</button>
        <label>Already have an account? </label>
        <a href="#"><router-link to="/login">Sign in</router-link></a>
    </div>
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
                            console.log(result);
                            console.log(user)
                            this.$router.push({ path: '/Schedule' })
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
.site-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}

.registration-container {
    max-width: 350px;
    width: 100%;
    margin: 0 auto;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

input {
    width: calc(100% - 16px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    background-color: #4c53af;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #4945a0;
}

button:active {
    background-color: #3e3e8e;
}

button:focus {
    outline: none;
}

</style>