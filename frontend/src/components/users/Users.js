import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import PageHeader from '../common/PageHeader';
import SearchBar from '../common/SearchBar';
import DataTable from '../common/DataTable';
import UserForm from './UserForm';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const columns = [
    { id: 'username', label: 'Username' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8082/user${searchTerm ? `?search=${searchTerm}` : ''}`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenForm(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`http://localhost:8082/user/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete user');
      
      showSnackbar('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      showSnackbar(error.message, 'error');
    }
  };

  const handleSubmit = async (userData) => {
    try {
      const url = selectedUser 
        ? `http://localhost:8082/user/${selectedUser.id}`
        : 'http://localhost:8082/user';

      const formattedData = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role.toLowerCase()
      };

      const response = await fetch(url, {
        method: selectedUser ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || (selectedUser ? 'Failed to update user' : 'Failed to create user'));
      }

      const result = await response.json();
      console.log('API Response:', result);

      showSnackbar(`User ${selectedUser ? 'updated' : 'created'} successfully`);
      setOpenForm(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      showSnackbar(error.message, 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Users"
        action={true}
        actionText="Add User"
        onActionClick={handleAdd}
      />

      <Box sx={{ mb: 3 }}>
        <SearchBar
          onSearch={setSearchTerm}
          placeholder="Search users..."
        />
      </Box>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        emptyMessage="No users found"
      />

      <UserForm
        open={openForm}
        user={selectedUser}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;