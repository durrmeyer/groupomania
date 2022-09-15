<template>
  <div >
    <h1>Bienvenue sur le Blog</h1>
    <div>{{ $store.state.title }} {{ user.firstName }}</div>

    <div>
      <button @click="PostAdd()">Ajouter un nouveau post</button>
      <div>
        <div
          class="card"
         
          style="width: 18rem"
        >
          <div class="card-header" >
            <div class="d-flex mr-3" size="52px">
              <img
                v-if="user.image == null"
                src="../../assets/images/avatar.png"
                alt="photo de profil "
                class="avatar"
              />
          
              <img
                v-else
                :src="user.image"
                alt="photo profil de l'utilisateur"
                class="avatar"
              />
            </div>
            <span>{{user.firstName }} {{ user.lastName }}</span>
            <span class="btn-end"> </span>
          </div>
          <div class="d-flex mr-3">
            <div class="card-body">
              <div class="img-container">
                <div>
                  <img v-bind:src="post.imageUrl" alt="image du post" class="img" />
                </div>
              </div>
              <div class="card-text">
                <p>{{ post.description }}bonjour</p>
              </div>
            </div>
            <button
              class="btn btn-danger"
              title="supprimer"
              aria-label="bouton supprimer"
              @click.prevent="supprimer"
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
                <a href="#" class="card-link">Ajouter un commentaire</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostLayout from "../../assets/layouts/PostLayout.vue";
import PostAdd from "../post/PostAdd.vue";

export default {
  name: "postsInfo",

  components: {
    PostLayout,
    PostAdd,
  },
  data() {
    
    return {
   
    image:"",
    
    };
  },
  computed:{
 user() {
      return this.$store.getters.user;
    },
  post() {
      return this.$store.getters.post;
    },
     },
  
  methods: {
    PostAdd() {
  
      this.$router.push({ name: "PostAdd" });
    },
  },
};
</script>
<style scoped>
.btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 45px;
  width: 40px;
}
</style>