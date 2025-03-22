import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import DataTable from '../../components/common/DataTable';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    source: '',
    status: 'New',
    customer_id: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const statusOptions = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8082/customer');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    }
  };

  const handleEdit = (lead) => {
    setFormData({
      id: lead.id,
      source: lead.source,
      status: lead.status,
      customer_id: lead.customer?.id || '',
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      source: '',
      status: 'New',
      customer_id: '',
    });
    setIsEditing(false);
  };
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8082/lead');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      console.log('Raw API response:', data); // Debug log
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing 
        ? `http://localhost:8082/lead/${formData.id}`
        : 'http://localhost:8082/lead';
      
      const requestBody = {
        id: isEditing ? parseInt(formData.id) : undefined,
        customer_id: parseInt(formData.customer_id),
        source: formData.source,
        status: formData.status,
      };
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save lead');
      }

      await fetchLeads();
      handleClose();
    } catch (error) {
      console.error('Error saving lead:', error);
      alert(error.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8082/lead/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead status');
      }

      await fetchLeads();
    } catch (error) {
      console.error('Error updating lead status:', error);
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await fetch(`http://localhost:8082/lead/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete lead');
        }

        await fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
        alert(error.message);
      }
    }
  };
  const columns = [
    { 
      id: 'customer', 
      label: 'Customer',
      render: (row) => row.customer?.name || '-'
    },
    { 
      id: 'source', 
      label: 'Source',
      render: (row) => row.source || '-'
    },
    {
      id: 'status',
      label: 'Status',
      render: (row) => (
        <FormControl size="small" fullWidth>
          <Select
            value={row.status || 'New'}
            onChange={(e) => handleStatusChange(row.id, e.target.value)}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      id: 'created_at',
      label: 'Created At',
      render: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : '-'
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <Box>
          <IconButton size="small" onClick={() => handleEdit(row)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Leads</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Lead
        </Button>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        { "data send"}
        <Box sx={{ p: 2 }}>
          <Typography variant="caption">Debug Info:</Typography>
          <pre style={{ fontSize: '12px' }}>
            {JSON.stringify({ leads, loading }, null, 2)}
          </pre>
        </Box>
        
        <DataTable
          columns={columns}
          data={leads}
          loading={loading}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Lead' : 'Add Lead'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <FormControl fullWidth margin="dense" required>
              <InputLabel>Customer</InputLabel>
              <Select
                value={formData.customer_id}
                label="Customer"
                onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name} - {customer.company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense" required>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Source"
              fullWidth
              required
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Leads;