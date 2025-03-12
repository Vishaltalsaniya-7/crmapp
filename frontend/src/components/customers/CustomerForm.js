import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// Remove the import of CustomerForm since we're defining it here

const CustomerForm = ({ open, onClose, onSubmit, customer }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'active'
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'active'
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{customer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="company"
            label="Company"
            fullWidth
            value={formData.company}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {customer ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomerForm;
// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material';

// const CustomerForm = ({ open, onClose, onSubmit, initialData = null }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     company: '',
//     status: 'active',
//     value: ''
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     } else {
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         address: '',
//         company: '',
//         status: 'active',
//         value: ''
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await onSubmit(formData);
//     } catch (error) {
//       console.error('Form submission error:', error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         {initialData ? 'Edit Customer' : 'Add Customer'}
//       </DialogTitle>
//       <form onSubmit={handleSubmit}>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 multiline
//                 rows={2}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Company"
//                 name="company"
//                 value={formData.company}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   label="Status"
//                 >
//                   <MenuItem value="active">Active</MenuItem>
//                   <MenuItem value="inactive">Inactive</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Value"
//                 name="value"
//                 type="number"
//                 value={formData.value}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button type="submit" variant="contained" color="primary">
//             {initialData ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };

// export default CustomerForm;