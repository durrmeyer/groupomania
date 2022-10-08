<template>
  <div>
    <h1>Bienvenue sur le Blog</h1>

    <button @click="PostAdd()">Ajouter un nouveau post</button>
    <div @getPosts="getAllPosts()">
      <div v-for="post in posts" :key="post.id" id="post.id">
        <div class="container">
          <div class="card">
            <div class="card-header">
              <div class="card-image">
                <div class="card-avatar" >
                  <img
                    v-if="user.image === null"
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
                 <span>{{ post.User.firstName }} {{ post.User.lastName }} </span>
              </div>
             
              <p>a partagé une publication</p>
              <button
                v-if="post.User.id === user.id"
                class="btn btn-danger"
                title="supprimer"
                aria-label="bouton supprimer"
                @click="delPost(post.id)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>

            <div class="card-body">
              <div class="img-container">
                <img
                  v-bind:src="post.imageUrl"
                  alt="image du post"
                  class="img"
                />
              </div>

              <div class="card-text">
                <p>{{ post.description }}</p>
              </div>
            </div>
            <div class="card-footer">
              <div class="flex flex-wrap mx-4 my-2">
                <p class="text-left">{{ post.User.content }}</p>
              </div>

              <div class="flex items-center my-2 px-4">
                <div class="flex justify-between items-center mr-2">
                  <button
                    class="btn btn-primary"
                    type="button"
                    title="Liker"
                    @click="like(post.id)"
                  ></button>
                  <p class="text-xs font-light text-center">J'aime</p>
                </div>
                <div class="flex justify-between items-center">
                  <button
                    type="button"
                    title="Accéder aux commentaires"
                    @click="showComments = !showComments"
                  >
                    Commentaire <i class="fas fa-comment"></i>
                  </button>
                  <p class="text-xs font-light text-center">
                    comments {{ post.User.content }}
                  </p>
                </div>
              </div>

              <div
                class="flex flex-col w-full p-3 my-3 rounded-md bg-gray-50"
                v-show="showComments"
              >
                {{ post.id }}
                <form>
                  <div class="flex items-center">
                    <textarea
                      class="content"
                      name="content"
                      ref="content"
                      type="text"
                      rows="15"
                      placeholder="Votre commentaire"
                      aria-label="Ecrire un commentaire"
                    />
                    <button
                      type="submit"
                      title="Envoyer le commentaire"
                      ref="comment"
                      @click="commentPost(post.id)"
                    >
                      Poster
                      <i class="far fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
                <div class="items-center p-2">
                  <div
                    v-for="comment in post.comments"
                    :key="comment.id"
                    class="flex my-2 items-center"
                  >
                    <img
                      v-if="comment.User.imageUrl === null"
                      src="../../assets/images/avatar.png"
                      alt="photo de profil "
                      class="avatar"
                    />
                    <div
                      class="
                        flex-col
                        items-center
                        w-full
                        p-2
                        bg-gray-100
                        rounded-xl
                      "
                    >
                      
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

import postService from "../../_services/postService";
import PostAdd from "../Post/PostAdd";
export default {
  name: "postsInfo",

  components: {
  
    PostAdd,
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      postId: "",
      showComments: false,
      content: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    posts() {
      return this.$store.getters.posts;
    },
    
  },
  created() {
    this.$store.dispatch("getAllPosts");
  },
  methods: {
    PostAdd() {
      this.$router.push({ name: "PostAdd" });
    },

    delPost(id) {
      console.log(id);
      postService
        .deletePost(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      this.posts.splice(id, 1);
    },
  },
  like(id) {
    this.$store.dispatch("postLike", id);
  },

 
  
};
</script>
