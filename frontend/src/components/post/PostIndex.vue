<template>
  <div>
    <router-link
            
            to="/posts"
            > page des posts</router-link
          >||
          <router-link
            
            to="/admin/users"
            >liste des utilisateurs</router-link
          >
    <div class="title">
      <h2>liste des posts, il y en a {{ comptage }}</h2>
    </div>
    <main>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Prénom</th>
             <th scope="col">Nom</th>
            <th scope="col">titre</th>
            <th scope="col">image</th>
            <th scope="col">description</th>
            <th scope="col">Création</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="post.id">
            <th scope="row">{{ post.id }}</th>
            <td>{{ post.firstName }}</td>
            <td>{{ post.laststName }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.imageUrl }}</td>
            <td>{{ post.description }}</td>
            <td>{{ dateFormat[index] }}</td>
            <div class="add-to-action">
              <button @click="edit(post.id)">Modifier</button>
              <button @click="del(index)">supprimer</button>
            </div>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>
<script>
import postService from "../../_services/postService";

export default {
  name: "PostIndex",
  data() {
    return {
      posts:[],
    };
  },
  methods: {
    edit(id) {
      console.log(id)
      //this.$router.push('/admin/userEdit/:id')
      this.$router.push({name: "postEdit", params:{id:id}})
    },
    del(index) {
      console.log(index)
      postService.deletePost(this.posts[index].id)
      .then(res => console.log(res))
      .catch(err =>console.log(err))
      this.users.splice(index, 1)
    }
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
  computed: {
    comptage() {
      return this.posts.length;
    },
    dateFormat(date) {
      return this.posts.map((u) =>
        u.createdAt.split("T")[0].split("-").reverse().join("/")
      );
    },
  },
};
</script>