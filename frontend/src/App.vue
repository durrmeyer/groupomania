<template>
  <div id="app">
    <navigation />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div>
            <div class="auth-wrapper">
              <div class="auth-inner"><router-view></router-view ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: 'App',
  components: {
    Navigation,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
