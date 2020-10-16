<template>
<div class="times">
    <h1>Times</h1>
    <div v-if="times[0]">
        <ul>
            <div v-for="time in times" v-bind:key="time.id">
                <li>Start at : {{time.start_at}} End at : {{time.end_at}}</li>
            </div>
        </ul>
    </div>
    <div v-else>
        <p>No times added yet!</p>
    </div>
    <router-link to="/new_time">Add a new time</router-link>
</div>
</template>

<script>
const axios = require('axios');
export default {
    name: "Times",
    data() {
        return {
            times: [],
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .get("http://127.0.0.1:3333/api/time", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.times = response.data;
                });
        } else {
            alert("You need to login first!");
            this.$router.push("http://localhost:8080/login");
        }
    },
};
</script>

<style>
</style>
