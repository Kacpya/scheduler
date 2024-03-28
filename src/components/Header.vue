<template>
    <header>
        <div class="logo">
            <!--<a href="https://imgbox.com/37VHMbz3" target="_blank"><img src="https://thumbs2.imgbox.com/f7/4c/37VHMbz3_t.jpg" alt="image host"/></a>-->
            <a href="#" target="_blank"><router-link to="/"><img src="https://thumbs2.imgbox.com/f7/4c/37VHMbz3_t.jpg" alt="image host"/></router-link></a>
        </div>
        <nav class="menu">
            <div class="menu-content">
            <ul>
                <li><a href="#"><router-link to="/">Home</router-link></a></li>
                <li><a href="#"><router-link to="/about-us">About Us</router-link></a></li>

                <li v-if="loggedIn"><a href="#"><router-link to="/login">My account</router-link></a>
                    <ul>
                        <li><a href="#"><router-link to="/schedule">My Schedulite</router-link></a></li>
                        <li><a href="#"><router-link to="/settings">Settings</router-link></a></li>
                        <li><a href="#"><router-link to="/logOut">Log out</router-link></a></li>
                    </ul>
                </li>
            
            </ul>
        </div>
            <ul class="logout-menu">
                <li v-if="!loggedIn"><a href="#" class="login-btn"><router-link to="/login">Log in</router-link></a></li>
                <li v-if="!loggedIn"><a href="#"><router-link to="/register">Sign up</router-link></a></li>
                <li v-if="loggedIn"><a href="#" class="logout-btn" @click="logout">Log Out</a></li>
            </ul>
        </nav>
    </header>
</template>
  
<script>
import { ref, computed } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import app from '../api/firebase';


export default {
    //name: 'Header',
    setup() {
        const loggedIn = ref(false);
        //if logged in
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            loggedIn.value = !!user;
        });

        const router = useRouter();

        const logout = () => {
            console.log("log out entered");
            const auth = getAuth(app);
            signOut(auth)
                .then(() => {     
                    console.log("user logged out successfully");
                    router.push({ path: '/login' }); //send to login page
                    //log out successful.
                    loggedIn.value = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        return {
            loggedIn,
            logout
        };
    }
};


</script>

