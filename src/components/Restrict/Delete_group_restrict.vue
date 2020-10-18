<template>
<div class="delete_group_restrict">
</div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'Delete_group_restrict',
    mounted: function () {
        var userToken = localStorage.getItem("userToken");
        if (userToken) {
            axios
                .delete(`http://185.206.94.49:3333/api/restrict_group/${this.$route.params.id}`, {
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
