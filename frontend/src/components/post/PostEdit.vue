<template>
  <div>
    <h3>Modification du post</h3>
    {{ id }}
    <form @submit.prevent="ajout()">
      <input type="text" id="user_id" v-model="post.user_id" hidden />
      <div class="formGroup">
        <label for="post_imageUrl">image</label>
        <input type="text" id="post_imageUrl" v-model="post.imageUrl" />
      </div>
      <div class="formGroup">
        <label for="user_firstName">Prénom</label>
        <input type="text" id="post_fistName" v-model="post.firstName" />
      </div>
      <div class="formGroup">
        <label for="user_lastName">Prénom</label>
        <input type="text" id="post_lastName" v-model="post.lastName" />
      </div>
      <div class="formGroup">
        <label for="post_title">titre</label>
        <input type="text" id="post_title" v-model="post.title" />
      </div>
      <div class="formGroup">
        <label for="post_description">description</label>
        <input type="text" id="post_title" v-model="post.description" />
      </div>

      <div class="formGroup">
        <button type="submit" class="button">Modifier</button>
     
        <!--<a href="@/posts" class="button">Annuler</a>-->
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
      post: {
        user_id: "",
        firstName: "",
        lastName: "",
        title: "",
        imageUrl: "",
        description: "",
      },
    };
  },
  mounted() {
    console.log(this.id)
    if(this.id){
        console.log('edition')
    }else{
        console.log('ajout')
    }
  },
  methods: {
    ajout() {
    
       postService.updatePost(this.post)
        .then(res => this.$router.push({name:"PostIndex"}))
        .catch(err => console.log (err))
        location.reload();
    },
  },
};
</script>