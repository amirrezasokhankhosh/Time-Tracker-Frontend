<template>
<div class="restrict_user">
    <h1>Restrict a user</h1>
    <select v-model="site_id">
        <option v-bind:value="site.id" v-for="site in sites" v-bind:key="site.id">{{site.url}}</option>
    </select>
    <select v-model="user_id">
        <option v-bind:value="user.id" v-for="user in users" v-bind:key="user.id">{{user.username}}</option>
    </select>
    <br>
    <button type="submit" @click="saveRestrictUser()">Save</button>
</div>
</template>

<script>
const axios = require('axios');
const url = require('../env');
export default {
    name: 'Restrict_user',
    data() {
        return {
            user_id: null,
            site_id: null,
            sites: [],
            users: []
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .get(`${url}/api/site`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.sites = response.data;
                    console.log(this.sites)
                });
            axios
                .get(`${url}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.users = response.data.data.data;
                });
        } else {
            alert("You need to login first!");
            this.$router.push("/login");
        }
    },
    methods: {
        saveRestrictUser() {
            var userToken = localStorage.getItem("userToken");
            if (userToken) {
                axios
                    .post(`${url}/api/restrict_user`, {
                        site_id: this.site_id,
                        user_id: this.user_id
                    }, {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        },
                    })
                    .then(() => {
                        this.$router.go(-1)

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
