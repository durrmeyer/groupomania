<template>
    <div>
        Editer un user
        <div>{{ id }}</div>
    </div>
</template>

<script>
export default {
    name: 'UserEdit',
    props: ["id"],
    data(){
        return {
        test:''
        }
    },
  /*  mounted() {
        console.log(this.$route.params.id)
        this.test = this.$route.params.id
    },*/
}
</script>