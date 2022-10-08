<template>
  <div>
    <div class="main">
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
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-9">
              <div class="card-list" v-for="user in users" :key="user" :user="user">
                <div class="card-body">
                  <div class="container-profil">
                    <div class="col-md-4">
                      <form
                        id="form"
                        enctype="multipart/form-data"
                        @submit.prevent="updatePicture()"
                      >
                        <div class="card-body text-center">
                          <div
                            v-if="user.image === null"
                            class="dropdown text-center"
                          >
                            <img
                              src="../../assets/images/avatar.png"
                              alt="photo de profil"
                              class="avatar"
                            />
                          </div>
                          <div v-else class="dropdown text-center">
                            <img
                              :src="user.image"
                              alt="photo de profil"
                              class="avatar"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  
                  <div class="col-md-6">
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

                  <div class="row mt-5">
                    <div class="button">
                      <router-link to="profil/add" class="btn btn-primary my-1"
                        ><i class="fa fa-pen"></i
                      ></router-link>
                      <button
                        class="btn btn-danger my-1"
                       v-on:click="deleteUser"
                      >
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
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

import userService from "../../_services/userService";

export default {
  name: "UserIndex",

  data() {
    return {
      userId: sessionStorage.getItem("UserId"),
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

    comptage() {
      return this.users.length;
    },

  method: {
    deleteUser(id) {
      console.log(id);
      this.$emit('update' , user.id);
    },
  },
};
</script>