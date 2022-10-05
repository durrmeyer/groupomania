import { createStore } from "vuex";
import accountService from "@/_services/accountService";
import userService from "@/_services/userService";
import postService from "@/_services/postService";
const store = createStore({
  strict: true,
  state: {
    title: 'Groupomania',
    token: {},
    user: {},
    users: [],
    isLoggedIn: false,
    posts: [],
    post: {},
    comments: [],
    comment: {},
  },


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


    posts(state) {
      return state.posts;
    },
    post(state) {
      return state.post;
    },
    comments(state) {
      return state.comments;
    },
    comment(state) {
      return state.comment;
    },

  },
  mutations: {
    USER(state, user) {
      state.user = user;
    },
    GET_USER_BY_ID(state, user) {
      state.user = user;
    },
    GET_USERS(state, users) {
      state.users = users;
    },
    UPDATE_USER(state, id, user) {
      Object.assign(
        state.users.find((el) => el.id === id),
        user
      );
    },
    DELETE_USER(state, id) {
      state.users = [...state.users.filter((el) => el.id !== id)];
    },
    TOKEN(state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },

    DELETE_TOKEN(state) {
      state.token = "";
      state.user = "";
      state.isLoggedIn = false;
    },


    LOGOUT(state) {
      sessionStorage.clear();
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;


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
    UPDATE_POST(state, id, post) {
      Object.assign(
        state.posts.find((el) => el.id === id),
        post
      );
    },
    ADD_Like(state, like) {
      state.posts = [like, ...state.posts];

    },
    GET_COMMENT(state, comment) {
      state.comments = [comment, ...state.posts];
    },
  },
  actions: {
    user({ commit }, user) {
      commit("USER", user);
    },
    getUsers({ commit }) {
      userService.getAllUsers().then((response) => {
        const users = response.data;
        console.log(users, "store Action")
        commit("GET_USERS", users);
      });
    },
    getUserById({ commit }, id) {

      userService.getUserById(id).then((res) => {
        const user = res.data;
        console.log(user, "store User Action")
        commit("GET_USER_BY_ID", user);
      });
    },
    updateUser({ commit }, data) {
      let id = this.state.user.id;
      userService.updateUser(id, data)

        .then((res) => {
          const data = res.data;
          commit("UPDATE_USER", id, data);
        })
        .then(() => {
          postService.getAllPosts().then((res) => {
            const posts = res.data;
            commit("GET_POSTS", posts);
          })
        })
    },
    deleteUser({ commit }, id) {
      userService.deleteUser(id).then(() => {
        commit("DELETE_USER", id);
      })
        .catch((err) => { err })
    },

    token({ commit }, token) {
      commit("TOKEN", token);
    },

    deleteToken({ commit }, token) {
      commit("DELETE_TOKEN", token);
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("LOGOUT");
    },



    createPost({ commit }, post) {
      console.log(post, "Store Post");
      postService.createPost(post)
        .then((res) => {
          const post = res.data;
          commit("ADD_POST", post);
        })

    },
    getPostById({ commit }, id) {
      postService.getPostById(id).then((res) => {
        const post = res.data;
        commit("GET_POST_BY_ID", post);
      });
    },
    getAllPosts({ commit }) {
      postService.getAllPosts().then((res) => {
        const posts = res.data;
        commit("GET_POSTS", posts);
      });
    },

  },
  updatePost({ commit }, data) {
    postService.updatePost(data.id, data.data)
      .then((res) => {
        const post = res.data;
        commit("UPDATE_POST", post);
      });
  },

  createComment({ commit }, data) {
    postService.createComment(data.id, data.data).then((res) => {
      
      const comment = res.data;
      commit("GET_COMMENT", comment);
      console.log(comment);
    })
      .then(() => {
        postService.getAllPosts()
          .then((res) => {
            const posts = res.data;
            commit("GET_POSTS", posts)
          })
      });
  },
  deleteComment: ({ commit }, id) => {
    postService.deleteComment(id)
      .then(() => {
        commit("DELETE_COMMENT", id);
      })
      .then(() => {
        postService.deleteComment().then((response) => {
          const posts = response.data;
          commit("GET_POSTS", posts);
        });
      });
  }


});

export default store;