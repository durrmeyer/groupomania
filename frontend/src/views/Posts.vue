<template>
  <div>
    <h1 class="card-titlepost">Réseau social Groupomania</h1>
    <PostsInfo />
  </div>
</template>

<script>
import PostsInfo from "../components/Post/PostsInfos.vue";
export default {
  name: "Posts",
  components: {
    PostsInfo,
  },
  
};
</script>