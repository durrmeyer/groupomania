<template>
  <div id="app">
    <navigation />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  mounted() {
    this.$store.dispatch("getUserById");
  },
};
</script>

<style scoped></style>
