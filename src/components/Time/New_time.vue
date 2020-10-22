<template>
<div class="new_time">
    <h1>New time</h1>
    <input type="date" v-model="day">
    <input type="time" v-model="start_at">
    <input type="time" v-model="end_at">
    <p>{{day}} {{time}}</p>
    <select v-model="task_id">
        <option v-for="task in tasks" v-bind:key="task.id" v-bind:value="task.id">{{task.title}}</option>
    </select>
    <br>
    <button type="submit" @click="saveTime()">Save</button>

</div>
</template>

<script>
const axios = require('axios');
const url = require('../env');
export default {
    name: 'New_time',
    data() {
        return {
            start_at: null,
            end_at: null,
            task_id: null,
            tasks: [],
            day: null,
            time: null
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .get(`${url}/api/task`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.tasks = response.data.data.data;

                });
        } else {
            alert("You need to login first!");
            this.$router.push("/login");
        }
    },
    methods: {
        saveTime() {
            var userToken = localStorage.getItem("userToken");
            if (userToken) {
                axios
                    .post(`${url}/api/time`, {
                        day: this.day,
                        start_at: this.start_at,
                        end_at: this.end_at,
                        task_id: this.task_id
                    }, {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        },
                    })
                    .then(() => {
                        this.$router.push('/times')

                    });
            } else {
                alert("You need to login first!");
                this.$router.push("/login");
            }
        }
    }
}
</script>

<style>

</style>
