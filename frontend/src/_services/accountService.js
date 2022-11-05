import Axios from "./axios";

export default {

/***************************************enregistrement et connexion *************************/
register(user) {
   
    return Axios.post('/users/register', user);
  },
  login(user) {
    return Axios.post("/users/login/", user);
  },
  logout() {
    localStorage.removeItem('token')
  },
  getToken() {
   return localStorage.getItem('token')
  },
  setToken(token) {
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
   const token = localStorage.getItem('token')
    return !!token
  },
  

 
  }
  