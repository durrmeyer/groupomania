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
                  v-if="post.User.imageUrl == null"
                  :src="post.User.imageUrl"
                  alt="photo  de l'utilisateur"
                  class="image"
                />
                <img
                  v-else
                  src="../../assets/images/avatar.png"
                  alt="image du profil"
                  class="img"
                />
              </div>
              <span>{{ post.User.firstName }} {{ post.User.lastName }} </span>
            </div>
            <p>a partagé une publication</p>
            <div
              v-if="
                $store.state.user.id == post.User.id ||
                $store.state.user.isAdmin == true
              "
            >
              <button
                class="btn btn-danger my-1"
                title="supprimer"
                aria-label="bouton supprimer"
                @click="delPost(post.id)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
              <button class="btn btn-primary my-1" @click="PostEdit(post.id)">
                <i class="fa fa-pen"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="img-container">
              <img
                v-if="post.imageUrl !== null"
                :src="post.imageUrl"
                alt="image du post"
                class="img"
              />
             
            </div>
            <div class="card-text">
              <p>{{ post.description }}</p>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center my-2 px-4">
              <div class="action--button--container text-right mt-10">
                <button @click="likeUser(post.id)">
                  <i
                    class="fa fa-thumbs-up"
                    style="font-size: 24px"
                   :class="postLiked" 
                  >
                    Like</i
                  >
                </button>
              </div>
                </div>
              <p class="text-xs font-light text-center">
                {{ post.Likes.length }}
              </p>
              <p>commentaires:{{ post.Comments.length }}</p>
              
            </div>
            <div class="card-footer">
                <div
                  class="card-list"
                  v-for="comment in post.Comments"
                  :key="comment.id"
                >
                  <span
                    >{{ comment.User.firstName }} {{ comment.User.lastName }}
                  </span>
                  <div>
                    <span>{{ comment.content }}</span>
                  </div>
                  <div
                    v-if="
                      $store.state.user.id == post.User.id ||
                      $store.state.user.isAdmin == true
                    "
                  >
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
import PostAdd from "../Post/PostAdd";
import CommentAdd from "../Comment/CommentAdd";
import PostEdit from "../Post/PostEdit";
export default {
  name: "postsInfo",
  components: {
    postLayout,
    PostAdd,
    CommentAdd,
    PostEdit,
  },
  data() {
    return {
      userId: localStorage.getItem("UserId"),
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
    postLiked() {
      // Le bouton like reste en rose si l'user a déjà liké l'article
      const userId = this.$store.state.user.userId;
      let userLike = this.post.Likes.map((id) => id.UserId); // A convertir pour comparaison avec userId
      console.log(typeof userId);
      console.log(typeof userLike);
      if (userLike.includes(userId)) {
        return "h-6 w-6 mr-1 text-pink-600 ";
      } else {
        return "h-6 w-6 mr-1 text-gray-300 hover:text-pink-600";
      }
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
      this.$router.push({ name: "CommentAdd", params: { id: id } });
    },
    PostEdit(id) {
      this.$router.push({ name: "PostEdit", params: { id: id } });
    },
    delPost(id) {
      let deletePost = confirm(
        " la suppression de votre commentaire est irréversible, voulez-vous vraiment le supprimer ?"
      );
      if (deletePost === true) {
        this.$store.dispatch("deletePost", id);
        alert("votre post a été supprimé");
      }
    },
    delComment(id) {
      let deleteComment = confirm(
        " la suppression de votre commentaire est irréversible, voulez-vous vraiment le supprimer ?"
      );
      if (deleteComment === true) {
        this.$store.dispatch("deleteComment", id);
        alert("votre commentaire a été supprimé");
      }
    },
    likeUser(id) {
      
    this.$store.dispatch("likeUser", id);
    },
  },
};
</script>
