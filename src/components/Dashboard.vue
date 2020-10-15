<template>
<div class="dashboard">
    <h1>Dashboard</h1>
    <div v-if="loginCheck">
        <h3>You are logged in</h3>
        <router-link to="/logout">Logout</router-link> |
        <router-link to="/sites">Sites</router-link>
    </div>
    <div v-else>
        <p>You need to login first.</p>
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link>
    </div>
</div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            loginCheck: false,
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            this.loginCheck = true;
        }
    },
};
</script>

<style>
</style>
