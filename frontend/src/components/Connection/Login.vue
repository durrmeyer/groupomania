<template>
  <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../assets/images/logoblanc.png" class="login-card-img" >
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <p class="login-card-description">Page de connection</p>
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    placeholder="name@example.com"
                  />
                </div>
                <div class="form-group mb-4">
                  <label for="Password" class="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="**********"
                  />
                </div>
                <button class="btn " type="submit">
                  Envoyer
                </button>
              </form>
              <p class="login-card-footer-text">
                Vous n'avez pas encore de compte?
                <a href="#!" class="text-reset"> S'inscrire</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Connection from "../../assets/layouts/Connection.vue";

import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {
    Connection,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["Login"]),
    async login() {
      const User = new FormData();
      User.append("email", this.email);
      User.append("password", this.password);
      try {
        await this.Login();
        this.$router.push("/posts");
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>
