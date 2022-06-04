import Axios from "../_services/axios";

export default {
  getAll() {
    return Axios.get("/Posts/posts");
  },

  getPostById(id) {
    return Axios.get(`/Posts/${id}`);
  },
  createPost(data) {
    return Axios.post("/Posts", data);
  },
  updatePost(id, data) {
    return Axios.put(`/Posts/${id}`, data);
  },

  deletePost(id) {
    return Axios.delete(`/Posts/${id}`);
  },
  deleteAllPost() {
    return Axios.delete("/Posts/");
  },
  likePost(id) {
    return Axios().post(`/post/${id}`) + "/like";
  },

  commentPost(id, data) {
    return Axios().post("posts/ ${id}" + "/comments", data);
  },

  deleteComment(id) {
    return Axios().delete("posts/comments/");
  },
};