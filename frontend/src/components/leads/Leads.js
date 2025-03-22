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
  ArrowForward as ConvertIcon,
} from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterBar from '../../components/common/FilterBar';
import DataTable from '../../components/common/DataTable';
import LeadForm from './LeadForm';
import api from '../../services/api';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'company', label: 'Company' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    {
      id: 'status',
      label: 'Status',
      render: (value) => (
        <Chip
          label={value}
          color={
            value === 'Hot' ? 'error' :
            value === 'Warm' ? 'warning' :
            value === 'Cold' ? 'default' : 'primary'
          }
          size="small"
        />
      )
    },
    { id: 'source', label: 'Source' },
    {
      id: 'actions',
      label: 'Actions',
      render: (_, lead) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Convert to Customer">
            <IconButton
              size="small"
              color="success"
              onClick={() => handleConvertToCustomer(lead)}
            >
              <ConvertIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEdit(lead)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(lead.id)}
            >
              <DeleteIcon />
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
  }, [filters, searchTerm]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await api.getLeads({ filters, search: searchTerm });
      const data = await response.json();
      if (response.ok) {
        setLeads(data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
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
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await api.deleteLead(id);
        if (response.ok) {
          fetchLeads();
        }
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const handleConvertToCustomer = async (lead) => {
    if (window.confirm('Convert this lead to a customer?')) {
      try {
        const response = await api.convertLeadToCustomer(lead.id);
        if (response.ok) {
          fetchLeads();
        }
      } catch (error) {
        console.error('Error converting lead:', error);
      }
    }
  };

  const handleSubmit = async (leadData) => {
    try {
      if (selectedLead) {
        await api.updateLead(selectedLead.id, leadData);
      } else {
        await api.createLead(leadData);
      }
      setOpenForm(false);
      fetchLeads();
    } catch (error) {
      console.error('Error saving lead:', error);
    }
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
        data={leads}
        loading={loading}
      />

      <LeadForm
        open={openForm}
        lead={selectedLead}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Leads;