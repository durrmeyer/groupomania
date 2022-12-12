import Axios from "./axios";

export default {

/***************************************enregistrement et connexion *************************/
register(data) {
   
    return Axios.post("users/register", data);
  },
  login(data) {
    return Axios.post("users/login/", data);
  },
  logout() {
    localStorage.removeItem("token")
  },
  getToken() {
   return localStorage.getItem("token")
  },
  setToken(token) {
    localStorage.setItem("token", token)
  },
  
 isLogged() {
   const token = localStorage.getItem("token")
    return !!token
  },
  

 
  }
  