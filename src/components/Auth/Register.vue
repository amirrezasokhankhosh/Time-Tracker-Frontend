<template>
  <div class="register">
    <h2>Register</h2>
    <div v-if="alertMessage">
        <p v-text="alertMessage"></p>
    </div>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
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
      username: null,
      email: null,
      password: null,
      alertMessage: null,
    };
  },
  methods: {
    register() {
      axios.post("http://127.0.0.1:3333/register", {
        username: this.username,
        email: this.email,
        password: this.password,
      }).then(response => {
          if(!response.data.error){
              this.$router.push('http://localhost:8080/login')
          } else {
              this.alertMessage = "Enter correct informations."
          }
      });
    },
  },
};
</script>

<style>
</style>