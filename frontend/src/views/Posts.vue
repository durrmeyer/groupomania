
<template>
  <div>
    <h1 class="card-titlepost">Réseau social Groupomania</h1>
    <PostsInfo />
  </div>
</template>

<script>
import PostsInfo from "../components/post/PostsInfos.vue";
export default {
  name: "Posts",
  components: {
    PostsInfo,
  },
  
};
</script>
