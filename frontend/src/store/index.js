import { createStore } from "vuex";
import accountService from "@/_services/accountService";
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
  },
  actions: {
    user({ commit }, user) {
      commit("USER", user);
    },
    getUsers({ commit }) {
      accountService.getAllUsers().then((response) => {
        const users = response.data;
        console.log(users, "ucygeutgyeyrtgupù")
        commit("GET_USERS", users);
      });
    },
    getUserById({ commit }) {
      let id = this.state.user.id;
      accountService.getUserById(id).then((res) => {
        const user = res.data;
        commit("GET_USER_BY_ID", user);
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
      commit("LOGOUT");
    },



    createPost({ commit }, post) {
      console.log(post, "base de données");
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
  }
});

export default store;