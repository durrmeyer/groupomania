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
                <div class="card-avatar">
                  <img
                    v-if="user.image === null"
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
              <div class="flex items-center my-2 px-4">
                <div class="flex justify-between items-center mr-2">
                  <button
                    class="btn btn-primary"
                    type="button"
                    title="Liker"
                    @click="like(post.id)"
                  ></button>
                  <button
                    class="btn btn"
                    title="commentaire"
                    aria-label="bouton pour écrire un commentaire"
                    @click="CommentAdd(post.id)"
                  >
                    <i class="fas fa-comment"
                      >Ajouter un commentaire</i
                    >
                  </button>
                  <p class="text-xs font-light text-center">J'aime</p>
                </div>
                <div
                  class="card-list"
                  v-for="comment in comments"
                  :key="comment.id"
                >
                  <div class="card-footer" v-bind="comment">
                    <div @getComments="getAllComments()">
                      <p>
                        commentaires: <span>{{ post.content }}</span>
                      </p>
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
import CommentAdd from "../Comment/CommentAdd";
export default {
  name: "postsInfo",
  components: {
    PostAdd,
    CommentAdd,
  },
  data() {
    return {
     
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
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
    this.$store.dispatch("getAllComments");
  },
  methods: {
    PostAdd() {
      this.$router.push({ name: "PostAdd" });
    },
    CommentAdd(id) {
      this.$router.push({ name: "CommentAdd", params:{id} });
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