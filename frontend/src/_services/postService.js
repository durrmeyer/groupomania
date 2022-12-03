import Axios from "./axios";

export default {
  createPost(data) {
    return Axios.post("posts/add", data);
  },
  getPostById(id) {
    return Axios.get("posts/" + id);
  },
  getAllPosts() {
    return Axios.get("posts");
  },

  updatePost(id, data) {
    return Axios.patch("posts/" + id, data);
  },

  deletePost(id) {
    return Axios.delete("posts/" + id);
  },

  createComment(id, data) {
    return Axios.post("posts/" + id + "/comments", data);
  },
  getAllComments() {
    return Axios.get("posts/comments");
  },
  deleteComment(id) {
    return Axios.delete("posts/comments/" + id);
  },

  userlike(id) {
    return Axios.post("posts/" + id + "/likes");
  },
};
