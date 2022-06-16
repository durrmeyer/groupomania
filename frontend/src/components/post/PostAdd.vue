<template>
  <div class="card" style="width: 30rem">
    <form @submit.prevent="addPost()" enctype="multipart/form-data">
      <div class="container col-md-12">
        <div class="mb-5">
          <label for="file" class="form-label">Image</label>
          <input
            class="form-control"
            type="file"
            accept="image/*"
            ref="file"
            name="image"
            @change="imageUpload"
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
            id="post_title"
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
            id="content"
            name="content"
            placeholder="Votre post ici !"
            v-model="content"
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
      // post: {
      //user_id: "",
      // title: "",

      // content: "",
      // },
    };
  },

  methods: {
    imageUpload() {
      this.file = this.$refs.file.files[0];
      ///this.image = URL.createObjectURL(this.file);
      // console.log(this.imageUrl)
    },

    addPost() {
      const formData = new FormData();
      formData.append("file", this.file);
      console.log("test", formData.get("file"));

      postService
        .createPost(formData)
        
        
    },
  },
};
</script>