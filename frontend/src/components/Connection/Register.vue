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
                  <label for="firstname" class="form-label">Prénom</label>
                  <input
                    type="firstname"
                    class="form-control"
                    placeholder="Prénom"
                    id="firstname"
                    v-model="user.firstName"
                  />
                </div>
                <div class="form-group">
                  <label for="lastname" class="form-label">Nom</label>
                  <input
                    type="lastname"
                    class="form-control"
                    placeholder="Nom"
                    id="lastname"
                    v-model="user.lastName"
                  />
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="name@example.com"
                    id="email"
                    v-model="user.email"
                  />
                </div>
                <div class="form-group mb-4">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="**********"
                    v-model="user.password"
                  />
                </div>
                <button class="btn" type="submit">Envoyer</button>
              </form>
              <p class="login-card-footer-text">
                Vous avez un compte?
                <a href="/Login" class="text-reset"> Connection</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>



<script>
import pageLogin from "../../assets/layouts/pageLogin.vue";
import { accountService } from '../../_services';
export default {
  name: "Register",
  components: {
    pageLogin,
  },
  data() {
    return {
      user: { firstName: "", lastName: "", email: "", password: "" },
    };
  },
  
  methods: {
    register(){
      accountService
        .register(this.user)
        .then(res => {
          this.$router.push("/posts");
          console.log(res);
        })
        .catch((err) => console.log(err, "inscription impossible"));
    },
  },
};
</script>