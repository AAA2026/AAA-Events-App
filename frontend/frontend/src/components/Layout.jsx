import React from 'react';
import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './Header';

const Layout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Container 
        component="main" 
        maxWidth="lg"
        sx={{ 
          flexGrow: 1,
          py: 3,
          px: { xs: 2, sm: 3 },
          mt: 2
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 