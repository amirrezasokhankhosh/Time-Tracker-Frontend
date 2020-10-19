<template>
<div class="delete_user_restrict"></div>
</template>

<script>
const axios = require('axios')
export default {
    name: 'Delete_user_restrict',
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .delete(`http://185.206.94.49:4000/api/restrict_user/${this.$route.params.id}`, {
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
