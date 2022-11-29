<template>
  <div id="add-blog">
    <h2>Nouveau commentaire</h2>
    <form @submit.prevent="addComment" enctype="multipart/form-data">
      <label>Votre commentaire:</label>
      <textarea
        v-model="data.content"
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
export default {
  name: "CommentAdd",

  data() {
    return {
      token: localStorage.getItem("token"),
      UserId: localStorage.getItem("UserId"),
      data: { content: "", UserId: localStorage.getItem("UserId") },
    };
  },
  methods: {
    addComment() {
      this.$store.dispatch("getAllPosts");
      this.$store.dispatch("getPostById", this.$route.params.id);
      this.$store.dispatch("createComment", {
        id: this.$route.params.id,
        data: this.data,
      });
      this.$router.push("/posts");
    },
  },
};
</script>
