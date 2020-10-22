<template>
<div class="restrict_group">
    <h1>Restrict a group</h1>
    <select v-model="site_id">
        <option v-bind:value="site.id" v-for="site in sites" v-bind:key="site.id">{{site.url}}</option>
    </select>
    <select v-model="group_id">
        <option v-bind:value="group.id" v-for="group in groups" v-bind:key="group.id">{{group.name}}</option>
    </select>
    <br>
    <button type="submit" @click="saveRestrictGroup()">Save</button>
</div>
</template>

<script>
const axios = require('axios');
const url = require('../env')
export default {
    name: 'Restrict_group',
    data() {
        return {
            site_id: null,
            group_id: null,
            groups: [],
            sites: []
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
                });
            axios
                .get(`${url}/api/group`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
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
        saveRestrictGroup() {
            var userToken = localStorage.getItem("userToken");
            if (userToken) {
                axios
                    .post(`${url}/api/restrict_group`, {
                        site_id: this.site_id,
                        group_id: this.group_id
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

</style>>
