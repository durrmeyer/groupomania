<template>
  <div>
    <button
      class="btn btn-secondary btn-lg"
      @click="PostAdd()"
    >
      Ajouter un nouveau post
    </button>
    <div>
      <div class="container" v-for="post in posts" :key="post.id" :post="post">
        <div class="card">
          <div class="card-header">
            <div class="card-image">
              <img
                v-if="post.User.imageUrl !== null"
                :src="post.User.imageUrl"
                alt="photo  de l'utilisateur"
                class="avatar"
              />
              <img
                v-else
                src="../../assets/images/avatar.png"
                alt="image du profil"
                class="img"
              />
            </div>
            <div class="text">
              <span>{{ post.User.firstName }} {{ post.User.lastName }} </span>
              <p>a partagé une publication</p>
              <p>{{ moment(post.createdAt).format("[le] DD MMMM YYYY") }}</p>
            </div>
            <div
              v-if="
                $store.state.user.id == post.User.id ||
                $store.state.user.isAdmin == true
              "
            >
              <button class="btn btn-primary my-1" @click="PostEdit(post.id)">
                <i class="fa fa-pen"></i>
              </button>
              <button
                class="btn btn-danger my-1"
                title="supprimer"
                aria-label="bouton supprimer"
                @click="delPost(post.id)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="card-text">
              <p>{{ post.description }}</p>
            </div>
            <div v-if="post.imageUrl !== null">
              <img :src="post.imageUrl" alt="image du post" class="img-post" />
            </div>

            <div class="card-info">
              <button @click="likeUser(post.id)">
                <i class="fa-regular fa-thumbs-up" style="font-size: 40px"></i>
              </button>
              <p>Like:{{ post.Likes.length }}</p>
              <button @click="CommentAdd(post.id)">
                <i
                  class="fa-regular fa-comment-dots"
                  style="font-size: 40px"
                ></i>
              </button>
              <p>commentaires:{{ post.Comments.length }}</p>
            </div>
          </div>
          <div class="card-footer">
            <div
              class="card-list"
              v-for="comment in post.Comments"
              :key="comment.id"
            >
              <div class="card-comment">
                <div class="text">
                  <span
                    >{{ comment.User.firstName }} {{ comment.User.lastName }}
                    <p>
                      a commenté
                      {{
                        moment(comment.createdAt).format("[le] DD MMMM YYYY")
                      }}
                    </p>
                  </span>
                </div>
                <div class="card-text">
                  <p>{{ comment.content }}</p>
                  <div
                    v-if="
                      $store.state.user.id == comment.User.id ||
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
    </div>
  </div>
</template>

<script>

import PostAdd from "../Post/PostAdd";
import CommentAdd from "../Comment/CommentAdd";
import PostEdit from "../Post/PostEdit";
import moment from "moment";
export default {
  name: "postsInfo",
  components: {
   
    PostAdd,
    CommentAdd,
    PostEdit,
  },
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
      content: "",
      visible: "false",
      like: [],
      dateFormat: "",
      data: { UserId: localStorage.getItem("UserId") },
      imageUrl:"",
    };
  },

  beforeMount() {
    this.$store.dispatch("getUserById");
    this.$store.dispatch("getAllPosts");
  },
  created() {
    this.moment = moment;
    moment.locale("fr");
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
    dateTime(index) {
      return moment(index).format("YYYY-MM-DD");
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
