
export default {
    posts(state) {
        return state.posts;
      },
      post(state) {
        return state.post;
      },
      users(state) {
        return state.users;
      },
      user(state) {
        return state.user;
      },
      messageRetour(state) {
        return state.message;
      },
      errorMessage(state) {
        return state.error;
      },
      isLogged(state) {
        return state.isLoggedIn;
      },
};