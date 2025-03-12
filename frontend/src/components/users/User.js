import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Chip,
  Avatar
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import UserForm from '../../components/users/UserForm';
import Notification from '../../components/common/Notification';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-03-11'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'active',
      lastLogin: '2024-03-10'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handleAddUser = (formData) => {
    try {
      const newUser = {
        ...formData,
        id: users.length + 1,
        lastLogin: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      showNotification('User created successfully');
      setOpenForm(false);
    } catch (error) {
      showNotification('Error creating user', 'error');
    }
  };

  const handleEditUser = (formData) => {
    try {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...formData, id: user.id, lastLogin: user.lastLogin } : user
      ));
      showNotification('User updated successfully');
      setSelectedUser(null);
      setOpenForm(false);
    } catch (error) {
      showNotification('Error updating user', 'error');
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setUsers(users.filter(user => user.id !== userId));
        showNotification('User deleted successfully');
      } catch (error) {
        showNotification('Error deleting user', 'error');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>{user.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography>{user.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.status}
                    color={user.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => {
                    setSelectedUser(user);
                    setOpenForm(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UserForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleEditUser : handleAddUser}
        initialData={selectedUser}
      />

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Box>
  );
};

export default Users;