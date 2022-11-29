<template>
  <div class="card">
    <div class="title">
      <p class="h3 text-success fw-bold">Profil</p>
      <p class="fst_italic">
        Vita est illis semper in fuga uxoresque mercenariae conductae ad tempus
        ex pacto atque, ut sit species matrimonii, dotis nomine futura coniunx
        hastam et tabernaculum offert marito.
      </p>
    </div>

    <div class="card-body text-center">
      <div class="dropdown text-center">
        <img
          v-if="user.imageUrl == null"
          src="../../assets/images/avatar.png"
          alt="photo de profil "
          class="avatar"
        />
        <img
          v-else
          :src="user.imageUrl"
          alt="photo profil de l'utilisateur"
          class="avatar"
        />
      </div>

      <h1>{{ user.firstName }} {{ user.lastName }}</h1>

      <p>{{ user.email }}</p>
      <button @click="addUser()" class="btn btn-primary my-1">
        <i class="fa fa-pen"></i>
      </button>
      <div class="button">
        <button @click="deleteUser(user.id)">
          <i class="fa fa-trash"></i>
        </button>
      </div>
      <router-link to="/posts" class="btn btn-success">
        <i class="fa fa-arrow-alt-circle-left"></i> Retour</router-link
      >
    </div>
  </div>
</template>
<script>
import User from "../../assets/layouts/cardUser.vue";
import AddUser from "../../components/User/UserAdd.vue";
import { mapState } from "vuex";
export default {
  name: " User",
  components: {
    User,
    AddUser,
  },
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
      imageUrl: "",
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    addUser() {
      this.$router.push("/profil/add");
    },
    deleteUser(id) {
      this.$store.dispatch("deleteUser", id);
    },
  },
};
</script>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: auto;
  text-align: center;
}
.title {
  color: grey;
  font-size: 18px;
}
button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}
a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}
button:hover,
a:hover {
  opacity: 0.7;
}
</style>
