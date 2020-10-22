<template>
<div class="user_productivy">
    <h1>User Productivty</h1>
    <h2>User : {{ user.username }}</h2>
    <h3>Times :</h3>
    <ul>
        <div class="times" v-for="time in user.times" v-bind:key="time.id">
            <li>
                Day of time : {{ getDate(time) }}
                <br />
                Start time : {{ time.start_at }} | End time : {{ time.end_at }}
                <br />
                Total time minutes : {{ timeDiffrence(time.start_at, time.end_at) }}m
                <br />
                Total unproductive minutes : {{ time.totalUnproductiveTime }}m |
                Percent :
                {{
            (time.totalUnproductiveTime /
              timeDiffrence(time.start_at, time.end_at)) *
            100
          }}%
                <br />
                Productivity :
                {{
            100 -
            (time.totalUnproductiveTime /
              timeDiffrence(time.start_at, time.end_at)) *
              100
          }}%
                <br />
                <div v-if="time.unproductives[0]">
                    Unproductive sites that checked by this user in this time :
                    <div v-for="site in sites" v-bind:key="site.id">
                        <div v-for="unproductive in time.unproductives" v-bind:key="unproductive.id">
                            <div v-if="site.id == unproductive.site_id">
                                {{ site.url }} - (for
                                {{
                    timeDiffrence(unproductive.start_at, unproductive.end_at)
                  }}
                                minutes)
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <br />
        </div>
    </ul>
    <h3>Overall</h3>
    <p>Total time submited : {{totalTimeSubmited}}m</p>
    <p>Total unproductive times : {{totalUnproductiveTimes}}m</p>
    <p>Total Productivity : {{100 - ((totalUnproductiveTimes / totalTimeSubmited)*100)}}%</p>
</div>
</template>

<script>
const axios = require("axios");
const url = require('../env')
export default {
    name: "User_productivity",
    data() {
        return {
            user: {},
            sites: null,
            totalTimeSubmited: 0,
            totalUnproductiveTimes: 0
        };
    },
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .get(
                    `${url}/api/productivity/${this.$route.params.user_id}`, {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                )
                .then((response) => {
                    this.user = response.data.data;
                    for (var i = 0; this.user.times[i]; i++) {
                        this.totalTimeSubmited += this.timeDiffrence(this.user.times[i].start_at, this.user.times[i].end_at)
                    }
                    for (let i = 0; this.user.unproductives[i]; i++) {
                        this.totalUnproductiveTimes += this.timeDiffrence(this.user.unproductives[i].start_at, this.user.unproductives[i].end_at)
                    }
                });
            axios
                .get(`${url}/api/site`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
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
            var date = time.day.split("T");
            return date[0];
        },
        timeDiffrence(first, second) {
            var time_start = new Date();
            var time_end = new Date();
            var value_start = first.split(":");
            var value_end = second.split(":");
            time_start.setHours(value_start[0] - 20, value_start[1] - 30, 0, 0);
            time_end.setHours(value_end[0] - 20, value_end[1] - 30, 0, 0);
            return (time_end.getTime() - time_start.getTime()) / 60000;
        },
    },
};
</script>

<style>
</style>>
