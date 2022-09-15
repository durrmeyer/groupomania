<template>
  <div>
    <router-link
            
            to="/PostIndex"
            > page des posts</router-link
          >||
          <router-link
            
            to="/users"
            >liste des utilisateurs</router-link
          >
    <h1 class="card-titlepost">Réseau social Groupomania</h1>
    listes
    <router-view />
  </div>
</template>

<script>
import UserIndex from "../../components/user/UserIndex.vue"
import PostsIndex from "../../components/post/PostIndex.vue";
export default {
  name: "Dashboard",
  components: {
    UserIndex,
    PostsIndex,
  },
  
};
</script>