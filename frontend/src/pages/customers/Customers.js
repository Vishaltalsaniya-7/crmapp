import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import CustomerForm from '../../components/customers/CustomerForm';
import Notification from '../../components/common/Notification';

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      company: 'Tech Corp',
      status: 'active',
      leads: 5


    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '098-765-4321',
      company: 'Design Co',
      status: 'inactive',
      leads: 3

    }
  ]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
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

  const handleAddCustomer = (formData) => {
    try {
      const newCustomer = {
        ...formData,
        id: customers.length + 1
      };
      setCustomers([...customers, newCustomer]);
      setOpenForm(false);
      showNotification('Customer added successfully');
    } catch (error) {
      showNotification('Error adding customer', 'error');
    }
  };

  const handleEditCustomer = (formData) => {
    try {
      setCustomers(customers.map(customer => 
        customer.id === selectedCustomer.id ? { ...formData, id: customer.id } : customer
      ));
      setSelectedCustomer(null);
      setOpenForm(false);
      showNotification('Customer updated successfully');
    } catch (error) {
      showNotification('Error updating customer', 'error');
    }
  };

  const handleDelete = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        setCustomers(customers.filter(customer => customer.id !== customerId));
        showNotification('Customer deleted successfully');
      } catch (error) {
        showNotification('Error deleting customer', 'error');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Customer Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Add Customer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Leads</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title={customer.phone}>
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <PhoneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={customer.email}>
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <EmailIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>
                  <Chip 
                    label={customer.status}
                    color={customer.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`${customer.leads} leads`}
                    color="info"
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton 
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setOpenForm(true);
                      }}
                      size="small"
                      sx={{ color: 'primary.main', mr: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      onClick={() => handleDelete(customer.id)}
                      size="small"
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
            <CustomerForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedCustomer(null);
        }}
        onSubmit={selectedCustomer ? handleEditCustomer : handleAddCustomer}
        initialData={selectedCustomer}
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
export default Customers;
// import React, { useState, useEffect } from 'react';// import {
// //   Box,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Typography,
// //   IconButton,
// //   Tooltip,
// //   Button,
// //   Chip
// // } from '@mui/material';
// // import {
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Add as AddIcon,
// //   Phone as PhoneIcon,
// //   Email as EmailIcon
// // } from '@mui/icons-material';
// import CustomerForm from '../../components/customers/CustomerForm';
// import Notification from '../../components/common/Notification';

// const Customers = () => {
//   const [customers, setCustomers] = useState([ {
//     id: 1,
//     name: 'John Doe',
//     email: 'john@example.com',
//     phone: '123-456-7890',
//     company: 'Tech Corp',
//     status: 'active',
//     value: 50000
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     phone: '098-765-4321',
//     company: 'Design Co',
//     status: 'inactive',
//     value: 25000
//   }]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [notification, setNotification] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       setLoading(true);
//       const response = await customerService.getCustomers();
//       setCustomers(response);
//     } catch (error) {
//       showNotification('Error fetching customers', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showNotification = (message, severity = 'success') => {
//     setNotification({
//       open: true,
//       message,
//       severity
//     });
//   };

//   const handleCloseNotification = () => {
//     setNotification(prev => ({ ...prev, open: false }));
//   };

//   const handleAddCustomer = async (formData) => {
//     try {
//       const response = await customerService.createCustomer(formData);
//       setCustomers([...customers, response]);
//       setOpenForm(false);
//       showNotification('Customer added successfully');
//     } catch (error) {
//       showNotification(error.message || 'Error adding customer', 'error');
//     }
//   };

//   const handleEditCustomer = async (formData) => {
//     try {
//       const response = await customerService.updateCustomer(selectedCustomer.id, formData);
//       setCustomers(customers.map(customer => 
//         customer.id === selectedCustomer.id ? response : customer
//       ));
//       setSelectedCustomer(null);
//       setOpenForm(false);
//       showNotification('Customer updated successfully');
//     } catch (error) {
//       showNotification(error.message || 'Error updating customer', 'error');
//     }
//   };

//   const handleDelete = async (customerId) => {
//     if (window.confirm('Are you sure you want to delete this customer?')) {
//       try {
//         await customerService.deleteCustomer(customerId);
//         setCustomers(customers.filter(customer => customer.id !== customerId));
//         showNotification('Customer deleted successfully');
//       } catch (error) {
//         showNotification(error.message || 'Error deleting customer', 'error');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* ... existing JSX code ... */}
      
//       <CustomerForm
//         open={openForm}
//         onClose={() => {
//           setOpenForm(false);
//           setSelectedCustomer(null);
//         }}
//         onSubmit={selectedCustomer ? handleEditCustomer : handleAddCustomer}
//         initialData={selectedCustomer}
//       />

//       <Notification
//         open={notification.open}
//         message={notification.message}
//         severity={notification.severity}
//         onClose={handleCloseNotification}
//       />
//     </Box>
//   );
// };

// export default Customers;