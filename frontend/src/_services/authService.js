import axios from './axios';
class AuthService {
  async login(user) {
    return axios
      .post('/users/login', {
        email: user.email,
        password: user.password
      })
      .then(res => {
        if (res.data.token) {
          sessionStorage.setItem('user', JSON.stringify(res.data));
        }

        return res.data;
      });
  }
  logout() {
    sessionStorage.removeItem('user');
  }
  register() {
    return axios.post('/register', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  }
}
export default new AuthService();