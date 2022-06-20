<template>
  <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../assets/images/1.png" class="login-card-img" />
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <p class="login-card-description">Page d'inscription</p>
              <Form @submit="register">
                <div class="form-group">
                  <label class="form-label form-label-top" for="firstName"
                    >Prénom
                    <span class="form-required">*</span>
                  </label>
                  <Field
                    name="firstName"
                    type="text"
                    class="form-control"
                    placeholder="Prénom"
                    v-model="user.firstName"
                    :rules="isRequired"
                    autocomplete="current-firstName"
                  />
                  <ErrorMessage class="form-required" name="firstName" />
                </div>
                <div class="form-group">
                  <label class="form-label form-label-top" for="lastName"
                    >Nom
                    <span class="form-required">*</span>
                  </label>
                  <Field
                    name="lastName"
                    type="text"
                    class="form-control"
                    placeholder="Nom"
                    v-model="user.lastName"
                    :rules="isRequired"
                    autocomplete="current-lastname"
                  />
                  <ErrorMessage class="form-required" name="lastName" />
                </div>
                <div class="form-group">
                  <label class="form-label form-label-top" for="email"
                    >Email <span class="form-required">*</span></label
                  >
                  <Field
                    name="email"
                    type="text"
                    class="form-control"
                    placeholder="name@example.com"
                    v-model="user.email"
                    :rules="validateEmail"
                    autocomplete="current-email"
                  />
                  <ErrorMessage class="form-required" name="email" />
                </div>
                <div class="form-group mb-4">
                  <label class="form-label form-label-top" for="password"
                    >Password <span class="form-required">*</span></label
                  >
                  <Field
                    name="password"
                    type="password"
                    class="form-control"
                    placeholder="**********"
                    v-model="user.password"
                    required
                    autocomplete="current-password"
                  />
                  <ErrorMessage class="form-required" name="password" />
                </div>
                <button class="btn" type="submit">Envoyer</button>
              </Form>
            </div>
            <p class="login-card-footer-text">
              Vous avez un compte?
              <a href="/Login" class="login"> Connection</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>




<script>
import PageLogin from "../../assets/layouts/pageLogin.vue";
import userService from "../../_services/userService";
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
      user: { firstName: "", lastName: "", email: "", password: "" },
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
      userService
        .register(this.user)
        .then((res) => {
          console.log(res);
        
          userService.saveToken(res.data.token);
          this.$router.push("/login");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>