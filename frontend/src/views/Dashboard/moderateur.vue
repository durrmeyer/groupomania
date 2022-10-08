<template>
  <div>
    <h1 class="card-titlepost">Réseau social Groupomania</h1>
    <ListPosts />
  </div>
</template>

<script>
import ListPosts from "../../components/Post/PostIndex.vue";
export default {
  name: "Posts",
  components: {
    ListPosts,
  },
  
};
</script>