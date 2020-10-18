<template>
<div class="new_time">
    <h1>New time</h1>
    <input type="datetime" v-model="start_at" placeholder="Start at">
    <input type="datetime" v-model="end_at" placeholder="End at">
    <select v-model="task_id">
        <option v-for="task in tasks" v-bind:key="task.id" v-bind:value="task.id">{{task.title}}</option>
    </select>
    <br>
    <button type="submit" @click="saveTime()">Save</button>

</div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'New_time',
    data() {
        return {
            start_at: null,
            end_at: null,
            task_id: null,
            tasks: []
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .get("http://185.206.94.49:3333/api/task", {
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
                    .post("http://185.206.94.49:3333/api/time", {
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
