import axios from 'axios';

const API_URL = 'http://localhost:8082/customer';

const getToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const customerService = {
  getAll: async () => {
    const response = await axiosInstance.get('');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  },

  create: async (customerData) => {
    const response = await axiosInstance.post('', customerData);
    return response.data;
  },

  update: async (id, customerData) => {
    const response = await axiosInstance.put(`/${id}`, customerData);
    return response.data;
  },

  delete: async (id) => {
    await axiosInstance.delete(`/${id}`);
  },
};

export default customerService;