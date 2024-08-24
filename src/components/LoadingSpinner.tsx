import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
