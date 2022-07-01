import Axios from "../_services/axios";


export default {

  
  saveUserId(userId) {
    localStorage.setItem('userId', userId)
  },
  saveUser(user) {

    localStorage.getItem('user', user)
  },
  getUserId() {
    return localStorage.getItem('userId')
  },
  
  /***transformer une variable en Boolean, le rendu !!token***/




  /******************************USERS*************************************/

  getAllUsers() {
    return Axios.get('/users')
  },
  getUserById(id) {
    return Axios.get("users/" + id);
  },
  updateUser(user) {
    return Axios.put('/users/' + user.id);
  },
  getUser() {
    return Axios.put('/users',)
  },



  deleteUser(id) {
    return Axios.delete("users/" + id);
  },
  /********************************************************************/

};