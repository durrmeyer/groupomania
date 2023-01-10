<template>
  <div>
    <div class="title">
      <div class="title">
        <p class="h3 text-success fw-bold">DashBoard Administrateur</p>
        <p class="fst-italic">
          The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum."
        </p>
        <h2>liste des utilisateurs</h2>
        <br />
        <p>Nombre d'utilisateurs : {{ comptage }}</p>
        <router-link to="/posts" class="btn btn-outline-secondary"
          ><i class="fa fa-eye"></i> Voir les posts</router-link
        >
      </div>
    </div>
    <div class="col-xl-12 mb-4">
      <div class="card" v-for="user in users" :key="user.id">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img
                v-if="user.imageUrl !== null"
                :src="user.imageUrl"
                alt="photo profil de l'utilisateur"
                class="avatar"
              />
              <img
                v-else
                src="../../assets/images/avatar.png"
                alt="photo de profil "
                class="avatar"
              />
              <p>{{ user.Role.roleName }}</p>
              <div class="ms-2">
                <p class="fw-bold mb-1">
                  {{ user.firstName }} {{ user.lastName }}
                </p>
                <p class="text-muted mb-0">{{ user.email }}</p>
              </div>
            </div>
            <button
              class="btn btn-outline-danger my-1"
              @click="delUser(user.id)"
            >
              <i class="fa fa-trash" aria_hidden="true"></i>
            </button>
          </div>
        </div>
        <div
          class="card-footer border-0 bg-light p-2 d-flex justify-content-around"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import Layout from "../../assets/layouts/dashLayout";
import userService from "../../_services/userService";
import AddUser from "../../components/user/UserAdd";
export default {
  name: "UserIndex",
  components: {
    Layout,
    AddUser,
  },
  data() {
    return {
      users: [],
      user: {},
    };
  },

  computed: {
    comptage() {
      return this.users.length;
    },
  },
  mounted() {
    userService
      .getAllUsers()
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    addUser(uid) {
      this.$router.push({ name: "UserAdd", params: { id: uid } });
    },

    delUser(id) {
      let deleteUser = confirm(
        " la suppression de votre compte est irréversible, voulez-vous vraiment supprimer le compte ?"
      );
      if (deleteUser == true) {
        this.$store.dispatch("deleteUser", id);
      }
    },
  },
};
</script>
