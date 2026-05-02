import { apiClient } from './api';

const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await apiClient.post('/auth/login', userData);
  return response.data;
};

const getMe = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

const updatePassword = async (passwordData) => {
  const response = await apiClient.put('/auth/updatepassword', passwordData);
  return response.data;
};

const authService = {
  register,
  login,
  getMe,
  updatePassword,
};

export default authService;
