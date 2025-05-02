import { Snackbar, Alert } from '@mui/material';

export function CustomAlert({ open, message, severity, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}