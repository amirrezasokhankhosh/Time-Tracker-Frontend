<template>
<div class="Sites">
    <h1>Sites</h1>
    <div v-if="sites[0]">
        <ul>
            <div v-for="site in sites" v-bind:key="site.id">
                <li>{{site.url}}</li>
            </div>
        </ul>
    </div>
    <div v-else>
        <p>No sites added yet!</p>
    </div>
    <router-link to="/new_site">Add a new site</router-link>
</div>
</template>

<script>
const axios = require('axios');
export default {
    name: "Sites",
    data() {
        return {
            sites: []
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
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
    }
};
</script>

<style>
</style>
