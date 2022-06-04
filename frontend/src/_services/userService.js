

import Axios from "../_services/axios";


export default {

  
  register(data) {
    console.log(data, 'fhvgoùmejhùTRJH E');
    return Axios.post("users/register", data );
  },
  login(data) {
   
    return Axios.post("users/login", data);
  
  },
  logout(){
    localStorage.removeItem('token')
  },
  saveToken(token){
    localStorage.setItem('token', token)
  },
  isLogged(){
    let token = localStorage.getItem('token')
    return !!token
  },
  deleteUser(id) {
    return Axios().delete("users/" + id);
  },

  getUserById(id) {
    return Axios.get("users/:id");
  },
 
  updateUser(id, data) {
    return Axios.put("users/:id" + data);
  },
 
  
};