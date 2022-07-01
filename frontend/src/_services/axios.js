import axios from 'axios';
import accountService from './accountService';

const Axios = axios.create({
    baseURL: 'http://localhost:3000/api'
  })
    Axios.interceptors.request.use(request => {
      console.log(request)
      let token = accountService.getToken()
      if(token) {
       request.headers.Authorization = 'Bearer '+token
      }
      console.log(token)
      return request
    })


export default Axios

