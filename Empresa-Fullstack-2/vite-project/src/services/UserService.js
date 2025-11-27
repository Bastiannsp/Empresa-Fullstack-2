import axios from 'axios';

const USERS_URL = 'http://localhost:8080/api/users';

const UserService = {
  getProfile() {
    return axios.get(`${USERS_URL}/me`);
  },
  updateProfile(payload) {
    return axios.put(`${USERS_URL}/me`, payload);
  },
  listPaymentMethods() {
    return axios.get(`${USERS_URL}/me/payment-methods`);
  },
  createPaymentMethod(payload) {
    return axios.post(`${USERS_URL}/me/payment-methods`, payload);
  },
  updatePaymentMethod(id, payload) {
    return axios.put(`${USERS_URL}/me/payment-methods/${id}`, payload);
  },
  deletePaymentMethod(id) {
    return axios.delete(`${USERS_URL}/me/payment-methods/${id}`);
  },
  markDefaultPaymentMethod(id) {
    return axios.post(`${USERS_URL}/me/payment-methods/${id}/default`);
  }
};

export default UserService;
