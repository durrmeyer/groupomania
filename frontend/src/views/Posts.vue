<template>
  <div>
    <h1>page principale</h1>

    <div class="card-cart-container">
      <div class="section_post">
        <button @click="PostAdd">Ajouter un nouveau post</button>
      </div>
      <div class="card-container">
        <div v-for="post in posts" class="card" :key="post.id">
          <div class="card_author">
            <div class="d-flex mr-3">
              <a href=""
                ><img
                  class="img-fluid rounded-circle"
                  src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/5.jpg"
                  alt="User"
                />
                <p>{{ post.firstName }} {{ post.lastName }}</p></a
              >
            </div>

            <p>posté le : {{ post.updatedAt }}</p>
          </div>
          <div class="img-container">
            <img v-bind:src="post.image" alt="image du post" />
          </div>
          <div class="card-text">
            <h2>titre:</h2>
            <h3>{{ post.title }}</h3>
            <h2>Description:</h2>
            <p>{{ post.description }}</p>
          </div>
          <div class="card-icons">
            <div class="like-container">
              <input type="checkbox" name="checkbox" v-bind:id="post.id" />
              <label v-bind:for="post.id">
                <i class="fas fa-heart" aria-hidden="true"></i>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import CreateComment from "../components/CreateComment.vue";
import PostLayout from "../assets/layouts/PostLayout.vue";
import postService from "../_services/postService";
export default {
  name: "Posts",
  components: {
    PostLayout,
  },

  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    postService
      .getAllPosts()
      .then((res) => {
        console.log(res.data);
        this.posts = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    PostAdd() {
      this.$router.push({ name: "PostAdd" });
    },
  },
};
</script>
<!--<div
      class="card"
      :key="post.id"
      v-for="post in posts /*.slice().reverse()*/"
    >
      <div
        class="card-header"
        v-for="user in users.filter((user) => {
          return user.id == post.userId;
        })"
        :key="user.id"
      >
        <img
          v-if="user.imageUrl == null"
          src="/"
          alt="photo de profil"
          title="photo de profil"
          class="avatar"
        />
        <img
          v-else
          :src="user.imageUrl"
          class="avatar"
          alt="profile picture"
          title="picture profile"
        />
        <span class="card-title">prénom Nom</span>
      </div>
      <p v-if="post.content !== 'null'" class="card-text">{{ post.content }}</p>
      
      <div v-if="post.imageUrl">
        <img
          class="card-img"
          :src="post.imageUrl"
          alt="image de la publication"
          title="image du post d'un utilisateur"
        />
      </div>
      <span class="btn-end" v-if="user.id == post.userId">
        <button
          class="btn btn-danger"
          title="supprimer"
          aria-label="bouton supprimer"
          v-bind="post"
          @click.prevent="deletePublication(post.id)"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button> </span
      >
      <button class="btn btn-primary" @click="showComments = !showComments">
        Commentaires <i class="fas fa-comment"></i>
      </button>
      <div v-if="showComments">
        <div v-if="comments">
          <div
            class="card-comment"
            v-for="comment in comments.filter((comment) => {
              return comment.postId == post.id;
            })"
            :key="comment.id"
          >
            <p
              v-for="user in users.filter((user) => {
                return user.id == comment.userId;
              })"
              :key="user.id"
            >
              <img
                v-if="user.imageUrl == null"
                src="/"
                alt="photo de profil provisoire"
                title="photo de profil"
                class="rouned-circle mr-1 avatar"
              />
              <img
                v-else
                :src="user.imageUrl"
                class="avatar"
                alt="profile picture"
                title="picture profile"
              />
              <span class="card-title"
                >{{ user.firstName }} {{ user.lastName }}</span
              >
            </p>
            <p class="card-description comment">{{ comment.content }}</p>
            <div v-if="comment.userId == user.id" id="btn-trash">
              <button
                class="btn-secondary"
                title="supprimer le commentaire"
                aria-label="bouton supprimer un commentaire"
                @click.prevent="deleteComment(comment.id)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>-->