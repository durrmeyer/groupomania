
<template>
  <div id="add-blog">
    <h2>Nouveau post</h2>
    <form @submit.prevent="addPost" enctype="multipart/form-data">
      <label for="file" class="form-label">Image</label>
      <input
        class="form-control"
        type="file"
        accept="image/*"
        ref="file"
        name="image"
        @change="imageUpload()"
      />
      <label>Description:</label>
      <textarea
        v-model="description"
        label="description"
        name="description"
        required
      ></textarea>
      <button type="submit" class="button">Poster</button>
    </form>
  </div>
</template>

<script>
import postService from "../../_services/postService";
export default {
  name: "PostAdd",
  data() {
    return {
      userId: sessionStorage.getItem("UserId"),
      token: sessionStorage.getItem("token"),
      description: "",
      imageUrl: "",
    };
  },

  methods: {
    imageUpload() {
      this.image = this.$refs.file.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    addPost() {
      let id = this.$route.params.id;
      const formData = new FormData();
      formData.append("description", this.description);

      if (this.image !== null) {
        formData.append("image", this.imageUrl);
      }
      formData.append("userId", this.userId);
      console.log(formData);
      console.log("test", formData.get("description"));
      console.log("test", formData.get("image"));

      postService
        .createPost(formData)

        .catch((err) => console.log(err, "erreur de connexion"));
    },
  },
};
</script>
<style>
#add-blog* {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 500px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
}
#preview {
  margin: 30px 0;
  padding: 10px 20px;
  border: 1px dotted #ccc;
}
h3 {
  margin-top: 10px;
}
p {
  display: flex;
}
button {
  margin-top: 20px;
}
</style>

