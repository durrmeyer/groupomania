<template>
  <div>
    <section class="vh-100">
      <div class="title">
        <h1 class="card-title">Réseau social de l'entreprise</h1>
        <div class="card-body">
          <div class="card-description">
            <p class="card-text">
              Bienvenue sur le nouveau réseau social de Groupomania.<br />
              Vous pouvez échanger entre collègues et suivre toutes les
              actualités de notre entreprise.
              <br />
              Et tout cela dans le respect et la bienveillance!<br />
            </p>
          </div>
        </div>
      </div>
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="../assets/images/1.png"
              class="img-fluid"
              alt="logo-image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form @submit.prevent="login">
              <!-- Email input -->
              <div class="form-outline mb-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="name@example.com"
                  v-model="user.email"
                  autocomplete="current-email"
                />
                <label for="email" class="form-label">Email</label>
              </div>

              <!-- Password input -->
              <div class="form-outline mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="**********"
                  v-model="user.password"
                  autocomplete="current-password"
                />
                <label for="password" class="form-label">Password</label>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  style="padding-left: 2.5rem; padding-right: 2.5rem"
                >
                  Connexion
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Vous n'avez pas encore de compte?
                  <a href="/Register" class="text-reset"> S'inscrire</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import PageLogin from "../assets/layouts/pageLogin.vue";
import accountService from "../_services/accountService";
import userService from "../_services/userService";
export default {
  name: "Login",
  components: {
    PageLogin,
  },
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
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

          this.$store.dispatch("token", res.data.token);
          this.$store.dispatch("getUserById", res.data.user.id);

          this.$router.push("/posts");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>
