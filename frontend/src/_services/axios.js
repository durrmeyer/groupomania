import axios from 'axios';
import store from '../store/modules/auth';

const Axios = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      "Content-type": "application/json",
        Authorization: `${store.state.token}`,
      },
 })

export default Axios