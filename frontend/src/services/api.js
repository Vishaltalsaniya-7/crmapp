const API_URL = process.env.REACT_APP_API_URL;

const api = {
  // Leads API calls
  getLead: async () => {
    const response = await fetch(`${API_URL}/lead`);
    return response;
  },

  createLead: async (data) => {
    const response = await fetch(`${API_URL}/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  },

  updateLead: async (id, data) => {
    const response = await fetch(`${API_URL}/lead/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  },
};
export const userApi = {
  getAllUsers: () => fetch(`${API_BASE_URL}/user`),
  
  getUserById: (id) => fetch(`${API_BASE_URL}/user/${id}`),
  
  createUser: (userData) => fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }),
  
  updateUser: (id, userData) => fetch(`${API_BASE_URL}/user/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }),
  
  updateUserRole: (id, role) => fetch(`${API_BASE_URL}/user/${id}/role`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role })
  }),
  
  deleteUser: (id) => fetch(`${API_BASE_URL}/user/${id}`, {
    method: 'DELETE'
  })
};

export default api;