import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const PageHeader = ({ title, action, actionText, actionIcon, onActionClick }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      {action && (
        <Button
          variant="contained"
          startIcon={actionIcon}
          onClick={onActionClick}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;