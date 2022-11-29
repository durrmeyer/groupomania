<template>
  <div id="add-blog">
    <h2>Modifier son post</h2>
    <form @submit.prevent="addEdit" enctype="multipart/form-data">
      <label for="file" class="form-label">Image</label>
      <input
        id="image"
        class="form-control"
        type="file"
        ref="image"
        name="image"
        @change="select()"
      />
      <label>Description:</label>
      <textarea
        v-model="description"
        label="description"
        name="description"
        required
      ></textarea>
      <button type="submit" class="button" @click.prevent="addEdit()">
        Poster
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostEdit",
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      description: "",
      imageUrl: "",
    };
  },

  methods: {
    select() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    addEdit() {
          let id = this.$route.params.id;
      const formData = new FormData();
      if (this.description !== null) {
        formData.append("description", this.description);
      }
    
      if (this.imageUrl !== null) {
        formData.append("imageUrl", this.imageUrl);
      }
      this.$store.dispatch("updatePost", {
        id: id,
        data: formData,
      });
      
      this.$router.push("/posts");
  
    },

  },

};
</script>
