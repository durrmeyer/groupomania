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
              <p class="login-card-description">Page d'inscription</p>
              <form @submit.prevent="register">
                <div class="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Prénom"
                    v-model="user.firstName"
                    autocomplete="current-firstName"
                  />
                </div>

                <div class="form-group">
                  <label for="lastName" class="form-label">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nom"
                    v-model="user.lastName"
                    autocomplete="current-lastname"
                  />
                </div>
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
                Vous avez un compte?
                <a href="/Login" class="login"> Connection</a>
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
  name: "Register",
  components: {
    PageLogin,
  },
  data() {
    return {
      user: { firstName: "", lastName: "", email: "", password: "" },
    };
  },

  methods: {
    register(user) {
      userService
        .register(this.user)
        .then((res) => {
          this.$router.push("/posts");
          console.log(res);
        })
        .catch((err) => console.log(err, "inscription impossible"));
    },
  },
};
</script>