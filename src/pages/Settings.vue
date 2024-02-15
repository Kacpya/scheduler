<script setup>
import Header from '../components/Header.vue'
import Logo from "@/components/Logo.vue";
</script>

<template>
    <logo />
    <Header />
    <button>Settings</button>
    <div class="settings_container">
        <div class="site-content">
            <h2>Change language:</h2>
            <form>
                <input type="radio" id="english" name="app_language" value="English">
                <label for="english">English</label>
                <br>
                <input type="radio" id="ukrainian" name="app_language" value="Ukrainian">
                <label for="ukrainian">Ukrainian</label>
            </form>
            <button>Save</button>
        </div>
    </div>
</template>

<style scoped></style>