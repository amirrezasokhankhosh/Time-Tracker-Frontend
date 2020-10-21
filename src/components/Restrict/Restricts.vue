<template>
<div class="restrics">
    <h1>Restrics</h1>
    <div class="group restrics">
        <h2>Group restrics</h2>
        <div v-if="sites_groups[0]">
            <ul>
                <div v-for="site_group in sites_groups" v-bind:key="site_group.id">
                    <div v-for="group in groups" v-bind:key="group.id">
                        <div v-for="site in sites" v-bind:key="site.id">
                            <div v-if="site_group.site_id == site.id && site_group.group_id == group.id">
                                <li>Site : {{site.url}} - Group : {{group.name}}</li>
                                <router-link v-bind:to="'/delete_group_restrict/' + site_group.id">delete this strict</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
        <div v-else>
            <p>No restrics for groups added yet</p>
        </div>
        <router-link to="/restrict_group">add a restrict for a group</router-link>
    </div>
    <div class="user restrics">
        <h2>User restrics</h2>
        <div v-if="sites_users[0]">
            <ul>
                <div v-for="site_user in sites_users" v-bind:key="site_user.id">
                    <div v-for="user in users" v-bind:key="user.id">
                        <div v-for="site in sites" v-bind:key="site.id">
                            <div v-if="site_user.site_id == site.id && site_user.user_id == user.id">
                                <li>Site : {{site.url}} - Username : {{user.username}}</li>
                                <router-link v-bind:to="'/delete_user_restrict/' + site_user.id">delete this strict</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
        <div v-else>
            <p>No restrics for groups added yet</p>
        </div>
    </div>
    <router-link to="/restrict_user">add a restrict for a user</router-link>
</div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'Restrics',
    data() {
        return {
            sites_groups: [],
            sites_users: [],
            sites: [],
            groups: [],
            users: [],
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
            axios
                .get("http://localhost:3333/api/group", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.groups = response.data.data.data;

                });
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
                .get("http://localhost:3333/api/restrict_user", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.sites_users = response.data;
                });
            axios
                .get("http://localhost:3333/api/restrict_group", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.sites_groups = response.data;
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
