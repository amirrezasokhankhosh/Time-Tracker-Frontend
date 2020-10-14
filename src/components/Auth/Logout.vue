<script>
export default {
    name: 'Logout',
    mounted: function(){
        localStorage.removeItem('userToken')
        this.$router.push('/index')
    }
}
</script>

<style>

</style>