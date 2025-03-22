import React, { useState } from 'react';
import {
  Box,
  Paper,
  Button,
  Menu,
  MenuItem,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

const FilterBar = ({
  filters,
  activeFilters = {},
  onFilterChange,
  onClearFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setAnchorEl(null);
    onFilterChange(filter.id, filter.value);
  };

  const handleRemoveFilter = (filterId) => {
    onFilterChange(filterId, null);
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <Box sx={{ mb: 2 }}>
      <Paper sx={{ p: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            startIcon={<FilterIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
          >
            Filters
          </Button>

          {activeFilterCount > 0 && (
            <Tooltip title="Clear all filters">
              <IconButton size="small" onClick={onClearFilters}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}

          <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
            {Object.entries(activeFilters).map(([key, value]) => (
              value && (
                <Chip
                  key={key}
                  label={`${filters.find(f => f.id === key)?.label}: ${value}`}
                  onDelete={() => handleRemoveFilter(key)}
                  size="small"
                />
              )
            ))}
          </Stack>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {filters.map((filter) => (
            <MenuItem
              key={filter.id}
              onClick={() => handleFilterClick(filter)}
            >
              {filter.label}
            </MenuItem>
          ))}
        </Menu>
      </Paper>
    </Box>
  );
};

export default FilterBar;