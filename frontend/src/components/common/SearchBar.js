import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

const SearchBar = ({ 
  placeholder = 'Search...', 
  onSearch, 
  initialValue = '',
  fullWidth = true 
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: fullWidth ? '100%' : 'auto',
        maxWidth: 600,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Tooltip title="Clear">
          <IconButton 
            type="button" 
            sx={{ p: '10px' }} 
            onClick={handleClear}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Search">
        <IconButton type="submit" sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default SearchBar;