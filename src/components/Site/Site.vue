<template>
<div class="site">
    <h1>Site : {{ site.url }}</h1>
    <p>Description : {{ site.description }}</p>
    <div class="restrict_for_all">
        Restrict for all : {{ site.restrict_for_all }}
        <button @click="toggleRestrictForAll()">Change</button>
    </div>
    <div class="group_restricts">
        <h2>Groups that are restricted for this site :</h2>

        <ul>
            <div v-for="group in groups" v-bind:key="group.id">
                <div v-for="restrictedGroup in site.groups" v-bind:key="restrictedGroup.id">
                    <div v-if="group.id == restrictedGroup.id">
                        <li>
                            {{ group.name }} <button @click="deleteRestrictGroup(site.id , group.id)">Delete this restrict</button>
                        </li>
                    </div>
                </div>
            </div>
        </ul>

        <router-link to="/restrict_group">add a restrict for a group</router-link>
    </div>
    <div class="user_restricts">
        <h2>Users that are restricted for this site :</h2>

        <ul>
            <div v-for="user in users" v-bind:key="user.id">
                <div v-for="restrictedUser in site.users" v-bind:key="restrictedUser.id">
                    <div v-if="user.id == restrictedUser.id">
                        <li>
                            {{ user.username }} <button @click="deleteRestrictUser(site.id , user.id)">Delete this restrict</button>
                        </li>
                    </div>
                </div>
            </div>
        </ul>

        <router-link to="/restrict_user">add a restrict for a user</router-link>
    </div>
</div>
</template>

<script>
const axios = require("axios");
const url = require('../env');
export default {
    name: "Site",
    data() {
        return {
            site: {},
            groups: [],
            users: [],
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .get(`${url}/api/site/${this.$route.params.site_id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })
                .then((response) => {
                    this.site = response.data.data;
                });
            axios
                .get(`${url}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })
                .then((response) => {
                    this.users = response.data.data.data;
                });
            axios
                .get(`${url}/api/group`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })
                .then((response) => {
                    this.groups = response.data.data.data;
                });
        } else {
            alert("You need to login first!");
            this.$router.push("/login");
        }
    },
    methods: {
        toggleRestrictForAll() {
            var userToken = localStorage.getItem("userToken");
            if (userToken) {
                axios
                    .put(
                        `${url}/api/site/${this.$route.params.site_id}`, {}, {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        }
                    )
                    .then(() => {
                        this.site.restrict_for_all = !this.site.restrict_for_all;
                    });
            } else {
                alert("You need to login first!");
                this.$router.push("/login");
            }
        },
        deleteRestrictGroup(site_id, group_id) {
            var userToken = localStorage.getItem("userToken");
            if (userToken) {
                axios
                    .delete(
                        `${url}/api/restrict_group/${site_id}/${group_id}`, {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        }
                    ).then(() => {
                        this.$router.go()
                    })
            } else {
                alert("You need to login first!");
                this.$router.push("/login");
            }
        },
        deleteRestrictUser(site_id, user_id) {
            var userToken = localStorage.getItem("userToken");
            if (userToken) {
                axios
                    .delete(
                        `${url}/api/restrict_user/${site_id}/${user_id}`, {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        }
                    ).then(() => {
                        this.$router.go()
                    })
            } else {
                alert("You need to login first!");
                this.$router.push("/login");
            }
        },
    },
};
</script>

<style>
</style>>
