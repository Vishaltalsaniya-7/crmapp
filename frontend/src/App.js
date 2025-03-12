// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { Box } from '@mui/material';
// import { AuthProvider } from './utils/AuthContext';
// import Navbar from './components/common/Navbar';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Dashboard from './pages/dashboard/Dashboard';
// import Users from './pages/users/Users';
// import Customers from './pages/customers/Customers';
// import Leads from './pages/leads/Leads';
// import ProtectedRoute from './utils/ProtectedRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Navbar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/users"
//             element={
//               <ProtectedRoute>
//                 <Users />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/customers"
//             element={
//               <ProtectedRoute>
//                 <Customers />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/leads"
//             element={
//               <ProtectedRoute>
//                 <Leads />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/" element={<Navigate to="/customers" replace />} />
//         </Routes>
//       </Box>
//     </AuthProvider>
//   );
// };

// export default App;// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { Box } from '@mui/material';
// import { AuthProvider } from './utils/AuthContext';
// import Navbar from './components/common/Navbar';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Dashboard from './pages/dashboard/Dashboard';
// import Users from './pages/users/Users';
// import Customers from './pages/customers/Customers';
// import Leads from './pages/leads/Leads';
// import ProtectedRoute from './utils/ProtectedRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Navbar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/users"
//             element={
//               <ProtectedRoute>
//                 <Users />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/customers"
//             element={
//               <ProtectedRoute>
//                 <Customers />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/leads"
//             element={
//               <ProtectedRoute>
//                 <Leads />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/" element={<Navigate to="/customers" replace />} />
//         </Routes>
//       </Box>
//     </AuthProvider>
//   );
// };

// export default App;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Dashboard from './pages/dashboard/Dashboard';
import Customers from './pages/customers/Customers';
import Users from './pages/users/Users';
import Leads from './pages/leads/Leads';
import Layout from './components/Layout';  // Keep only one Layout import
import PrivateRoute from './components/auth/PrivateRoute';
import BlankPage from './pages/BlankPage';  // Ensure this import path is correct





const App = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path="/leads" element={<PrivateRoute><Leads /></PrivateRoute>} />
        <Route path="/blank" element={<PrivateRoute><BlankPage /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  </AuthProvider>
);
};

export default App;
