import axios from '../_services/axios';
class AuthService {
  async login(user) {
    const response = await axios
          .post('/users/login', {
              email: user.email,
              password: user.password
          })
          .then(response => {
            if (response.data.token) {
              localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
          });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register() {
    return axios.post('/register', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password:this.password,
    });
  }
}
export default new AuthService();