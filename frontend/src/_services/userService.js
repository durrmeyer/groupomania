

import Axios from "../_services/axios";
import authHeader from "../_services/authService";
export default {

  getPublicContent() {
    return Axios.get('/all');
  },
  getUserBoard() {
    return Axios.get('/user', { headers: authHeader() });
  },
  getModeratorBoard() {
    return Axios.get('/moderator', { headers: authHeader() });
  },
  getAdminBoard() {
    return Axios.get('/admin', { headers: authHeader() });
  },
  register(data) {
    return Axios.post("/users/register", data);
  },
  login(data) {
    return Axios.post("users/login", data);
  },
  deleteAccount(id) {
    return Axios().delete("users/accounts/" + id);
  },

  updateAccount(id, data) {
    return Axios.put("users/accounts/" + id, data);
  },
  getUsers() {
    return Axios().get("users/accounts");
  },
  getUserById(id) {
    return Axios().get("users/accounts/" + id);
  },
};