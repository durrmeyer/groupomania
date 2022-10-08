
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

    <form
      id="form"
      enctype="multipart/form-data"
      @submit.prevent="updatePicture()"
    >
      <div class="card-body text-center" v-bind="user">
        <div v-if="user.image === null" class="dropdown text-center">
          <img
            src="../../assets/images/avatar.png"
            alt="photo de profil"
            class="avatar"
          />
        </div>
        <div v-else class="dropdown text-center">
          <img :src="user.image" alt="photo de profil" class="avatar" />
        </div>
      </div>
      <router-link to="" class="btn btn-primary my-1"
        ><i class="fa fa-pen"></i
      ></router-link>
    </form>
    <h1>{{ user.lastName }} {{ user.firstName }}</h1>
    <p class="role">rôle:</p>
    <p>{{ user.email }}</p>

    <div class="button">
      <button class="btn btn-danger my-1" @click="deleteUser(user.id)">
        <i class="fa fa-trash"></i>
      </button>
    </div>
    <router-link to="/posts" class="btn btn-success">
      <i class="fa fa-arrow-alt-circle-left"></i> Retour</router-link
    >
  </div>
  <!--<div>
    <div class="main ">
     
        <div class="title">
          <p class="h3 text-success fw-bold">Profil</p>
          <p class="fst_italic">
            Vita est illis semper in fuga uxoresque mercenariae conductae ad
            tempus ex pacto atque, ut sit species matrimonii, dotis nomine
            futura coniunx hastam et tabernaculum offert marito.
          </p>
        </div>
    <router-link to="/posts" class="btn btn-success">
            <i class="fa fa-arrow-alt-circle-left"></i> Retour</router-link
          >
    
    <div class="container-profil"  >
     
        <div class="col-md-4">
          <form
                id="form"
                enctype="multipart/form-data"
                @submit.prevent="updatePicture()"
              >
                <div class="card-body text-center" v-bind="user">
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
                      class=" avatar"
                    
                    />
                  </div>
                </div>
                
              </form>
        </div>
        <div class="col-md-6">
          <ul class="list-group">
           
           <li class="list-group-item">
              UserId: <span class="fw-bold">{{ user.id }} </span>
            </li>
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
     
      <div class="row mt-5">
        
        <div class="button">
          
          <router-link to="profil/add" class="btn btn-primary my-1"
            ><i class="fa fa-pen"></i
          ></router-link>
          <button  class=" btn btn-danger my-1" @click="deleteUser(user.id)"><i class="fa fa-trash"></i
          ></button>
        </div>
        </div>
      </div>
    </div>
  </div>-->
</template>
<script>
import { mapState } from "vuex";
import User from "../../assets/layouts/cardUser.vue";

export default {
  name: " User",
  components: {
    User,
  },
  data() {
    return {
      id: localStorage.getItem("userId"),
    };
  },

  methods: {
    userEdit() {
      this.$router.push("");
      console.log("ok");
    },
  },

  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
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