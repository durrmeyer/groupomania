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
                  <small v-if="v$.firstName.$error">{{
                    v$.firstName.$errors[0].$message
                  }}</small>
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
                  <small v-if="v$.lastName.$error">{{
                    v$.lastName.$errors[0].$message
                  }}</small>
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
                  <small v-if="v$.email.$error">{{
                    v$.email.$errors[0].$message
                  }}</small>
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
                  <small v-if="v$.password.$error">{{
                    v$.password.$errors[0].$message
                  }}</small>
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
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";

const regexEmail = helpers.regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const regexPassword = helpers.regex(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

export default {
  name: "Register",
  components: {
    PageLogin,
  },
  data() {
    return {
     user: {firstName: "",
      lastName: "",
      email: "",
      password: "",
      },
      v$: useVuelidate(),
    };
  },
  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email, regexEmail },
    password: {
      required,
      minLength: minLength(8),
     regexPassword,
    },
  },

  methods: {
    register() {
      this.v$.$touch()
      console.log('youpi', this.v$);
      
       if (this.v$.$errors.length === 0) {}
        console.log(this.user.firstName, 'vide');
       userService
      
          .register(this.user)
          .then((res) => {
             
            this.$router.push("/posts");
            console.log(res);
             console.log("tout est affiché");
          })
          .catch((err) => console.log(err, "inscription impossible"));
      
      
    },
  },
};
</script>