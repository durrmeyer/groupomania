<template>
  <div>
    <div class="title">
      <h2 class=" text-dark fw-bold">DashBoard Modérateur</h2>
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
      <h3>liste des posts</h3>
      <br />
      <p>Nombre de posts : {{ comptage }}</p>
      <router-link to="/posts" class="btn btn-outline-secondary btn-lg"
        ><i class="fa fa-eye"></i> Voir les posts</router-link
      >
    </div>
    <div class="col-xl-12 mb-4" v-for="post in posts" :key="post.id">
      <div class="container">
        <div class="row">
          <div class="col-12-table">
            <table class="table table-image">
              <thead>
                <tr>
                  <th scope="col">image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Auteur</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="w-25">
                    <div v-if="post.imageUrl !== `null`">
                      <img
                        :src="post.imageUrl"
                        class="img-post picture"
                        aria-label="image du post"
                      />
                    </div>
                  </td>

                  <td>{{ post.description }}</td>
                  <td>
                    <p>{{ post.User.lastName }} {{ post.User.firstName }}</p>
                  </td>

                  <td>
                    <div class="add-to-action">
                      <button
                        class="btn btn-outline-info2"
                        aria-label="modifier"
                        @click="modifyPost(post.id)"
                      >
                        <i class="fa fa-pen"></i>
                      </button>
                      <button
                        class="btn btn-outline-danger2 my-1"
                        aria-label="supprimer"
                        @click="delPost(post.id)"
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Layout from "../../assets/layouts/pagePosts.vue";
import { mapState } from "vuex";
export default {
  name: "PostsIndex",
  components: {
    Layout,
  },
  data() {
    return {
      userId: localStorage.getItem("UserId"),
      token: localStorage.getItem("token"),
    };
  },

  computed: {
    ...mapState({
      post: (state) => state.post,
    }),
    comptage() {
      return this.posts.length;
    },

    posts() {
      return this.$store.getters.posts;
    },
  },
  methods: {
    modifyPost(id) {
      this.$router.push({ name: "PostEdit", params: { id: id } });
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
    this.$store.dispatch("getAllPosts");
  },
};
</script>
