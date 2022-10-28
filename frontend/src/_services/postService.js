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
    return Axios.put("posts/" + id, post);
  },

  deletePost(id) {
    return Axios.delete(`posts/` + id);
  },

  likePost(id) {
    return Axios().post(`/post/${id}`) + "/like";
  },

  commentPost(id, data) {
    return Axios().post("posts/" + id + "/comments", data);
  },

  deleteComment(id) {
    return Axios().delete("posts/comments/"+id);
  },
  savePostId(postId) {
    localStorage.setItem('postId', postId);

  },
  getPostId() {
    return localStorage.getItem('postId')
  },

};