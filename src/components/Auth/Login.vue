<template>
<div class="login">
    <h1>Login</h1>
    <div v-if="alertMessage">
        <p v-text="alertMessage"></p>
    </div>
    <input type="email" v-model="email" placeholder="Please enter your email" />
    <input type="password" v-model="password" placeholder="Password" />
    <br />
    <button type="submit" @click="checkLogin()">Submit</button>
</div>
</template>

<script>
const axios = require("axios");
const url = require('../env')
export default {
    name: "Login",
    data() {
        return {
            email: null,
            password: null,
            alertMessage: null,
        };
    },
    methods: {
        checkLogin() {
            axios
                .post(`${url}/api/auth/login`, {
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                    if (response.data.data.token) {
                        localStorage.removeItem("userToken");
                        localStorage.setItem("userToken", response.data.data.token);
                        this.$router.push("/dashboard");
                    } else {
                        this.alertMessage = "Username or password doesnt match to any user";
                    }
                });
        },
    },
};
</script>

<style>
</style>
