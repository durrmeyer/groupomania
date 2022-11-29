<template>
  <div>
    <h1>Bienvenue sur le Blog</h1>

    <button @click="PostAdd()">Ajouter un nouveau post</button>

    <div v-for="post in posts" :key="post.id">
      <div class="container">
        <div class="card">
          <div class="card-header">
            <div class="card-image">
              <div class="card-avatar">
                <img
                  v-if="post.User.imageUrl !== null"
                  src="../../assets/images/avatar.png"
                  alt="photo de profil "
                  class="avatar"
                />
                <img
                  v-else
                  :src="post.User.imageUrl"
                  alt="photo profil de l'utilisateur"
                  class="avatar"
                />
              </div>
              <span>{{ post.User.firstName }} {{ post.User.lastName }} </span>
            </div>

            <p>a partagé une publication</p>
            <button
                  v-if="
            $store.state.user.userId == post.User.id ||
              $store.state.user.isAdmin == true
          "
              class="btn btn-danger"
              title="supprimer"
              aria-label="bouton supprimer"
              @click="delPost(post.id)"
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button class="btn btn-primary my-1" @click="modifyPost(post.id)">
                <i class="fa fa-pen"></i>
              </button>
          </div>

          <div class="card-body">
            <div class="img-container">
              <img
                v-if="post.imageUrl !== null"
                :src="post.imageUrl"
                alt="image du post"
                class="img"
              />
              <img
                v-else
                src="../../assets/images/avatar.png"
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
              <div class="action--button--container text-right mt-10">
                <button
                  @click="increment(index)"
                  :id="post.id"
                  class="btn-sm btn-success"
                >
                  Like ({{ post.User.likes }})
                </button>

                <button
                  @click="decrement(index)"
                  :id="post.id"
                  class="btn-sm btn-danger"
                >
                  Dislike ({{ post.User.dislikes }})
                </button>
              </div>
              <div class="d-flex flex-column align-end pr-3"></div>
              <button
                class="btn btn"
                title="commentaire"
                aria-label="bouton  commentaire"
                @click="CommentAdd(post.id)"
              >
                <i class="fas fa-comment">Ajouter un commentaire</i>
              </button>
            </div>
            <p>commentaires:{{ post.Comments.length }}</p>
            <div class="card-footer">
              <div
                class="card-list"
                v-for="comment in post.Comments"
                :key="comment.id"
              >
                
                <!--<span
                  >{{ comment.user.firstName }} {{ comment.user.lastName }}
                </span>-->
                <div>
                  <span>{{ comment.content }}</span>
                </div>
                <button
                 
                  class="btn btn-danger"
                  title="supprimer"
                  aria-label="bouton supprimer"
                  @click="delComment(comment.id)"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postLayout from "../../assets/layouts/post.vue";
import postService from "../../_services/postService";
import PostAdd from "../Post/PostAdd";
import CommentAdd from "../Comment/CommentAdd";
export default {
  name: "postsInfo",
  components: {
    postLayout,
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
  },
  methods: {
    PostAdd() {
      this.$router.push({ name: "PostAdd" });
    },
    CommentAdd(id) {
      this.$router.push({name:"CommentAdd",  params: { id: id }});
    },
    delPost(id) {
      console.log(id, "krhgicpezrg");
      let deletePost = confirm(
        " la suppression de votre commentaire est irréversible, voulez-vous vraiment le supprimer ?"
      );
      if (deletePost === true) {
        this.$store.dispatch("deletePost", id);
         alert("votre post a été supprimé")
      }
      console.log(id, "ok");
    },
    delComment(id) {
      console.log(id, "commentaire supprimé");
      let deleteComment = confirm(
        " la suppression de votre commentaire est irréversible, voulez-vous vraiment le supprimer ?"
      );
      if (deleteComment === true) {
        this.$store.dispatch("deleteComment", id);
          alert("votre commentaire a été supprimé")
      }
      console.log(id, "ok");
    },
  
     
  },
};
</script>
