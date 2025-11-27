import axios from 'axios';

const AUTH_URL = 'http://localhost:8080/api/auth';

const AuthService = {
  login(credentials) {
    return axios.post(`${AUTH_URL}/login`, credentials);
  },
  register(payload) {
    return axios.post(`${AUTH_URL}/register`, payload);
  }
};

export default AuthService;
