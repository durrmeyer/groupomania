<template>
  <div>
    <button class="btn btn-secondary btn-lg" @click="PostAdd()">
      Ajouter un nouveau post
    </button>
    <div>
      <div class="container" v-for="post in posts" :key="post.id">
        <div class="row" v-if="post.User">
          <div class="card blog-card">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="mr-2">
                    <img
                      class="avatar"
                      width="45"
                      v-if="post.User.imageUrl"
                      :src="post.User.imageUrl"
                      alt="photo  de l'utilisateur"
                    />
                    <img
                      v-else
                      class="avatar"
                      width="45"
                      src="../../assets/images/avatar.png"
                      alt="image du profil"
                    />
                  </div>
                  <div class="ml-2">
                    <div class="h5 m-0">
                      {{ post.User.firstName }} {{ post.User.lastName }}
                    </div>
                  </div>
                </div>
                <!--  si nous sommes l'utilisateur ou et l'admin alors on a l'autorisation de supprimer le post-->
                <div
                  class="add-to-action"
                  v-if="
                    $store.state.user.id == post.User.id ||
                    $store.state.user.isAdmin == true
                  "
                >
                  <button
                    class="btn btn-outline-info"
                    @click="PostEdit(post.id)"
                  >
                    <i class="fa fa-pen"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger my-1"
                    title="supprimer"
                    aria-label="bouton supprimer"
                    @click="delPost(post.id)"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div class="card-body">
                <div class="text-muted h7 mb-2">
                  {{ moment(post.createdAt).format("[le] DD MMMM YYYY") }}
                </div>
                <div class="cardbox-item">
                  <div v-if="post.imageUrl !== `null`">
                    <img
                      :src="post.imageUrl"
                      alt="image du post"
                      class="img-post"
                    />
                  </div>
                </div>

                <p class="card-text">
                  {{ post.description }}
                </p>
              </div>
              <div class="card-footer">
                <button @click="likeUser(post.id)" class="icon">
                  <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                  <p>Liker</p>
                </button>
                <button @click="CommentAdd(post.id)" class="icon">
                  <i class="fa-regular fa-comment-dots"></i>
                  <p>Commenter</p>
                </button>
              </div>
              <div class="footer">
                <!-- affiche le nombre de like et de commentaires-->
                <p>Like: {{ post.Likes.length }}</p>
                <p>commentaires: {{ post.Comments.length }}</p>
              </div>
            </div>
          </div>
          <!----Commentaires---->
          <div class="card-footer-list">
            <div
              class="card-list"
              v-for="comment in post.Comments"
              :key="comment.id"
            >
              <div class="card-comment">
                <div class="text">
                  <span
                    >{{ comment.User.firstName }} {{ comment.User.lastName }}
                    <div class="text-muted h7 mb-2">
                      {{
                        moment(comment.createdAt).format("[le] DD MMMM YYYY")
                      }}
                    </div>
                  </span>
                  <!--  si nous sommes l'utilisateur on a l'autorisation de supprimer le commentaire-->
                  <div v-if="$store.state.userId == comment.User.id">
                    <button
                      class="btn btn-outline-danger my-1"
                      title="supprimer"
                      aria-label="bouton supprimer"
                      @click="delComment(comment.id)"
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <p class="card-text">
                  {{ comment.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutPage from "../../assets/layouts/pagePosts";
import PostAdd from "../post/PostAdd";
import CommentAdd from "../comment/CommentAdd";
import PostEdit from "../post/PostEdit";
import moment from "moment";
export default {
  name: "postsInfo",
  components: {
    LayoutPage,
    PostAdd,
    CommentAdd,
    PostEdit,
  },
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
      content: "",
      like: [],
      imageUrl: "",
      data: { UserId: localStorage.getItem("UserId") },
    };
  },
  created() {
    this.moment = moment; // formatage de la date
    moment.locale("fr");
  },
  mounted() {
    // On récupère les informations de l'user ainsi que des posts disponibles pour l'affichage
    this.$store.dispatch("getUserById");
    this.$store.dispatch("getAllPosts");
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    posts() {
      return this.$store.getters.posts;
    },
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
      this.$store.dispatch("likeUser", {
        id: id,
        data: this.data,
      });
    },
  },
};
</script>
