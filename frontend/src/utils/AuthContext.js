import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext(null);

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const login = async (userData, token) => {
//     try {
//       if (!userData || !token) {
//         throw new Error('Invalid login data');
//       }
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);
//       navigate('/dashboard', { replace: true });
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/login', { replace: true });
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, useAuth };