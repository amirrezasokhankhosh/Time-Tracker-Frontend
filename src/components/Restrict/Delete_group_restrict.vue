<template>
<div class="delete_group_restrict">
</div>
</template>

<script>
const axios = require('axios');
const url = require('../env')
export default {
    name: 'Delete_group_restrict',
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .delete(`${url}/api/restrict_group/${this.$route.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                })
                .then(() => {
                    this.$router.push('/restricts')

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
