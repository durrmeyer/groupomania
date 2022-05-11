<template>
<div class="app">
   <Navigation/>
<div class="container">

    <div class="row">
        <div class="col-md-12">
            <div>
                <router-view></router-view>

            </div>
        </div>

    </div>
</div>
</div>
 
</template>

<script>
import Navigation from './components/Navigation.vue'
export default {
  name: 'App',
  components: {
    Navigation
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
