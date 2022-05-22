

import Axios from '../_services/axiosConnection';

let login = (credentials) => {
    return Axios.post('/users/login', credentials)
}
let register = (credentials) => {
    return Axios.post('/users/register', credentials)
}
let logout = () => {
    localStorage.removeItem('token')
}
let saveToken = (token) => {
    localStorage.setItem('token', token)
}
let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const accountService = {
    login,
    register,
    logout,
    saveToken,
    isLogged
};
/*class AuthService {
    async login(user) {
        const response = await Axios
            .post('/users/login', {
                email: user.email,
                password: user.password
            });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }
    logout() {
        localStorage.removeItem('user');
    }
     register(user) {
        return Axios.post('/users/register', {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        });
       
    }
}*/


