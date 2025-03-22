import React from 'react';
import { Box, Typography } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

const NoData = ({ message = 'No data available' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
        color: 'text.secondary'
      }}
    >
      <InboxOutlined sx={{ fontSize: 48 }} />
      <Typography variant="body1">
        {message}
      </Typography>
    </Box>
  );
};

export default NoData;