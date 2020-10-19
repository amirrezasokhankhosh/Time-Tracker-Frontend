<template>
<div class="unproductives">
    <h1>Unproductives</h1>
    <div v-if="unproductives[0]">
        <ul>
            <div v-for="unproductive in unproductives" v-bind:key="unproductive.id">
                <div v-for="site in sites" v-bind:key="site.id">
                    <div v-for="user in users" v-bind:key="user.id">
                        <div v-if="unproductive.user_id == user.id && unproductive.site_id == site.id">
                            <li>User : {{user.username}} | Site : {{site.url}} | Time : {{unproductive.start_at}} until {{unproductive.end_at}}</li>
                        </div>
                    </div>
                </div>
            </div>
        </ul>
    </div>
    <div v-else>
        <p>No unproductive times added yet!</p>
    </div>
    <router-link to="/new_unproductive">Add a unproductive time</router-link>
</div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'Unproductives',
    data() {
        return {
            unproductives: [],
            users: [],
            sites: [],
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .get("http://185.206.94.49:4000/api/user", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.users = response.data.data.data;

                });
            axios
                .get("http://185.206.94.49:4000/api/site", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.sites = response.data;
                });
            axios
                .get("http://185.206.94.49:4000/api/unproductive", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.unproductives = response.data;
                });
        } else {
            alert("You need to login first!");
            this.$router.push("/login");
        }
    }
}
</script>

<style>

</style>
