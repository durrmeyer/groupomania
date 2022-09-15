<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <a href="#" class="navbar-brand">Groupomania</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto" v-if="isUserLogged ===false">
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
            <router-link to="/profil" class="nav-link">Profil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Admin</router-link>
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
  }
};
</script>
<style scoped>
h4,
a {
  color: #fff;
  font-size: 18px;
  padding: 10px 35px 0;
}
li {
  display: flex;
  padding-right: 15px;
}
a {
  padding-top: 6px;
}
</style>