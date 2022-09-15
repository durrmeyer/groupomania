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
  savePostId(postId) {
    sessionStorage.setItem('postId', postId);

   },
   getPostId() {
    return sessionStorage.getItem('postId')
  },

};