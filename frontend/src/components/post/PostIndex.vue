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
            <th scope="col">ImageUrl</th>
            <th scope="col">Description</th>
           
            <!--<th scope="col">Création</th>-->
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.imageUrl }}</td>
            <td>{{ post.description }}</td>
           

            <!--<td>{{ dateFormat[index] }}</td>-->

            <div class="add-to-action">
              <button class="btn btn-danger my-1" @click="delPost()">
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
      posts:{},
    };
  },
  mounted() {
    postService
      .getAllPosts()
      .then((res) => {
        this.posts = res.data;
      })
      .catch((err) => console.log(err));
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
  method: {
    edit(id) {
      this.$router.push({ name: "UserEdit", params: { id: id } });
    },
    delPost(index) {
        postService
        .deletePost(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      this.posts.splice(id, 1);
    },
  },
};
</script>