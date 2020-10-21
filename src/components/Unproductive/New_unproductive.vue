<template>
<div class="new_unproductive">
    <h1>New unproductive</h1>
    <input type="date" v-model="day">
    <input type="time" v-model="start_at" placeholder="Start at">
    <input type="time" v-model="end_at" placeholder="End at">
    <select v-model="user_id">
        <option v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">{{user.username}}</option>
    </select>
    <select v-model="site_id">
        <option v-for="site in sites" v-bind:key="site.id" v-bind:value="site.id">{{site.url}}</option>
    </select>
    <br>
    <button type="submit" @click="saveUnproductive()">Save</button>
</div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'New_unproductive',
    data() {
        return {
            user_id: null,
            users: [],
            site_id: null,
            sites: [],
            start_at: null,
            end_at: null,
            day: null,
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .get("http://localhost:3333/api/user", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.users = response.data.data.data;

                });
            axios
                .get("http://localhost:3333/api/site", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.sites = response.data;
                });
        } else {
            alert("You need to login first!");
            this.$router.push("/login");
        }
    },
    methods: {
        saveUnproductive() {
            var userToken = localStorage.getItem("userToken");
            if (userToken) {
                axios
                    .post("http://localhost:3333/api/unproductive", {
                        day: this.day,
                        site_id: this.site_id,
                        user_id: this.user_id,
                        start_at: this.start_at,
                        end_at: this.end_at
                    }, {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        },
                    })
                    .then(() => {
                        this.$router.push('/unproductives')

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
