<template>
  <div>
    <h1>page principale</h1>

    <div class="card-cart-container">
      <div class="section_post">
        <button @click="PostAdd">Ajouter un nouveau post</button>
      </div>
      <div class="card-container">
        <div v-for="(post, index) in posts" :key="post.id">
       <button @click="del(index)">X</button>
          <div class="card_author">
            
            <div class="d-flex mr-3">
              <a href=""
                ><img
                  class="img-fluid rounded-circle"
                  src="../assets/images/avatar.png"
                  alt="user"
                />
                <span>{{ post.firstName }} {{ post.lastName }}</span></a
              >
            </div>
         
            <p>posté le : {{ post.updatedAt }}</p>
          </div>
              
          <div class="img-container">
            <img v-bind:src="post.imageUrl" alt="image du post" class="img" />
          </div>
          <div class="card-text">
            <h2>titre:</h2>
            <h3>{{ post.title }}</h3>
            <h2>Description:</h2>
            <p>{{ post.description }}</p>
          </div>
          <div class="card-icons">
            <div class="like-container">
              <input type="checkbox" name="checkbox" v-bind:id="post.id" />
              <label v-bind:for="post.id">
                <i class="fas fa-heart" aria-hidden="true"></i>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PostLayout from "../assets/layouts/PostLayout.vue";
import postService from "../_services/postService";
export default {
  name: "Posts",
  components: {
    PostLayout,
   
  },

  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    postService
      .getAllPosts()
      .then((res) => {
        console.log(res.data);
        this.posts = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    PostAdd() {
      this.$router.push({ name: "PostAdd" });
    },
     del(index) {
      console.log(index)
      postService.deletePost(this.posts[index].id)
      .then(res => console.log(res))
      .catch(err =>console.log(err))
      this.posts.splice(index, 1)
    }
  },
};
</script>
<style scoped>
.btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 45px;
  width: 40px;
}
</style>