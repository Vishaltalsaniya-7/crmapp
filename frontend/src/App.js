import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Customers from './pages/customers/Customers';
import Leads from './pages/leads/Leads';
// import Users from './pages/users/Users';
import Users from './components/users/Users';
import AboutUs from './components/about/AboutUs';

import PrivateRoute from './components/auth/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
          <Route path="/leads" element={<PrivateRoute><Leads /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/register" replace />} />
       
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;