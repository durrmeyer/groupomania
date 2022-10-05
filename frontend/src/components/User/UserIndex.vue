<template>
  <div>
    <h2>DashBoard Administrateur</h2>

    <div class="container mt-3">
      <div class="row">
        <p class="h3 text-success fw-bold">
          Nombre d'utilisateurs ( {{ comptage }})
          <router-link to="/posts" class="btn btn-success btn-sm"
            ><i class="fa fa-eye"></i> Voir les posts</router-link
          >
        </p>
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
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-9">
              <div
                class="card"
                v-for="user in users"
                :key="user"
                :user="user"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="card-body text-center">
                        <img
                          src="../../assets/images/avatar.png"
                          alt="photo"
                          class="imageAvatar"
                          id="avatar"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-7">
                    <ul class="list-group">
                      <li class="list-group-item">
                        Nom: <span class="fw-bold"> {{ user.lastName }}</span>
                      </li>
                      <li class="list-group-item">
                        Prénom:
                        <span class="fw-bold">{{ user.firstName }}</span>
                      </li>
                      <li class="list-group-item">
                        Email: <span class="fw-bold">{{ user.email }}</span>
                      </li>
                      <li class="list-group-item">
                        Date Création du compte:<span class="fw-bold">
                          {{ dateFormat }}</span
                        >
                      </li>
                     
                    </ul>
                  </div>
                  <div class="col-sm-1">
                    <router-link
                      :to="`/profil/${id}`"
                      class="btn btn-warning my-1"
                      ><i class="fa fa-eye"></i
                    ></router-link>
                    <router-link
                      :to="`/profil/userEdit/${id}`"
                      class="btn btn-primary my-1"
                      ><i class="fa fa-pen"></i
                    ></router-link>
                    <button class="btn btn-danger" @click="deleteUser(users.id)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import layout from "../../assets/layouts/userProfile.vue";
import userService from "../../_services/userService";

export default {
  name: "UserIndex",
  components: {
    layout,
  },
  data() {
    return {
     
      users: [],
    };
  },
 
  created() {
    userService
      .getAllUsers()
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => console.log(err));
  },
  computed: {
    ...mapState({
      users: (state)=>state.users,
    }),
    comptage() {
      return this.users.length;
    },
  },
  method: {
    deleteUser(id) {
      console.log(index);
       this.$store.dispatch("deleteUser", id)
    },
  },
};
</script>