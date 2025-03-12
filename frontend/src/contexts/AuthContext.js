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

      // Check if the response contains error message
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Validate response data structure
      if (!data.token) {
        throw new Error('Token missing in response');
      }

      // Store token even if user object is not present
      localStorage.setItem('token', data.token);
      
      // If user data is present, store it
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      } else {
        // Create minimal user object if not provided
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