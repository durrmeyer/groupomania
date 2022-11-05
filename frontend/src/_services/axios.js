import axios from 'axios';
import accountService from './accountService';
import router from "@/router";

const Axios = axios.create({
  baseURL: 'http://localhost:3000/api'
})

Axios.interceptors.request.use(request => {

  let token = accountService.getToken();

  if (accountService.isLogged()) {
    request.headers.Authorization = 'Bearer ' + token
  }

  return request
})
Axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status == 401) {
    accountService.logout()
    router.push({name: login})
  }
})



export default Axios