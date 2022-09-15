import Axios from "./axios";

export default {

/***************************************enregistrement et connexion *************************/
register(user) {
   
    return Axios.post('/users/register', user);
  },
  login(user) {
    return Axios.post("/users/login", user);
  },
  logout() {
    sessionStorage.removeItem('token')
  },
  getToken() {
   return sessionStorage.getItem('token')
  },
  setToken(token) {
    sessionStorage.setItem('token', token)
  },

  getUserById(id) {
    return Axios.get("users/" + id);
  },
  getAllUsers() {
    return Axios.get('/users')
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

  isAdmin(idRole) {
    if (idRole === 2) {
      sessionStorage.setItem('isAdmin', true)
    } else {
      sessionStorage.setItem('isAdmin', false)
    }
  },
 isLogged() {
   const token = sessionStorage.getItem('token')
    return !!token
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
  
 
 
   

