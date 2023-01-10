import { createStore } from "vuex";
import userService from "@/_services/userService";
import postService from "@/_services/postService";

const store = createStore({
  strict: true,
  state: {
    token: {},
    user: {},
    users: [],
    posts: [],
    post: {},
    isLoggedIn: false,
    isAdmin: false,
    isModerateur: false,
  },
  //-------------------------------------- GETTERS-----------------------------------------//
  getters: {
    users(state) {
      return state.users;
    },
    user(state) {
      return state.user;
    },

    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
    isModerateur(state) {
      return state.isModerateur;
    },

    posts(state) {
      return state.posts;
    },
    post(state) {
      return state.post;
    },
  },
  //-------------------------------------- MUTATIONS-----------------------------------------//
  mutations: {
    USER(state, user) {
      state.user = user;
    },

    GET_USER_BY_ID(state, user) {
      state.user = user;
      state.isAdmin = user.RoleId === 1;
      state.isModerateur = user.RoleId === 2 || user.RoleId === 1;
    },
    GET_USERS(state, users) {
      state.users = users;
    },
    UPDATE_USER(state, user) {
      state.user = user;
    },
    DELETE_USER(state, id) {
      state.users = [...state.users.filter((el) => el.id !== id)];
    },
    IS_LOGGED_IN(state, loggedIn) {
      state.isLoggedIn = loggedIn;
    },
    TOKEN(state, token) {
      state.token = token;

      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
        state.isAdmin = false;
        state.isModerateur = false;
      }
    },

    DELETE_TOKEN(state) {
      state.token = "";
      state.user = "";
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.isModerateur = false;
    },

    LOGOUT(state) {
      localStorage.clear();
      state.token = "";
      state.user = "";
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.isModerateur = false;
    },

    GET_POSTS(state, posts) {
      state.posts = posts;
    },
    GET_POST_BY_ID(state, post) {
      state.post = post;
    },
    ADD_POST(state, post) {
      state.posts = [post, ...state.posts];
    },
    UPDATE_POST(state, post) {
      state.post = post;
    },
    DELETE_POST(state, id) {
      state.posts = [...state.posts.filter((el) => el.id !== id)];
    },

    ADD_COMMENT(state, comment) {
      state.posts = [comment, ...state.posts];
    },
    GET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    DELETE_COMMENT(state, id) {
      state.posts = [...state.posts.filter((el) => el.id !== id)];
    },
    ADD_LIKE(state, like) {
      state.posts = [like, ...state.posts];
    },
  },
  //-------------------------------------- ACTIONS-----------------------------------------//
  actions: {
     //--Actions Users-------------//
    user({ commit }, user) {
      commit("USER", user);
    },
    isAdmin({ commit }, admin) {
      commit("ADMIN", admin);
    },
    getUsers({ commit }) {
      userService.getAllUsers().then((res) => {
        const users = res.data;
        commit("GET_USERS", users);
      });
    },
    getUserById({ commit }) {
      let id = localStorage.getItem("UserId");
      userService.getUserById(id).then((res) => {
        const user = res.data;
        commit("GET_USER_BY_ID", user);
        commit("IS_LOGGED_IN", true);
      });
    },
    updateUser({ commit }, data) {
      userService
        .updateUser(data.id, data.data, {
          headers: { Authorization: this.state.token },
        })
        .then((res) => {
          const user = res.data;
          commit("UPDATE_USER", user);
        });
    },
    deleteUser({ commit }, id) {
      userService
        .deleteUser(id)
        .then(() => {
          commit("DELETE_USER", id);
        })
        .catch((err) => {
          err;
        });
    },

    token({ commit }, token) {
      commit("TOKEN", token);
    },

    deleteToken({ commit }, token) {
      commit("DELETE_TOKEN", token);
    },
    logout({ commit }) {
      localStorage.removeItem("token");

      localStorage.removeItem("UserId");
      commit("LOGOUT");
    },
    //--Actions POSTS-------------//
    createPost({ commit }, post) {
      postService
        .createPost(post, {
          headers: { Authorization: this.state.token },
        })
        .then((res) => {
          const post = res.data;
          commit("ADD_POST", post);
          location.reload();
        })
        .then(() => {
          postService.getAllPosts().then((res) => {
            const posts = res.data;
            commit("GET_POSTS", posts);
          });
        })
        .catch((err) => {
          err;
        });
    },
    getPostById({ commit }, id) {
      postService
        .getPostById(id, {
          headers: { Authorization: this.state.token },
        })
        .then((res) => {
          const post = res.data;
          commit("GET_POST_BY_ID", post);
        });
    },
    getAllPosts({ commit }) {
      postService
        .getAllPosts()
        .then((res) => {
          const posts = res.data;
          commit("GET_POSTS", posts);
        })
        .catch((err) => {
          err;
        
        });
    },
    updatePost({ commit }, data) {
      postService
        .updatePost(data.id, data.data, {
          headers: { Authorization: this.state.token },
        })
        .then((res) => {
          const post = res.data;

          commit("UPDATE_POST", post);
          console.log(res.data);
        })
        .then(() => {
          postService.getAllPosts().then((res) => {
            const posts = res.data;
            commit("GET_POSTS", posts);
          });
        })
        .catch((err) => {
          err;
        });
    },
    deletePost({ commit }, id) {
      postService
        .deletePost(id)
        .then(() => {
          commit("DELETE_POST", id);
        })
        .then(() => {
          postService.getAllPosts().then((res) => {
            const posts = res.data;
            commit("GET_POSTS", posts);
          });
        })
        .catch((err) => {
          err;
        });
    },
    //--Actions COMMENTS-------------//
    createComment({ commit }, data) {
      postService
        .createComment(data.id, data.data, {
          headers: { Authorization: this.state.token },
        })
        .then((res) => {
          const comment = res.data;
          commit("ADD_COMMENT", comment);
        })
        .then(() => {
          postService
            .getAllPosts()
            .then((res) => {
              const posts = res.data;
              commit("GET_POSTS", posts);
            })
            .catch((err) => {
              err;
            });
        });
    },

    getAllComments({ commit }) {
      postService
        .getAllComments()
        .then((res) => {
          const comments = res.data;
          commit("GET_COMMENTS", comments);
        })
        .catch((err) => {
          err;
        });
    },
    deleteComment({ commit }, id) {
      postService
        .deleteComment(id)
        .then(() => {
          commit("DELETE_COMMENT", id);
        })
        .then(() => {
          postService.getAllPosts().then((res) => {
            const posts = res.data;
            commit("GET_POSTS", posts);
          });
        })
        .catch((err) => {
          err;
        });
    },
    likeUser({ commit }, data) {
      postService
        .userlike(data.id, data.data, {
          headers: { Authorization: this.state.token },
        })
        .then((res) => {
          const like = res.data;
          commit("ADD_LIKE", like);
        })
        .then(() => {
          postService.getAllPosts().then((res) => {
            const posts = res.data;
            commit("GET_POSTS", posts);
          });
        })
        .catch((err) => {
          err;
        });
    },
  },
});

export default store;
