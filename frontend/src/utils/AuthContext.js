import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8082/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.token) {
        throw new Error('Token missing in response');
      }

      localStorage.setItem('token', data.token);
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      } else {
        const minimalUser = { email: credentials.email };
        localStorage.setItem('user', JSON.stringify(minimalUser));
        setUser(minimalUser);
      }

      setIsAuthenticated(true);
      navigate('/dashboard');
      return data;

    } catch (error) {
      console.error('Login error details:', error);
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:8082/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      register,
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};// import React, { createContext, useState, useContext } from 'react';
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