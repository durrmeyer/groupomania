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
  

 
  }
  