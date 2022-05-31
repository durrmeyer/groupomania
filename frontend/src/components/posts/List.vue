<template>
  <div class="list row">
    
    <div class="col-md-6">
      <h4>Posts Listes</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(post, index) in posts"
          :key="index"
          @click="setActivePost(post, index)"
        >
          {{ post.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllPosts">
       tout effacer
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentPost">
        <h4>Post</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentPost.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentPost.description }}
        </div>
       <!-- <div>
          <label><strong>Status:</strong></label> {{ currentPost.published ? "Published" : "Pending" }}
        </div> -->
        <router-link :to="'posts/' + currentPost.id" class="badge badge-warning">Modifier</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Post...</p>
      </div>
    </div>
  </div>
</template>
<script>
import postService from "../../_services/postService";
export default {
  name: "postsList",
  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrievePosts() {
      postService.getPosts()
        .then(response => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshPost() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },
    setActivePost(post, index) {
      this.currentPost = post;
      this.currentIndex = post ? index : -1;
    },
    deleteAllPost() {
      postService.deleteAllPost()
        .then(response => {
          console.log(response.data);
          this.refreshPost();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
   /* searchTitle() {
    postService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }*/
  },
  mounted() {
    this.retrievePosts();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>