<template>
  <div id="add-blog">
    <h2>Modifier son post</h2>
    <form @submit.prevent="updatePost" enctype="multipart/form-data">
      <label for="file" class="form-label">Image</label>
      <input
        id="image"
        class="form-control"
        type="file"
        ref="image"
        name="image"
        accept="image/png, image/jpeg, image/gif"
        @change="select()"
      />
      <label>Description:</label>
      <textarea
        v-model="post.description"
        label="description"
        name="description"
      ></textarea>
      <button type="button" class="button" @click.prevent="addEdit()">
        Poster
      </button>
    </form>
  </div>
</template>

<script>
import postService from "../../_services/postService";
export default {
  name: "PostEdit",
  data: function () {
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
      imageUrl: "",
      post: { description: "" },
    };
  },
  mounted() {
    this.$store.dispatch("getPostById", this.$route.params.id);
  },
  methods: {
    select() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    addEdit() {
      const formData = new FormData();
      formData.append("description", this.post.description);
      formData.append("image", this.image);

      this.$store.dispatch("updatePost", {
        id: this.$route.params.id,
        data: formData,
      });
      this.$router.push("/posts");
    },
  },
};
</script>
