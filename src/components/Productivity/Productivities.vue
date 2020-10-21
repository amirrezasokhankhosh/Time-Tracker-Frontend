<template>
<div class="productivies">
    <h1>Report Productivies</h1>
    <div class="users" v-for="user in users" v-bind:key="user.id">
        <h2>User : {{user.username}} </h2>
        <h3>Times :</h3>
        <div v-if="user.times[0]">
            <ul>
                <div class="times" v-for="time in user.times" v-bind:key="time.id">
                    <li>
                        Day of time : {{getDate(time)}}
                        <br>
                        Start time : {{time.start_at}} |
                        End time : {{time.end_at}}
                        <br>
                        Total time minutes : {{timeDiffrence(time.start_at , time.end_at)}}m
                        <br>
                        Total unproductive minutes : {{time.totalUnproductiveTime}}m|
                        Percent : {{(time.totalUnproductiveTime / timeDiffrence(time.start_at , time.end_at)) * 100}}%
                        <br>
                        Productivity : {{100 - ((time.totalUnproductiveTime / timeDiffrence(time.start_at , time.end_at)) * 100)}}%
                        <br>
                        <div v-if="time.unproductives[0]">
                            Unproductive sites that checked by this user in this time :
                            <div v-for="site in sites" v-bind:key="site.id">
                                <div v-for="unproductive in time.unproductives" v-bind:key="unproductive.id">
                                    <div v-if="site.id == unproductive.site_id">
                                        {{site.url}} -
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <br>
                </div>
            </ul>
        </div>
        <div v-else>
            <p>This user has never submited any time! </p>
        </div>
        <router-link v-bind:to="'/user_productivity/' + user.id">More reports for this user</router-link>
    </div>
</div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'Productivities',
    data() {
        return {
            users: null,
            sites: null,
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .get("http://localhost:3333/api/productivity", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then((response) => {
                    this.users = response.data.data;
                    console.log(this.users)
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
        getDate(time) {
            var date = time.day.split('T')
            return date[0]
        },
        timeDiffrence(first, second) {
            var time_start = new Date()
            var time_end = new Date()
            var value_start = first.split(':')
            var value_end = second.split(':')
            time_start.setHours(value_start[0] - 20, value_start[1] - 30, 0, 0)
            time_end.setHours(value_end[0] - 20, value_end[1] - 30, 0, 0)
            return (time_end.getTime() - time_start.getTime()) / 60000
        }
    }
}
</script>

<style>

</style>>
