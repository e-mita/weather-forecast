import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ErrorModalProps {
  error: string | null;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClose }) => (
  <Modal open={!!error} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        p: 4,
        boxShadow: 24,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Error
      </Typography>
      <Typography variant="body1" gutterBottom>
        {error}
      </Typography>
      <Button variant="contained" color="primary" onClick={onClose}>
        Close
      </Button>
    </Box>
  </Modal>
);

export default ErrorModal;
