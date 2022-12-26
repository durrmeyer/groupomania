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
  <!-- <nav class="navbar navbar-expand-lg">
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
  </nav>-->
</template>

<script>
import navLayout from "../assets/layouts/navLayout.vue";
export default {
  name: "Navigation",
  components: {
    navLayout,
  },
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
/*.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container-fluid {
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid;
  background-color: aquamarine;
  height: 130px;
}
.fa-solid{
      margin-bottom: 12px;
}
.navAvatar-end{
      display: flex;
      align-items: flex-end;
    
}
.nav-item {
  font-size: 23px;
}
.navprofil {
  display: flex;
}

img {
  max-width: 100%;
}
ul {
  list-style-type: none;
}
a {
  text-decoration: none;
  color: black;
}
@media only screen and (max-width: 767px) {
img{
    margin-left: 80px;
  }
  .nav-item {
    font-size: 30px;
  }
  .navbar-nav {

    flex-direction: row-reverse;
  }
  .nav-item {
    margin-left: 20px;
  }
  .nav-link {
    font-size: 15px;
    margin-right: 15px;
  }
  .img-fluid {
    width: 49%;
  }
}*/
</style>
