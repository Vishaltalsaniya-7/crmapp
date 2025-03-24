import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
  Typography
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import PageHeader from '../common/PageHeader';
import SearchBar from '../common/SearchBar';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import UserForm from './UserForm';

const Users = () => {
  const initialUsers = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@example.com',
      role: 'user',
      created_at: new Date().toISOString()
    }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const columns = [
    { id: 'username', label: 'Username' },
    { id: 'email', label: 'Email' },
    {
      id: 'role',
      label: 'Role',
      render: (row) => (
        <Chip
          label={row.role || 'user'}
          color={row.role === 'admin' ? 'primary' : 'secondary'}
          size="small"
          sx={{ minWidth: '80px', textAlign: 'center' }}
        />
      )
    },
    {
      id: 'created_at',
      label: 'Created At',
      render: (row) => new Date(row.created_at).toLocaleDateString()
    },
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
      )
    }
  ];

  const filterOptions = [
    { id: 'role', label: 'Role', options: ['admin', 'user'] }
  ];

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenForm(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      showSnackbar('User deleted successfully');
    }
  };

  const handleSubmit = (userData) => {
    try {
      if (selectedUser) {
        // Update existing user
        setUsers(users.map(user => 
          user.id === selectedUser.id 
            ? {
                ...user,
                username: userData.username.trim(),
                email: userData.email.trim(),
                role: userData.role || 'user',
                password: userData.password
              }
            : user
        ));
      } else {
        // Add new user
        const newUser = {
          id: Math.max(...users.map(u => u.id), 0) + 1,
          username: userData.username.trim(),
          email: userData.email.trim(),
          role: userData.role || 'user',
          password: userData.password,
          created_at: new Date().toISOString()
        };
        setUsers([...users, newUser]);
      }

      showSnackbar(`User ${selectedUser ? 'updated' : 'created'} successfully`);
      setOpenForm(false);
    } catch (error) {
      console.error('Error saving user:', error);
      showSnackbar(error.message, 'error');
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterId, value) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm
      ? user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesRole = filters.role
      ? user.role === filters.role
      : true;

    return matchesSearch && matchesRole;
  });

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Users"
        action={true}
        actionText="Add User"
        actionIcon={<AddIcon />}
        onActionClick={handleAdd}
      />

      <Box sx={{ mb: 3 }}>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search users..."
        />
        <FilterBar
          filters={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={() => setFilters({})}
        />
      </Box>

      {filteredUsers.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ my: 2 }}>
          No users found
        </Typography>
      ) : (
        <DataTable
          columns={columns}
          data={filteredUsers}
          loading={loading}
        />
      )}

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