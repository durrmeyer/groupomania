<template>
  <div>
    <h3>Modification du post</h3>
    {{ id }}
    <form @submit.prevent="ajout()">
      <input type="text" id="user_id" v-model="post.user_id" hidden />

      <div class="formGroup">
        <label for="post_image">Image</label>
         <input
            class="form-control"
            type="file"
            accept="image/*"
            ref="file"
            name="image"
            @change="imageUpload()"
          />
      </div>
      <div class="formGroup">
        <label for="post_description">description</label>
        <input type="text" id="post_title" v-model="post.description" />
      </div>

      <div class="formGroup">
        <button type="submit" class="button">Modifier</button>

        <a href="@/posts" class="button">Annuler</a>
      </div>
    </form>
  </div>
</template>
<script>
import postService from "../../_services/postService";

export default {
  name: "PostEdit",
  props: ["id"],
  data() {
    return {
      post: {},
    };
  },

  methods: {
    ajout() {
      console.log;
      postService
        .updatePost(this.post)
        .then((res) => this.$router.push({ name: "PostIndex" }))
        .catch((err) => console.log(err));
      location.reload();
    },
    },
    mounted() {
     postService.getPostById(this.userId)
     .then((res)=>{
      console.log(res)
      this.post = res.data
     })
    },

};
</script>