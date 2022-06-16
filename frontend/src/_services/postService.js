import Axios from "../_services/axios";

export default {
  getAllPosts() {
    return Axios.get("/posts");
  },

  getPostById(id) {
    return Axios.get("/posts/" + id);
  },
  createPost() {
    return Axios.post("/posts");
  },
  updatePost(post) {
    return Axios.put("/posts/" + post.id, post);
  },

  deletePost(id) {
    return Axios.delete(`posts/` + id);
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