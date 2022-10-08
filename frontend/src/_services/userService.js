
import Axios from "./axios";

export default {

  /***************************************enregistrement et connexion *************************/


  getUserById(id) {
    return Axios.get("users/" + id);
  },
  getAllUsers() {
    return Axios.get('/users')
  },
  updateUser(id, data) {
    return Axios.put('/users/' + id, data);
  },
  getUser() {
    return Axios.put('/users',)
  },

  deleteUser(id) {
    return Axios.delete('/users/'+id);
  },



  saveUserId(userId) {
    sessionStorage.setItem('UserId', userId)
  },
  getUserId() {
    return sessionStorage.getItem('UserId')
  },
  saveUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
  },
  getUserId() {
    returnsessionStorage.getItem('user')
  },

}
