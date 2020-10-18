<template>
<div class="register">
    <h2>Register</h2>
    <div v-if="alertMessage">
        <p v-text="alertMessage"></p>
    </div>
    <input type="text" v-model="name" placeholder="Name">
    <input type="text" v-model="username" placeholder="Username" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <input type="password" v-model="confirm_password" placeholder="Confirm Password" />
    <input type="number" v-model="national_code" placeholder="National code">
    <input type="text" v-model="phone" placeholder="Phone number">
    <input type="text" v-model="bio" placeholder="Bio">
    <br />
    <button type="submit" @click="register()">Submit</button>
</div>
</template>

<script>
const axios = require("axios");
export default {
    name: "Register",
    data() {
        return {
            name: null,
            username: null,
            email: null,
            password: null,
            confirm_password: null,
            national_code: null,
            phone: null,
            bio: null,
            alertMessage: null,
        };
    },
    methods: {
        register() {
            if (this.password == this.confirm_password) {
                console.log(this.phone)
                axios
                    .post("http://185.206.94.49:3333/api/auth/signup", {
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.confirm_password,
                        national_code: this.national_code,
                        phone_number: this.phone,
                        bio: this.bio,
                    })
                    .then((response) => {
                        console.log(response)
                        if (!response.data.error) {
                            this.$router.push("http://localhost:8080/login");
                        } else {
                            this.alertMessage = "Enter correct informations.";
                        }
                    });
            } else {
                this.alertMessage = "password and confirm password didn't match"
            }
        },
    },
};
</script>

<style>
</style>
