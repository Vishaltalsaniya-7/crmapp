import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../utils/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { user } = useAuth();
//   const location = useLocation();
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// //   if (!user) {
// //     return <Navigate to="/login" state={{ from: location }} replace />;
// //   }

// //   return children;
// // };

// // export default PrivateRoute;