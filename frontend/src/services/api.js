import axios from 'axios';

const API_URL = 'http://localhost:8082';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
    login: async (credentials) => {
      try {
        const response = await api.post('/login', credentials);
        console.log('Login response:', response);
        
        if (response.status === 200 && response.data) {
          return {
            user: { email: credentials.email },
            token: response.data.token || response.data
          };
        }
        throw new Error('Login failed');
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Invalid credentials');
      }
    },
    
    register: async (userData) => {
      try {
        const response = await api.post('/register', userData);
        if (response.status === 200 || response.status === 201) {
          return response.data;
        }
        throw new Error(response.data?.message || 'Registration failed');
      } catch (error) {
        console.error('Registration error:', error);
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
    }
  };
// export const authService = {
//     login: (credentials) => api.post('/login', credentials),
//     register: (userData) => api.post('/register', userData),
//   };

export const userService = {
  getAllUsers: () => api.get('/user'),
  getUserById: (id) => api.get(`/user/${id}`),
  createUser: (userData) => api.post('/user', userData),
  updateUser: (id, userData) => api.put(`/user/${id}`, userData),
  updateUserRole: (id, roleData) => api.patch(`/user/${id}/role`, roleData),
  deleteUser: (id) => api.delete(`/user/${id}`),
};

export const customerService = {
  getAllCustomers: () => api.get('/customer'),
  getCustomerById: (id) => api.get(`/customer/${id}`),
  createCustomer: (customerData) => api.post('/customer', customerData),
  updateCustomer: (id, customerData) => api.put(`/customer/${id}`, customerData),
  deleteCustomer: (id) => api.delete(`/customer/${id}`),
};

export const leadService = {
  getAllLeads: () => api.get('/lead'),
  getLeadById: (id) => api.get(`/lead/${id}`),
  createLead: (leadData) => api.post('/lead', leadData),
  updateLead: (id, leadData) => api.put(`/lead/${id}`, leadData),
  updateLeadStatus: (id, statusData) => api.patch(`/lead/${id}/status`, statusData),
  deleteLead: (id) => api.delete(`/lead/${id}`),
};

export default api;