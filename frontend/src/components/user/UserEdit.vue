
<template>
  <div>
    user Edit
    <div>{{ id }}</div>
  </div>
</template>

<script>
export default {
  name: "UserEdit",
  props:['id'],
  data() {
    return {
      
    };
  },
  /*mounted() {
    console.log(this.$route.params.id);
    this.test = this.$route.params.id;
  },*/
};
</script>






