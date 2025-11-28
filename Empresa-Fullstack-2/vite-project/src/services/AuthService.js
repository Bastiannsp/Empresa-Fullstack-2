import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const AUTH_URL = `${API_BASE_URL}/auth`;

const AuthService = {
  login(credentials) {
    return axios.post(`${AUTH_URL}/login`, credentials);
  },
  register(payload) {
    return axios.post(`${AUTH_URL}/register`, payload);
  }
};

export default AuthService;
