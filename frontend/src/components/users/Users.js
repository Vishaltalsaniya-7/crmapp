import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Chip,
  Tooltip,
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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { id: 'username', label: 'Username' },
    { id: 'email', label: 'Email' },
    {
      id: 'role',
      label: 'Role',
      render: (row) => (
        <Chip
          label={row.role}
          color={row.role === 'admin' ? 'primary' : 'default'}
          size="small"
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
      ),
    },
  ];

  const filterOptions = [
    { id: 'role', label: 'Role', options: ['admin', 'user'] },
  ];

  useEffect(() => {
    fetchUsers();
  }, [filters, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8082/user');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
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
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8082/user/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchUsers();
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSubmit = async (userData) => {
    try {
      const url = selectedUser 
        ? `http://localhost:8082/user/${selectedUser.id}`
        : 'http://localhost:8082/user';
      
      const response = await fetch(url, {
        method: selectedUser ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setOpenForm(false);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

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
          onSearch={setSearchTerm}
          placeholder="Search users..."
        />
        <FilterBar
          filters={filterOptions}
          activeFilters={filters}
          onFilterChange={(id, value) => setFilters({ ...filters, [id]: value })}
          onClearFilters={() => setFilters({})}
        />
      </Box>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
      />

      <UserForm
        open={openForm}
        user={selectedUser}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Users;