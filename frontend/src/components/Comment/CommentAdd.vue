<template>
  <div id="add-blog">
    <h2>Nouveau commentaire</h2>
    <form @submit.prevent="addPost()" enctype="multipart/form-data">
      <label>Votre commentaire:</label>

      <textarea
        v-model="content"
        label="content"
        name="content"
        required
      ></textarea>
      <button type="submit" class="button" @click.prevent="addPost">
        Poster
      </button>
    </form>
  </div>
</template>

<script>
import postService from "../../_services/postService";
export default {
  name: "CommentAdd",
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      id: localStorage.getItem("postId"),

      content: "",
    };
  
  },

  methods: {
    addPost() {
      const formData = new FormData();
      formData.append("content", this.content);
      formData.append("UserId", this.userId);
      formData.append("PostId", this.$route.id);
          
      postService
        .createComment(this.$route.params.id, formData)
        .then(() => {
          this.$router.push("/posts");
        })
        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>