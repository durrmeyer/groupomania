<template>
  <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img
              src="../../assets/images/logoblanc.png"
              class="login-card-img"
            />
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
                <button class="btn" type="submit">Envoyer</button>
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
</template>
<script>
import PageLogin from "../../assets/layouts/pageLogin.vue";
import userService from "../../_services/userService";

export default {
  name: "Login",
  components: {
    PageLogin,
  },
  data() {
    return {
      user: { email: "", password: "" },
    };
  },
  /*computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profil");
    }
  },*/
  methods: {
    login() {
      userService
        .login(this.user)
        .then((res) => {
          //console.log(res.data.token, 'hrcgiehrgpùzier');
          userService.saveToken(res.data.token);
          this.$router.push("/admin");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>