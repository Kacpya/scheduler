<template>
    <header>
        <div class="logo">
            <a href="https://imgbox.com/0bBpBZDc" target="_blank"><img src="https://thumbs2.imgbox.com/1a/8b/0bBpBZDc_t.png"
                    alt="Logo" /></a>
        </div>
        <nav class="menu">
            <ul>
                <li><a href="#"><router-link to="/">Home</router-link></a></li>
                <li><a href="#"><router-link to="/about-us">About-Us</router-link></a></li>

                <li><a href="#"><router-link to="/login">My account</router-link></a>
                    <ul>
                        <li><a href="#"><router-link to="/myTable">My timetable</router-link></a></li>
                        <li><a href="#"><router-link to="/settings">Settings</router-link></a></li>
                        <li><a href="#"><router-link to="/logOut">Log out</router-link></a></li>
                    </ul>
                </li>

            </ul>
            <ul class="right-menu">
                <!--
                <li v-if="!loggedIn"><a href="#" class="login-btn"><router-link to="/login">Log in</router-link></a></li>
                <li v-if="!loggedIn"><a href="#"><router-link to="/register">Sign up</router-link></a></li>
                -->
                <li><a href="#" class="login-btn"><router-link to="/login">Log in</router-link></a></li>
                <li><a href="#"><router-link to="/register">Sign up</router-link></a></li>
            </ul>
            <ul class="logout-menu">
                <li v-if="loggedIn"><a href="#" class="logout-btn"><router-link to="/register">Log Out</router-link></a></li>
            </ul>
        </nav>
    </header>
</template>
  
<script>
import { ref, computed } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    name: 'Header',
    setup() {
        const loggedIn = ref(false);
        //if logged in
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            loggedIn.value = !!user; 
        });
        return {
            loggedIn
        };
    }
};

</script>