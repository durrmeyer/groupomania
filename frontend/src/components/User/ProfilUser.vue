
<template>
  <div>
    <div class="container mt-3">
      <div class="row align-items-center">
        <div class="col">
          <p class="h3 text-success fw-bold">Profil</p>
          <p class="fst_italic">
            Vita est illis semper in fuga uxoresque mercenariae conductae ad
            tempus ex pacto atque, ut sit species matrimonii, dotis nomine
            futura coniunx hastam et tabernaculum offert marito.
          </p>
        </div>
      </div>
    </div>
    <div class="container"  >
      <div class="row">
        <div class="col-md-4">
          <img
          
            src=""
            alt="photo de profil "
            class="avatar"
          />
        </div>
        <div class="col-md-6">
          <ul class="list-group">
           
            <li class="list-group-item">
              Nom: <span class="fw-bold">{{ user.lastName }} </span>
            </li>
            <li class="list-group-item">
              Prénom:
              <span class="fw-bold">{{ user.firstName }}</span>
            </li>
            <li class="list-group-item">
              Email: <span class="fw-bold">{{ user.email }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <router-link to="/posts" class="btn btn-success">
            <i class="fa fa-arrow-alt-circle-left"></i> Retour</router-link
          >
          <router-link to="/profil/userEdit/${user.id}" class="btn btn-primary my-1"
            ><i class="fa fa-pen"></i
          ></router-link>
          <button  class="fa fa-trash" @click="deleteUser(id)"></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: " userId",
  data() {
    return {
       userId: sessionStorage.getItem("UserId"),
     
    };
  },

  methods: {
   
    userEdit() {
      this.$router.push("/userEdit/${user.id}");
      console.log("ok");
    },
    deleteUser(id) {
      console.log(id, "go")
     this.$store.dispatch("deleteUser", id);
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      
    }),
  },
};
</script>
