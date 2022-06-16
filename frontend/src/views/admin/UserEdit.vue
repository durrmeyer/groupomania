<template>
  <div>
    <h1>page modification d'un utilisateur</h1>
    <form @submit.prevent="edit">
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
        <button type="submit" class="button">Modifier</button>
        <a href="/" class="button">Annuler</a>
      </div>
    </form>
  </div>
</template>

<script>
import userService from "../../_services/userService";
export default {
  name: "UserEdit",
  props: ["id"],
  data() {
    return {
      user: {},
    };
  },
  methods: {
    //envoi à l'api pour modification
    edit() {
      userService
        .updateUser(this.user)
        .then(res => this.$router.push('/admin/users'))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    //récupération à l'affichage de l'utilisateur
    userService
      .getUserById(this.id)
      .then((res) => {
        console.log(res);
        this.user = res.data;
        this.user.id = this.id;
      })
      .catch((err) => console.log(err));
  },
};
</script>