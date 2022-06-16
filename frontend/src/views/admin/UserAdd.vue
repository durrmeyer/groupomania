<template>
  <div>
    <h1>Création d'un utilisateur</h1>
    <form @submit.prevent="ajout">
      <div class="formGroup">
        <label for="user_lastName">Nom</label>
        <input type="text" id="user_lastName" v-model="user.lastName" />
      </div>
      <div class="formGroup">
        <label for="user_firstName">prénom</label>
        <input type="text" id="user_firstName" v-model="user.firstName" />
      </div>
      <div class="formGroup">
        <label for="user_email">email</label>
        <input type="text" id="user_email" v-model="user.email" />
      </div>
      <div class="formGroup">
        <label for="user_password">mot de passe</label>
        <input type="text" id="user_password" v-model="user.password" />
      </div>
      <div class="formGroup">
        <label for="passwordConfirm">mot de passe à confirmer</label>
        <input type="text" id="passwordConfirm" v-model="passwordConfirm" />
      </div>
      <div class="formGroup">
        <button type="submit" class="button">Créer un utilisateur</button>
        <a href="/" class="button">Annuler</a>
      </div>
    </form>
  </div>
</template>
<script>
import userService from "../../_services/userService"
export default {
  name: "UserAdd",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      passwordConfirm: "",
    };
  },

  methods: {
    ajout() {
      console.log(this.user, this.passwordConfirm);
      userService.createUser(this.user)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
  },
};
</script>