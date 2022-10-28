
import Axios from "./axios";

export default {

  /***************************************enregistrement et connexion *************************/


  getUserById(id) {
    return Axios.get('users/' + id);
  },
  getAllUsers() {
    return Axios.get('/users')
  },
  updateUser(id, data) {
    return Axios.put('/users/profil/' + id, data);
  },
  getUser() {
    return Axios.put('/users',)
  },

  deleteUser(id) {
    return Axios.delete('/users/' + id);
  },



  saveUserId(userId) {
    localStorage.setItem('UserId', userId)
  },
  getUserId() {
    return localStorage.getItem('UserId')
  },
  saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  },
  getUserId() {
    return localStorage.getItem('user')
  },

}
