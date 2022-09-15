
import axios from 'axios';
import accountService from './accountService';

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
  console.log(error.response.status)
  if (error.response.status == 401) {
    accountService.logout()
    router.push('/')
  }
})



export default Axios
