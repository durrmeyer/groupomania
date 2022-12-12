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
            <Form @submit="register()">
              <div class="form-outline mb-4">
                <label for="email" class="form-label"
                  >Prénom
                  <span class="form-required">*</span>
                </label>
                <Field
                  name="firstName"
                  type="text"
                  class="form-control"
                  placeholder="Votre prénom"
                  v-model="user.firstName"
                  :rules="isRequired"
                  autocomplete="current-firstName"
                />
                <ErrorMessage name="firstName" />
              </div>

              <div class="form-outline mb-4">
                <label for="email" class="form-label"
                  >Nom
                  <span class="form-required">*</span>
                </label>
                <Field
                  name="lastName"
                  type="text"
                  class="form-control"
                  placeholder="votre Nom"
                  v-model="user.lastName"
                  :rules="isRequired"
                  autocomplete="current-firstName"
                />
                <ErrorMessage name="lastName" />
              </div>

              <!-- Email input -->
              <div class="form-outline mb-4">
                <label for="email" class="form-label"
                  >Email
                  <span class="form-required">*</span>
                </label>
                <Field
                  name="email"
                  type="text"
                  class="form-control"
                  placeholder="name@example.com"
                  v-model="user.email"
                  :rules="validateEmail"
                  required
                  autocomplete="current-email"
                />
                <ErrorMessage name="email" />
              </div>

              <!-- Password input -->
              <div class="form-outline mb-3">
                <label for="password" class="form-label"
                  >Password
                  <span class="form-required">*</span>
                </label>
                <Field
                  name="password"
                  type="password"
                  class="form-control"
                  placeholder="**********"
                  v-model="user.password"
                  required
                  :rules="isRequired"
                  autocomplete="current-password"
                />
                <ErrorMessage name="password" />
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
            </Form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageLogin from "../assets/layouts/pageLogin.vue";
import accountService from "../_services/accountService";
import { Field, Form, ErrorMessage } from "vee-validate";
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
        id: localStorage.getItem("userId"),
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
        return "Champs requis";
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "adresse mail non valide";
      }
      return true;
    },
    register() {
      accountService
        .register(this.user)
        .then(() => {
          this.$router.push({ name: "login" });
          console.log(this.user, "console log data");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>
