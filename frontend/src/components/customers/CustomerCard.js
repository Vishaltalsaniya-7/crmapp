import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CustomerList from '../../components/customers/CustomerList';
import CustomerForm from '../../components/customers/CustomerForm';
import { customerService } from '../../services/api';

const Customers = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCreate = () => {
    setSelectedCustomer(null);
    setOpenForm(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpenForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCustomer) {
        await customerService.updateCustomer(selectedCustomer.id, formData);
      } else {
        await customerService.createCustomer(formData);
      }
      setOpenForm(false);
      window.location.reload();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Customers</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create Customer
        </Button>
      </Box>
      <CustomerList onEdit={handleEdit} />
      <CustomerForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        customer={selectedCustomer}
      />
    </Box>
  );
};

export default Customers;