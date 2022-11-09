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
              alt="Sample image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form @submit.prevent="register">
              <div class="form-outline mb-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Léa"
                  v-model="user.firstName"
                  :rules="isRequired"
                  autocomplete="current-firstName"
                />
                <ErrorMessage class="form-required" name="firstName" />
                <label for="email" class="form-label">Prénom
                   <span class="form-required">*</span>
                </label>
              </div>

              <div class="form-outline mb-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Léa"
                  v-model="user.lastName"
                  :rules="isRequired"
                  autocomplete="current-firstName"
                />
                <ErrorMessage class="form-required" name="lastName" />
                <label for="email" class="form-label">Nom
                   <span class="form-required">*</span>
                </label>
              </div>

              <!-- Email input -->
              <div class="form-outline mb-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="name@example.com"
                  v-model="user.email"
                  autocomplete="current-email"
                />
                <label for="email" class="form-label">Email
                   <span class="form-required">*</span>
                </label>
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
                <label for="password" class="form-label">Password
                   <span class="form-required">*</span>
                </label>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  style="padding-left: 2.5rem; padding-right: 2.5rem"
                >
                 Inscription
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Vous n'avez pas encore de compte?
                  <a href="/" class="text-reset"> Connexion</a>
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
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "Register",
  components: {
    PageLogin,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      user: {
        id: sessionStorage.getItem("userId"),
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }
      return "Champ requis";
    },
    validateEmail(value) {
      if (!value) {
        return "email requis";
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "votre email n'est pas valide";
      }
      return true;
    },
    validatePassword(value) {
      if (!value) {
        return "password requis";
      }
      const regexPassword =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i;
      if (!regexPassword.test(value)) {
        return "votre mot de passe n'est pas valide";
      }
      return true;
    },
    register() {
      accountService
        .register(this.user)
        .then((res) => {
       
          this.$store.dispatch("getUserById", res.data.user.id);
          this.$router.push({ name: "login" });
          console.log(this.user, "console log data");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>

