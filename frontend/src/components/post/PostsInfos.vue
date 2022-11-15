<template>
  <div>
    <h1>Bienvenue sur le Blog</h1>

    <button @click="PostAdd()">Ajouter un nouveau post</button>

    <div v-for="post in posts" :key="post.id" id="post.id">
      <div class="container">
        <div class="card">
          <div class="card-header">
            <div class="card-image">
              <div class="card-avatar">
                <img
                  v-if="post.User.image === null"
                  src="../../assets/images/avatar.png"
                  alt="photo de profil "
                  class="avatar"
                />
                <img
                  v-else
                  :src="post.User.image"
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
                :src="post.imageUrl"
                v-if="post.imageUrl"
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
                  title="like"
                  @click="likeUser(post.id)"
                >
                  <i class="far fa-heart" style="font-size: 26px"></i>
                </button>
                <div class="d-flex flex-column align-end pr-3"></div>
                <button
                  class="btn btn"
                  title="commentaire"
                  aria-label="bouton pour écrire un commentaire"
                  @click="CommentAdd(post.id)"
                >
                  <i class="fas fa-comment">Ajouter un commentaire</i>
                </button>
              </div>

              <div class="card-footer">
                <p>commentaires:{{ post.Comments.length }}</p>
                <div
                  class="card-list"
                  v-for="comment in post.Comments"
                  :key="comment.id"
                >
                  <img
                    v-if="comment.User.image !== null"
                    src="../../assets/images/avatar.png"
                    alt="photo de profil "
                    class="avatar"
                  />
                  <img
                    v-else
                    :src="comment.User.image"
                    alt="photo profil de l'utilisateur"
                    class="avatar"
                  />

                  <span
                    >{{ comment.User.firstName }} {{ comment.User.lastName }}
                  </span>
                  <div>
                    <span>{{ comment.content }}</span>
                  </div>
                  <button
                    v-if="comment.User.id == user.id"
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
    userLike() {
      const userId = this.$store.state.user.UserId;
      let like = this.post.Likes.map((id) => id.UserId.toString());
      console.log(typeof userId);
      console.log(typeof userLike);
      if (like.includes(userId)) {
        return "green";
      } else {
        return "";
      }
    },
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
      this.$router.push({ name: "CommentAdd", params: { id } });
    },
     delPost(id) {
      console.log(id, "krhgicpezrg");
      let deletePost = confirm(
        " la suppression de votre commentaire est irréversible, voulez-vous vraiment le supprimer ?"
      );
      if (deletePost == true) {
        this.$store.dispatch("deletePost", id)
      }
      console.log(id, "ok");
    },
    delComment(id) {
      console.log(id, "krhgicpezrg");
      let deleteComment = confirm(
        " la suppression de votre commentaire est irréversible, voulez-vous vraiment le supprimer ?"
      );
      if (deleteComment == true) {
        this.$store.dispatch("deleteComment", id)
      }
      console.log(id, "ok");
    },
    likeUser(id) {
    this.$store.dispatch("likeUser", id);
  },
  },

  
};
</script>