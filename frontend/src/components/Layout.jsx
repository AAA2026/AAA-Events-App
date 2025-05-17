import React, { useState } from 'react';
import { Box, Container, IconButton, Tooltip } from '@mui/material';
import { ViewCompact, ViewStream } from '@mui/icons-material';
import Header from './Header';
import LanguageSelector from './LanguageSelector';

const Layout = ({ children }) => {
  const [isCompact, setIsCompact] = useState(false);

  const toggleLayout = () => {
    setIsCompact(!isCompact);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Header />
      <Container 
        component="main" 
        maxWidth={isCompact ? "md" : "lg"}
        sx={{ 
          flexGrow: 1,
          py: 3,
          px: { xs: 2, sm: 3 },
          mt: 2,
          transition: 'max-width 0.3s ease-in-out'
        }}
      >
        <Box sx={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1000 }}>
          <LanguageSelector />
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <Tooltip title={isCompact ? "Switch to Full Width" : "Switch to Compact"}>
              <IconButton
                onClick={toggleLayout}
                color="primary"
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 2,
                  '&:hover': {
                    bgcolor: 'background.paper',
                    opacity: 0.9
                  }
                }}
              >
                {isCompact ? <ViewStream /> : <ViewCompact />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 