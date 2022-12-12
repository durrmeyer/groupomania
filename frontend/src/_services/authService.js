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
          localStorage.setItem('user', JSON.stringify(res.data));
        }

        return res.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register() {
    this.$store.dispatch("setToken", response.data.token);
    this.$store.dispatch("setUser", response.data.user);
    this.$store.dispatch("getUserById", response.data.user.id);
    return axios.post('/register', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  
  }
}
export default new AuthService();