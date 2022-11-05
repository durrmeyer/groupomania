
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
    return Axios.patch('/users/profil/' + id, data);
  },
  getUser() {
    return Axios.patch('/users',)
  },

  deleteUser(id) {
    return Axios.delete('users/' + id);
  },



  saveUserId(userId) {
    localStorage.setItem('UserId', userId)
  },
  getUserId() {
    return localStorage.getItem('UserId')
  },
  
 

}
