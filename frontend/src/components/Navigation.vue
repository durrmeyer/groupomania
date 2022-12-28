<template>
  <header>
    <div class="px-3 py-2 text-bg-dark">
      <div class="container">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
          <ul
            class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small"
          >
            <li v-if="isUserLogged === true">
              <router-link to="/posts" class="nav-link text-white"
                >Posts</router-link
              >
            </li>
            <li v-if="isAdmin === true">
              <router-link to="/dashboard/admin" class="nav-link text-white"
                >Admin</router-link
              >
            </li>
            <li v-if="isModerateur === true">
              <router-link
                to="/dashboard/moderateur"
                class="nav-link text-white"
                >Moderateur</router-link
              >
            </li>
            <div class="nan-profil">
              <li v-if="isUserLogged === true">
                <router-link to="/profil" class="nav-link text-white"
                  >Mon Profil</router-link
                >
              </li>
              <li v-if="$store.state.isLoggedIn">
                <router-link
                  to="/"
                  class="nav-link text-white"
                  @click="logOut()"
                  ><i class="fa-solid fa-right-from-bracket"></i
                ></router-link>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div class="px-3 py-2 border-bottom mb-3">
        <div class="container d-flex flex-wrap justify-content-center">
          <div class="text-end" v-if="isUserLogged === false">
            <ul class="nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link text-white"
                  >Connexion</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link text-white"
                  >Inscription</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
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
      this.$router.push("/");
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.nan-profil {
  display: flex;
  float: right;
  font-family: Lato;
}
.container {
  display: flex;
  justify-content: flex-end;
}
</style>
