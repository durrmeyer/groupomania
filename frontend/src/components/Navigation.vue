<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand mt-8 mt-lg-0" href="#">
        <img src="../assets/images/1.png" height="200" alt="Groupomania Logo" />
      </a>

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-if="isAdmin === true">
          <router-link to="/dashboard/admin" class="nav-link"
            >Admin</router-link
          >
        </li>
        <li class="nav-item" v-if="isModerateur === true">
          <router-link to="/dashboard/moderateur" class="nav-link"
            >Moderateur</router-link
          >
        </li>
        <li class="nav-item" v-if="isUserLogged === true">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

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
          <ul class="navAvatar-end" aria-labelledby="navbarMenuAvatar">
            <li class="nav-item" v-if="$store.state.isLoggedIn">
              <router-link to="/profil" class="nav-link"
                >Mon Compte</router-link
              >
            </li>
            <li class="nav-item" v-if="$store.state.isLoggedIn">
              <router-link to="/" @click="logOut()"
                ><i class="fa-solid fa-right-from-bracket"></i
              ></router-link>
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
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isModerateur() {
      return this.$store.getters.isModerateur;
    },
    isUserLogged() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
   
    logOut() {
      this.$store.dispatch("logout");
      this.$router.push("/");
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
