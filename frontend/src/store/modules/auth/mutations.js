export default {
    loginSuccess(state, user) {
        state.status.loggedIn = true;
        state.user = user;
      },
      loginFailure(state) {
        state.status.loggedIn = false;
        state.user = null;
      },
      logout(state) {
        state.status.loggedIn = false;
        state.user = null;
      },
      registerSuccess(state) {
        state.status.loggedIn = false;
      },
      registerFailure(state) {
        state.status.loggedIn = false;
      },
    
    SET_TOKEN(state, token) {
        state.token = token;
        if (token) {
          state.isLoggedIn = true;
        } else {
          state.isLoggedIn = false;
        }
      },
      DELETE_TOKEN(state) {
        state.token = null;
        state.user = "";
        state.isLoggedIn = false;
      },
      SET_USER(state, user) {
        state.user = user;
      },
      GET_USER_BY_ID(state, user) {
        state.user = user;
      },
      GET_USERS(state, users) {
        state.users = users;
      },
      UPDATE_ACCOUNT(state, id, user) {
        Object.assign(
          state.users.find((element) => element.id === id),
          user
        );
        state.message = "compte modifié";
      },
      DELETE_ACCOUNT(state, id) {
        state.users = [...state.users.filter((element) => element.id !== id)];
        state.message = "compte supprimé";
      },
      LOG_OUT(state) {
        localStorage.clear();
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
        state.message = "";
        state.error = "";
      },
      // end users
  
      // posts
  
      GET_POSTS(state, posts) {
        (state.posts = posts), (state.isLoading = false);
      },
      GET_HOT_POSTS(state, posts) {
        (state.posts = posts), (state.isLoading = false);
      },
      GET_POST_BY_ID(state, post) {
        state.post = post;
        state.isLoading = false;
      },
      ADD_POST(state, post) {
        state.posts = [post, ...state.posts];
        state.message = "post créé";
      },
      UPDATE_POST(state, id, post) {
        Object.assign(
          state.posts.find((element) => element.id === id),
          post
        );
       
        state.message = "Votre post est bien modifié";
      },
  
      DELETE_POST(state, id) {
        state.posts = [...state.posts.filter((element) => element.id !== id)];
        state.message = "post supprimé";
      },
      // end posts
  
      // comments
      COMMENT_POST(state, comment) {
        state.posts = [comment, ...state.posts];
        state.message = "post commenté";
      },
      DELETE_COMMENT(state, id) {
        state.posts = [...state.posts.filter((element) => element.id !== id)];
        state.message = "commentaire supprimé";
      },
      // end comments
  
      // like
  
      LIKE_POST(state, like) {
        state.posts = [like, ...state.posts];
      },
};