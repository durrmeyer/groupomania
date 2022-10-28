<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand mt-8 mt-lg-0" href="#">
        <img src="../assets/images/1.png" height="200" alt="Groupomania Logo" />
      </a>

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-if="isUserLogged === true">
          <router-link to="/dashboard/admin" class="nav-link"
            >Admin</router-link
          >
        </li>
        <li class="nav-item" v-if="isUserLogged === true">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
      </ul>

      <div class="d-flex align-items-center">
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

        <div class="navprofil" v-if="isUserLogged === true">
          <img
            src="../assets/images/avatar.png"
            class="rounded-circle"
            height="90"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />

          <ul class="navAvatar-end" aria-labelledby="navbarMenuAvatar">
            <li class="nav-item" v-if="$store.state.isLoggedIn">
              <router-link to="/profil" class="nav-link"
                >Mon Compte</router-link
              >
            </li>
            <li class="nav-item" v-if="$store.state.isLoggedIn">
              <router-link to="/" @click="logOut()">Déconnexion</router-link>
            </li>
          </ul>
        </div>
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

<style scoped>
.nav-item {
  font-size: 25px;
}
.navprofil {
  display: flex;
}
ul {
  list-style-type: none;
}
a {
  text-decoration: none;
  color: black;
}

</style>

