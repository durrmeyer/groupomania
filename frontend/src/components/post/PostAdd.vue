<template>
  <div id="add-blog">
    <h2>Créer un nouveau post</h2>
    <router-link to="/posts" class="btn btn-success">
      <i class="fa fa-arrow-alt-circle-left"></i> Retour</router-link
    >
    <form @submit.prevent="addPost" enctype="multipart/form-data">
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
      <button type="submit" class="button" @click.prevent="addPost()">
        Poster
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostAdd",
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
    addPost() {
      // transmission du formulaire au backend 
      const formData = new FormData();
      formData.append("description", this.description);
      formData.append("image", this.image);
      formData.append("UserId", this.userId);

      this.$store.dispatch("createPost", formData);
      this.$router.push("/posts");
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
