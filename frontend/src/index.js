import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// export const userService = {
//   getAllUsers: () => api.get('/users'),
//   getUser: (id) => api.get(`/users/${id}`),
//   createUser: (data) => api.post('/users', data),
//   updateUser: (id, data) => api.put(`/users/${id}`, data),
//   deleteUser: (id) => api.delete(`/users/${id}`),
// };

// export const customerService = {
//   getAllCustomers: () => api.get('/customers'),
//   getCustomer: (id) => api.get(`/customers/${id}`),
//   createCustomer: (data) => api.post('/customers', data),
//   updateCustomer: (id, data) => api.put(`/customers/${id}`, data),
//   deleteCustomer: (id) => api.delete(`/customers/${id}`),
// };

// export const leadService = {
//   getAllLeads: () => api.get('/leads'),
//   getLead: (id) => api.get(`/leads/${id}`),
//   createLead: (data) => api.post('/leads', data),
//   updateLead: (id, data) => api.put(`/leads/${id}`, data),
//   deleteLead: (id) => api.delete(`/leads/${id}`),
// };

// export default api;