import Axios from "../_services/axios";

export default {
  getAll(params) {
    return Axios.get("/posts", { params })
  },
  getPosts() {
    return Axios.get("/");
  },
  get() {
    return Axios.get("/posts");
  },
  getPostById(id) {
    return Axios.get("posts/" + id);
  },
  createPost(data) {
    return Axios.post("create/", data);
  },
  updatePost(id, data) {
    return Axios.put("posts/" + id, data);
  },

  deletePost(id) {
    return Axios.delete("posts/" + id);
  },
  deleteAllPost() {
    return Axios.delete(`/posts`);
  },
  likePost(id) {
    return Axios().post("posts/" + id) + "/like";
  },

  commentPost(id, data) {
    return Axios().post("posts/" + id + "/comments", data);
  },

  deleteComment(id) {
    return Axios().delete("posts/comments/" + id);
  },
};