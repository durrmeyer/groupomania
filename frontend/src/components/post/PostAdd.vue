<template>
  <div class="card" style="width: 30rem">
    <form @submit.prevent="addPost" enctype="multipart/form-data">
      <div class="container col-md-12">
        <div class="mb-5">
          <label for="file" class="form-label">Image</label>
          <input
            class="form-control"
            type="file"
            accept="image/*"
            ref="file"
            name="image"
            @change="imageUpload()"
          />
        </div>
      </div>
      <div class="card-body">
        <div class="card-form_group">
          <label for="post_title" class="form-label form-control-sm"
            >titre</label
          >
          <input
            type="text"
            class="form-control form-control-sm"
            rows="5"
            cols="20"
            id="title"
            v-model="title"
            required
          />
        </div>
        <div class="card-form_group">
          <label for="description" class="form-label form-control-sm"
            >Description
          </label>
          <input
            class="form-control form-control-sm"
            rows="5"
            cols="20"
            type="text"
            id="description"
            name="description"
            placeholder="Votre post ici !"
            v-model="description"
            required
          />
        </div>
        <button type="submit" class="button">Poster</button>
      </div>
    </form>
  </div>
</template>
<script>
import postService from "../../_services/postService";

export default {
  name: "PostAdd",

  data() {
    return {
      file: "",
      imageUrl: "",
      title: "",
      description: "",

      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    imageUpload() {
      this.image = this.$refs.file.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
      console.log(this.image);
    },

    addPost() {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("image", this.image);

      formData.append("title", this.title);
      formData.append("description", this.description);
     
      postService
        .createPost(formData)
        .then(() => {
          this.$router.push("/posts");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>