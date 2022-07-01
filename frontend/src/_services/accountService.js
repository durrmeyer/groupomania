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
  getToken() {
   return localStorage.getItem('token')
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
  isLogged() {
    token = localStorage.getItem('token')
    return !!token
  },
  logout() {
    localStorage.removeItem('token')
  },

}

