<template>
  <div>
    <section class="vh-100">
      <div class="title">
        <div class="card-body">
          <div class="card-description">
            <p class="card-text">
              Bienvenue sur le nouveau réseau social de Groupomania.
              Vous pouvez échanger entre collègues et suivre toutes les
              actualités de notre entreprise.
              Et tout cela dans le respect et la bienveillance!
            </p>
          </div>
        </div>
      </div>
      <div class="container_login h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="../assets/images/1.png"
              class="img-fluid"
              alt="logo-image"
              id="image"
              name="image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form @submit.prevent="login">
              <label for="email" class="form-label">Email</label>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="email"
                  name="email"
                  class="form-control"
                  placeholder="name@example.com"
                  v-model="user.email"
                  autocomplete="current-email"
                />
              </div>
              <label for="password" class="form-label">Password</label>
              <div class="form-outline mb-3">
                <input
                  type="password"
                  id="password"
                  name="email"
                  class="form-control"
                  placeholder="**********"
                  v-model="user.password"
                  autocomplete="current-password"
                />
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button type="submit" class="btn btn-primary btn-lg">
                  Connexion
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Vous n'avez pas encore de compte?
                  <router-link to="/Register" class="nav-link"
                    >S'inscrire</router-link
                  >
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
import accountService from "../_services/accountService";
import userService from "../_services/userService";
export default {
  name: "Login",
  components: {},
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
