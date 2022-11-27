<template>
  <div id="add-blog">
    <h2>Nouveau commentaire</h2>
    <form @submit.prevent="addComment" enctype="multipart/form-data">
      <label>Votre commentaire:</label>
      <textarea
        v-model="content"
        label="content"
        name="content"
        required
      ></textarea>
      <button type="submit" class="button" @click.prevent="addComment()">
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
      UserId: localStorage.getItem("UserId"),
      content: "",
    };
  },
  methods: {
    addComment() {
      const formData = new FormData();
      formData.append("content", this.content);
      console.log(this.content);
      formData.append("UserId", this.UserId);
      console.log(this.UserId);
      formData.append("id", this.$route.params.id);
      console.log(this.$route.params.id);
          
      /*postService
        .createComment(this.$route.params.id, formData)
        .then(() => {
          this.$router.push("/posts");
        })
        .catch((err) => console.log(err, "erreur de connexion"));*/
    },
  },
};
</script>
