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
              <p class="login-card-description">Page d'inscription</p>
              <form @submit.prevent="Register">
                <div class="form-group">
                  <label for="firstname" class="form-label">Prénom</label>
                  <input
                    type="firstname"
                    id="firstname"
                    class="form-control"
                    placeholder="Prénom"
                  />
                </div>
                <div class="form-group">
                  <label for="firstname" class="form-label">Nom</label>
                  <input
                    type="lasttname"
                    id="lasttname"
                    class="form-control"
                    placeholder="Nom"
                  />
                </div>
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
                Vous avez un compte?
                <a href="#!" class="text-reset"> Connection</a>
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
  components: {
    Connection,
  },
    data() {
        return {
            firstname:'',
            lastname:'',
            email:'',
            password:'',
        }
    },
    methods: {
    ...mapActions(["Register"]),
    async register() {
      const User = new FormData();
      User.append("firstname", this.firstname);
       User.append("lastname", this.lastname);
      User.append("email", this.email);
      User.append("password", this.password);
      try {
        await this.Register();
        this.$router.push("/Posts");
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>