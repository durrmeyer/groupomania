<template>
  <div>
    <div
      class="card"
      v-if="
        $store.state.user.id == user.id || $store.state.user.isAdmin == true
      "
    >
      <h3 class="h3 text fw-bold">Profil</h3>
      <div style="margin-top: 154px">
        <div class="card-body text-center">
          <div class="card-text-center">
            <img
              v-if="user.imageUrl !== null"
              :src="user.imageUrl"
              alt="photo profil de l'utilisateur"
              class="avatar"
            />
            <img
              v-else
              class="avatar"
              width="45"
              src="../../assets/images/user.png"
              aria-label="avatar de l'utilisateur"
            />
          </div>

          <h1>{{ user.firstName }} {{ user.lastName }}</h1>

          <p>{{ user.email }}</p>
          <button
            class="btn btn-outline-info"
            aria-label="modifier"
            @click="addUser()"
          >
            <i class="fa fa-pen"></i>
          </button>
        </div>
      </div>
    </div>
    <router-link to="/posts" class="btn btn-success">
      <i class="fa fa-arrow-alt-circle-left"></i> Retour</router-link
    >
  </div>
</template>
<script>
import layout from "../../assets/layouts/profilLayout.vue";
import AddUser from "../../components/user/UserAdd";
import { mapState } from "vuex";
export default {
  name: " User",
  components: {
    layout,
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
  },
};
</script>
