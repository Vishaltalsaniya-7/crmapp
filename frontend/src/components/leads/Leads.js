import React, { useState, useEffect } from 'react';
// ... existing imports ...
import Notification from '../../components/common/Notification';

const Leads = () => {
  // ... existing state ...
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

  const handleAddLead = async (formData) => {
    try {
      const response = await leadService.createLead(formData);
      setLeads([...leads, response.data]);
      showNotification('Lead created successfully');
      setOpenForm(false);
    } catch (error) {
      console.error('Error creating lead:', error);
      showNotification(error.message || 'Error creating lead', 'error');
    }
  };

  const handleEditLead = async (formData) => {
    try {
      const response = await leadService.updateLead(selectedLead.id, formData);
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id ? response.data : lead
      ));
      showNotification('Lead updated successfully');
      setSelectedLead(null);
      setOpenForm(false);
    } catch (error) {
      console.error('Error updating lead:', error);
      showNotification(error.message || 'Error updating lead', 'error');
    }
  };

  const handleDelete = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadService.deleteLead(leadId);
        setLeads(leads.filter(lead => lead.id !== leadId));
        showNotification('Lead deleted successfully');
      } catch (error) {
        console.error('Error deleting lead:', error);
        showNotification(error.message || 'Error deleting lead', 'error');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* ... existing JSX ... */}
      
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Box>
  );
};

export default Leads;