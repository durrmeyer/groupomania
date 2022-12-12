<template>
  <div>
    <div class="title">
      <p class="h3 text-success fw-bold">DashBoard Moderateur</p>
      <p class="fst-italic">
        The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum."
      </p>

      <h2>liste des posts il y en a {{ comptage }}</h2>
      <router-link to="/posts" class="btn btn-success btn-sm"
        ><i class="fa fa-eye"></i> Voir les posts</router-link
      >
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
            <th scope="col">Création</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>
              <img
                v-if="post.User.imageUrl == null"
                src="../../assets/images/avatar.png"
                alt="photo de profil "
                class="avatar"
              />
              <img
                v-else
                :src="post.User.imageUrl"
                alt="photo profil de l'utilisateur"
                class="avatar"
              />
            </td>
            <td>{{ post.User.lastName }}</td>
            <td>{{ post.User.firstName }}</td>
            <td>
              <img :src="post.imageUrl" alt="photo du post" class="avatar" />
            </td>
            <td>{{ post.description }}</td>

            <td>{{ dateFormat[index] }}</td>
            <div class="add-to-action">
              <button class="btn btn-primary my-1" @click="modifyPost(post.id)">
                <i class="fa fa-pen"></i>
              </button>
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
import { mapState } from "vuex";
export default {
  name: "PostsIndex",
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
      posts: [],
      posts: {},
    };
  },

  computed: {
    ...mapState({
      post: (state) => state.post,
    }),
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
    modifyPost(id) {
      this.$router.push({ name: "PostEdit", params: { id: id } });

      console.log(id);
    },

    delPost(id) {
      let deletePost = confirm(
        " la suppression du post et tous les commentaires sont irréversibles, voulez-vous vraiment le supprimer ?"
      );
      if (deletePost == true) {
        this.$store.dispatch("deletePost", id);
      }

      this.$router.push("/dashboard/moderateur");
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
