<!--<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="post.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="post.description"
          name="description"
        />
      </div>
      <button @click="savePost" class="btn btn-success">Envoyer</button>
    </div>
    <div v-else>
      <h4>Envoi effectué!</h4>
      <button class="btn btn-success" @click="newPost">Modifier</button>
    </div>
  </div>
</template>
<script>
import postService from "../../../../_services/postService";
export default {
  name: "add",
  data() {
    return {
      post: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    savePost() {
        var data = {
        title: this.post.title,
        description: this.post.description
      };
      postService.createPost(data)
        .then(res => {
          this.post.id = res.data.id;
          console.log(res.data);
          this.submitted = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    newPost() {
      this.submitted = false;
      this.post = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>-->