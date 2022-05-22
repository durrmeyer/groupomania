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
              <form @submit.prevent="login()" methods="post">
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    v-model="user.email"
                    class="form-control"
                    placeholder="name@example.com"
                  />
                </div>
                <div class="form-group mb-4">
                  <label for="Password" class="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    v-model="user.password"
                    class="form-control"
                    placeholder="**********"
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
import { Form, Field } from "vee-validate";
import { accountService } from "../../_services/accountService";
export default {
  name: "Login",
  components: {
    PageLogin,
    Form,
    Field,
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
          console.log(res.data);
          accountService.saveToken(res.data.token);

          this.$router.push("/posts");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>
