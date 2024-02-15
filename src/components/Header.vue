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
                <li><a href="#" class="login-btn"><router-link to="/login">Log in</router-link></a></li>
                <li><a href="#"><router-link to="/login">Sign up</router-link></a></li>
            </ul>
        </nav>
    </header>
</template>
  
<script>
export default {
    name: 'Header',
};
</script>
