<template>
<div class="new_site">
    <h1>New Site</h1>
    <input type="text" v-model="url" placeholder="Url">
    <input type="text" v-model="description" placeholder="Description">
    <br>
    Restrict for all users : <input type="checkbox" v-model="restrict_for_all">
    <br>
    <button type="submit" @click="saveSite()">Save</button>
</div>
</template>

<script>
const axios = require('axios');
export default {
    name: "New_site",
    data() {
        return {
            url: null,
            description: null,
            restrict_for_all: false,
        };
    },
    methods: {
        saveSite() {
            var userToken = localStorage.getItem("userToken");
            if (userToken) {
                axios
                    .post("http://185.206.94.49:4000/api/site", {
                        url: this.url,
                        description: this.description,
                        restrict_for_all: this.restrict_for_all
                    }, {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    })
                    .then(() => {
                        this.$router.push('/sites');
                    });
            } else {
                alert("You need to login first!");
                this.$router.push("/login");
            }
        },
    },
};
</script>

<style>
</style>
