import React, { useState, useEffect } from 'react';
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
  ArrowForward as ConvertIcon,
} from '@mui/icons-material';
import PageHeader from '../common/PageHeader';
import SearchBar from '../common/SearchBar';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import LeadForm from './LeadForm';

const Leads = () => {
  const [leads, setLeads] = useState({
    leads: {
      lead: [],
      last_page: 1,
      page_no: 1,
      per_page: 10,
      total_documents: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const columns = [
    {
      id: 'customer',
      label: 'Customer',
      render: (row) => `Customer ${row.customer_id}`
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
        <Chip
          label={row.status}
          color={
            row.status === 'Won' ? 'success' :
            row.status === 'Lost' ? 'error' :
            row.status === 'Negotiation' ? 'warning' : 'default'
          }
          size="small"
          sx={{ minWidth: '80px' }}
        />
      )
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
          <Tooltip title="Convert to Customer">
            <IconButton size="small" color="primary" onClick={() => handleConvertToCustomer(row.id)}>
              <ConvertIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filterOptions = [
    { id: 'status', label: 'Status', options: ['Hot', 'Warm', 'Cold'] },
    { id: 'source', label: 'Source', options: ['Website', 'Referral', 'Social Media', 'Other'] },
  ];

  useEffect(() => {
    fetchLeads();
  }, [filters, searchTerm, leads.leads.page_no]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        ...filters,
        search: searchTerm,
        page: leads.leads.page_no,
        per_page: leads.leads.per_page
      }).toString();

      const response = await fetch(`http://localhost:8082/lead?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAdd = () => {
    setSelectedLead(null);
    setOpenForm(true);
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm('Are you sure you want to delete this lead?')) return;
    
    try {
      const response = await fetch(`http://localhost:8082/lead/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete lead');
      
      showSnackbar('Lead deleted successfully');
      await fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
      showSnackbar(error.message, 'error');
    }
  };

  const handleConvertToCustomer = async (id) => {
    if (!id || !window.confirm('Convert this lead to a customer?')) return;

    try {
      const response = await fetch(`http://localhost:8082/lead/${id}/convert`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to convert lead to customer');

      showSnackbar('Lead converted to customer successfully');
      await fetchLeads();
    } catch (error) {
      console.error('Error converting lead:', error);
      showSnackbar(error.message, 'error');
    }
  };

  const handleSubmit = async (leadData) => {
    try {
      const url = selectedLead 
        ? `http://localhost:8082/lead/${selectedLead.id}`
        : 'http://localhost:8082/lead';

      const response = await fetch(url, {
        method: selectedLead ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) throw new Error(selectedLead ? 'Failed to update lead' : 'Failed to create lead');

      showSnackbar(`Lead ${selectedLead ? 'updated' : 'created'} successfully`);
      setOpenForm(false);
      await fetchLeads();
    } catch (error) {
      console.error('Error saving lead:', error);
      showSnackbar(error.message, 'error');
    }
  };

  const handlePageChange = (newPage) => {
    setLeads(prev => ({
      ...prev,
      leads: {
        ...prev.leads,
        page_no: newPage
      }
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Leads"
        action={true}
        actionText="Add Lead"
        actionIcon={<AddIcon />}
        onActionClick={handleAdd}
      />

      <Box sx={{ mb: 3 }}>
        <SearchBar
          onSearch={setSearchTerm}
          placeholder="Search leads..."
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
        data={leads?.leads?.lead || []}
        loading={loading}
        pagination={{
          page: leads?.leads?.page_no || 1,
          totalPages: leads?.leads?.last_page || 1,
          onPageChange: handlePageChange
        }}
      />

      <LeadForm
        open={openForm}
        lead={selectedLead}
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

export default Leads;