<template>
  <nav class="navbar navbar-light bg-light expand-lg">
    <a class="navbar-brand" href="#" alt="logo du site" title="logo du site"
      ><img
        to="/home"
        src="../assets/images/1.png"
        width="130"
        height="60"
        alt="logo Groupomania"
        title="logo groupomania"
        id="logo"
    /></a>

    <div>
      <ul class="nav" >
        <li class="nav-item">
          <router-link
            aria-label="connexion"
            alt="connexion"
            class="nav-link"
            to="/"
            >connexion</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            aria-label="inscription"
            alt="inscription"
            class="nav-link"
            to="/register"
            >inscription</router-link
          >
        </li>
      </ul>

      <ul class="nav">
        <li>
          <router-link
            aria-label="deconnection"
            alt="deconnection"
            class="nav-link"
            to="/"
          >
            <i class="fas fa-power-off"></i>
          </router-link>
        </li>
      
      
        
      </ul>

      <ul class="nav">
        <li class="nav-item active">
          <router-link
         
            to="/posts"
            aria-label="page des publications"
            alt="publication"
            title="publication"
            type="button"
            class="nav-link"
            ><i class="fas fa-home"></i
          ></router-link>
        </li>
      </ul>
      <ul>
        <li class="nav-item">
          <router-link
          
            aria-label="profil"
            alt="accès profil"
            title="accès profil"
            type="button"
            class="nav-link"
            to="/profil"
          >
            <i class="fas fa-user"></i
          ></router-link>
        </li>
        <router-link
          v-if="isAdmin == 'true'"
          class="nav-link"
          aria-label="Administrateur"
          alt="gestion du site"
          title="gestion du site"
          type="button"
          to="/admin/users"
        >
          <li class="nav-item" type="button" arial-label="voir son compte">
            <i class="fas fa-cogs"></i>
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavApp",
  data() {
    return {
      
    };
  },
   
  methods: {
    logout() {
      console.log("logout");
      localStorage.clear();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>