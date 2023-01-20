import axios from 'axios';
import accountService from './accountService';
import router from "@/router";

const Axios = axios.create({
  // Il peut être utile de définir `baseURL` sur une instance d’Axios puis de
  // passer des URLs relatives aux méthodes de cette instance.
  baseURL: 'http://localhost:3000/api'
})

Axios.interceptors.request.use(request => {

  let token = accountService.getToken();

  if (accountService.isLogged()) {
    request.headers.Authorization = 'Bearer ' + token
  }

  return request
})
// ajout d’un intercepteur de requête
Axios.interceptors.response.use(response => {
  // faire quelque chose avant que la requête ne soit envoyée
  return response
}, error => {
  if (error.response.status == 401) {
    accountService.logout()
    router.push("/");
  }
})



export default Axios