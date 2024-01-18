<script setup>

import { ref } from 'vue';

const loginPopupVisible = ref(false);

function loginButton() {
    loginPopupVisible.value = true;
}

function userLogin(){
    loginPopupVisible.value = false;
}
</script>

<template>
    <div>
        <button class='login-button' id="loginButton" @click="loginButton()">Login</button>
    </div>


    <div id="popupContainer" v-if="loginPopupVisible" class="login-popup">
        <span @click="closePopup()" class="close">&times;</span><br>
        <input type="text" v-model="username" placeholder="Username" required>
        <input type="text" v-model="password" placeholder="Password" required>
        <button class="completeLoginButton" id="completeLoginButton" @click="userLogin()">Login</button>
    </div>
</template>