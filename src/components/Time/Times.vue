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
const url = require('../env');
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
                .get(`${url}/api/time`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.times = response.data;
                });
        } else {
            alert("You need to login first!");
            this.$router.push("/login");
        }
    },
};
</script>

<style>
</style>
