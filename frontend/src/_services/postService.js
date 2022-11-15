import Axios from "./axios";

export default {


  createPost(data) {
    return Axios.post("posts/add", data);
  },
  getPostById(id) {
    return Axios.get("/posts/" + id);
  },
  getAllPosts() {
    return Axios.get("posts");
  },

  updatePost(id, post) {
    return Axios.patch("posts/" + id, post);
  },

  deletePost(id) {
    return Axios.delete("/posts/" + id)
  },

  createComment(id, data) {
    return Axios.post("posts/" + id + "/comments", data);
  },
  getAllComments(id) {
    return API().get("posts/" + id + "/comments");
  },
  deleteComment(id) {
    return Axios.delete("posts/comments/" + id);
  },

  like(id) {
    return Axios.post("posts/" + id + "/likes");
  },

};