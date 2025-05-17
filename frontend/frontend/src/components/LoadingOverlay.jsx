import React from 'react';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingOverlay = () => {
  const { loading } = useSelector((state) => state.ui);

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay; 