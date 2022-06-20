import Axios from "../_services/axios";


export default {

  /***************************************enregistrement et connexion *************************/
  register(data) {
    console.log(data)
    return Axios.post('/users/register', data);
  },
  login(user) {
    return Axios.post("/users/login", user);
  },
  logout() {
    localStorage.removeItem('token')
  },


  saveToken(token) {
    localStorage.setItem('token', token)
  },
  isAdmin(idRole) {
    if (idRole === 2) {
      localStorage.setItem('isAdmin', true)
    } else {
      localStorage.setItem('isAdmin', false)
    }
  },
  saveUserId(userId) {
    localStorage.setItem('userId', userId)
  },
  saveUser(user) {
    console.log('user', saveUser)
    localStorage.getItem('user', user)
  },
  getUserId() {
    return localStorage.getItem('userId')
  },

  /********************************************************************************************/


  /******************************USERS*************************************/

  getAllUsers() {
    return Axios.get('users')
  },
  getUserById(id) {
    return Axios.get("users/" + id);
  },
  updateUser(user) {
    return Axios.put("/users/" + user.id, user);
  },

  logout() {
    localStorage.removeItem('token')
  },
  deleteUser(id) {
    return Axios.delete("users/" + id);
  },
  /********************************************************************/
  isLogged() {
    token = localStorage.getItem('token')
    return !!token
  },
  /***transformer une variable en Boolean, le rendu !!token***/




};