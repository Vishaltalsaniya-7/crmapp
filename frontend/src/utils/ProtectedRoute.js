// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import { hasPermission } from './permissions';

// const ProtectedRoute = ({ children, resource, action }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//   }

//   if (resource && action && !hasPermission(user.role, resource, action)) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;