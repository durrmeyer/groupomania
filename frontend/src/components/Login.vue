<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Réseau social de l'entreprise</h5>

      <div class="card-description">
        <p class="card-text">
          Bienvenue sur le nouveau réseau social de Groupomania.<br />
          Vous pouvez échanger entre collègues et suivre toutes les actualités
          de notre entreprise.
          <br />
          Et tout cela dans le respect et la bienveillance!<br />
        </p>
      </div>
    </div>
    <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div class="container">
        <div class="card login-card">
          <div class="row no-gutters">
            <div class="col-md-5">
              <img src="../assets/images/iconGroupomania.png" class="login-card-img" />
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <p class="login-card-description">Se connecter</p>
                <form @submit.prevent="login">
                  <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="name@example.com"
                      v-model="user.email"
                      autocomplete="current-email"
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="**********"
                      v-model="user.password"
                      autocomplete="current-password"
                    />
                  </div>
                  <button class="btn" type="submit">Connexion</button>
                </form>
                <p class="login-card-footer-text">
                  Vous n'avez pas encore de compte?
                  <a href="/Register" class="text-reset"> S'inscrire</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import PageLogin from "../assets/layouts/pageLogin.vue"
import accountService from "../_services/accountService";
import userService from "../_services/userService";
export default {
  name: "login",
  components: {
    PageLogin,
  },
  data() {
    return {
      user: { email: "", password: "" },
    };
  },
  methods: {
    login() {
      accountService
        .login(this.user)
        .then((res) => {
          accountService.setToken(res.data.token);
          userService.saveUserId(res.data.userId);
          userService.saveUser(res.data.user);
          this.$store.dispatch("token", res.data.token);
          this.$store.dispatch("user", res.data.user);
          this.$store.dispatch("getUserById", res.data.user.id);
          this.$router.push("/posts");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>