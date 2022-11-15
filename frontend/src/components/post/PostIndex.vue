<template>
  <div>
    <div class="title">
      <h2>liste des posts il y en a {{ comptage }}</h2>
    </div>
    <main>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Avatar</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">ImageUrl</th>
            <th scope="col">Description</th>

            <!--<th scope="col">Création</th>-->
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.User.image }}</td>
            <td>{{ post.User.lastName }}</td>
            <td>{{ post.User.firstName }}</td>
            <td>{{ post.imageUrl }}</td>
            <td>{{ post.description }}</td>
            <!--<td>{{ dateFormat[index] }}</td>-->
            <div class="add-to-action">
              <button class="btn btn-danger my-1" @click="delPost(post.id)">
                <i class="fa fa-trash"></i>
              </button>
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
  name: "PostsIndex",
  data() {
    return {
      posts: [],
      posts: {},
    };
  },
  
  computed: {
    comptage() {
      return this.posts.length;
    },
    dateFormat() {
      return this.posts.map((p) =>
        p.createdAt.split("T")[0].split("-").reverse().join("/")
      );
    },
  },
  methods: {
    edit(id) {
      this.$router.push({ name: "UserEdit", params: { id: id } });
    },
    delPost(id) {
       let deletePost = confirm(
        " la suppression du post et tous les commentaires sont irréversibles, voulez-vous vraiment le supprimer ?"
      );
      if (deletePost == true) {
      this.$store.dispatch("deletePost", id);
        
      }
      
       this.$router.push("/posts/");
    },
  },
  mounted() {
    postService
      .getAllPosts()
      .then((res) => {
        this.posts = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>