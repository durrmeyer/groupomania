<template>
  <div>
    <div class="title">
      <h2>liste des utilisateurs il y en a {{ comptage }}</h2>
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
        <router-link to="/posts" class="btn btn-success btn-sm"
          ><i class="fa fa-eye"></i> Voir les posts</router-link
        >
      </div>
    </div>
    <main>
      <table class="table table-striped" v-bind="user">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Image</th>
            <th scope="col">Prénom</th>
            <th scope="col">Nom</th>
            <th scope="col">Email</th>
            <th scope="col">Rôle</th>
            <th scope="col">Date de Création</th>

            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>
              <router-link
                to="/profil/:id"
                class="text.decoration.none"
              ></router-link>
              {{ user.id }}
            </td>
            <td>
              
              <img
                v-if="user.imageUrl !== null"
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
            </td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.Role.roleName }}</td>
            <td>{{ dateFormat[index] }}</td>

            <div class="add-to-action">
              <div class="button">
                <button class="btn btn-primary my-1" @click="addUser(user.id)">
                  <i class="fa fa-pen"></i>
                </button>
                <button class="btn btn-danger my-1" @click="delUser(user.id)">
                  <i class="fa fa-trash" aria_hidden="true"></i>
                </button>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>
<script>
import userService from "../../_services/userService";
import AddUser from "../../components/User/UserAdd.vue";
export default {
  name: "UserIndex",
  components: {
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
    dateFormat() {
      return this.users.map((u) =>
        u.createdAt.split("T")[0].split("-").reverse().join("/")
      );
    },
  },
 mounted() {
    userService
      .getAllUsers()
      .then((res) => {
        this.users = res.data;
        console.log(this.users, "liste des users");
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
