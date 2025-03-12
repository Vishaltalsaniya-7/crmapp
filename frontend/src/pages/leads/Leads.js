import React, { useState } from 'react';
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
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';

const Leads = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Sarah Wilson',
      company: 'Innovation Labs',
      email: 'sarah@innovation.com',
      phone: '123-456-7890',
      status: 'New',
      value: 75000
    },
    {
      id: 2,
      name: 'Tom Brown',
      company: 'Digital Solutions',
      email: 'tom@digital.com',
      phone: '098-765-4321',
      status: 'In Progress',
      value: 45000
    }
  ]);

  const handleDelete = (id) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Lead Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Add lead handler */}}
        >
          Add Lead
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Value</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{lead.email}</Typography>
                    <Typography variant="body2" color="textSecondary">{lead.phone}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={lead.status}
                    color={
                      lead.status === 'New' ? 'success' :
                      lead.status === 'In Progress' ? 'warning' : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>${lead.value?.toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(lead.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leads;