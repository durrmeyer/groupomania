<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <a href="#" class="navbar-brand">Groupomania</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto" v-if="isUserLogged === false">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Connexion</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link"
              >Inscription</router-link
            >
          </li>
        </ul>

        <ul class="navbar-nav ml-auto" v-if="isUserLogged === true">
          <li class="nav-item">
            <router-link to="/posts" class="nav-link">Posts</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/profil/${id}" class="nav-link">Profil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/admin" class="nav-link"
              >Admin</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/moderateur" class="nav-link"
              >Moderateur</router-link
            >
          </li>
          <li class="nav-item" v-if="$store.state.isLoggedIn">
            <router-link to="/" @click="logOut()">Déconnexion</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {};
  },
  computed: {
    isUserLogged() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
