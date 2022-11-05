import { createStore } from "vuex";
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
    comments:[],
    comment:{},
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
    UPDATE_USER(state, user) {
      state.user = user;


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
    UPDATE_POST(state, post) {
      state.post = post;

    },
    ADD_Like(state, like) {
      state.posts = [like, ...state.posts];

    },
    ADD_COMMENT(state, comment) {
      state.posts = [comment, ...state.posts];

    },
    GET_COMMENTS(state, comments) {
      state.comments = comments;
    },

  },
  actions: {
    user({ commit }, user) {
      commit("USER", user);
    },
    getUsers({ commit }) {
      userService.getAllUsers().then((res) => {
        const users = res.data;
        commit("GET_USERS", users);
      });
    },
    getUserById({ commit }) {
      let id = localStorage.getItem("UserId")
      userService.getUserById(id).then((res) => {
        const user = res.data;
        commit("GET_USER_BY_ID", user);
      });
    },
    updateUser({ commit }, data) {

      userService.updateUser(data.id, data.data, {
        headers: { Authorization: this.state.token }
      })

        .then((res) => {

          const user = res.data.user;
          commit("UPDATE_USER", user);
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

      localStorage.removeItem("UserId");
      commit("LOGOUT");
    },


    createPost({ commit }, post) {
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
    postService.updatePost(data.id, data.data,{
      headers: { Authorization: this.state.token }
    })
      .then((res) => {
        const post = res.data.post;
        commit("UPDATE_POST", post);
      });
  },
 
  /*createComment({ commit }, data) {
   
      postService
        .createComment(data)
        .then(function(res) {
          const comment = res.data.comment;
          commit("ADD_COMMENT", comment);
          resolve(response.data);
        })
        .then(() => {
          // Important pour maintenir le state à jour !
          postService.getAllPosts().then(function(response) {
            const posts = response.data;
            commit("GET_POSTS", posts);
            resolve(response.data);
          });
        })
        .catch(function(error) {
          reject(error);
        });
      },*/
  getAllComments({ commit }) {
    postService.getAllPosts().then((res) => {
      const comments = res.data;
      commit("GET_COMMENTS", comments);
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