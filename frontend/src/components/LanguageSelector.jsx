import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { language, changeLanguage } = useLanguage();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    handleClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        aria-label="change language"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          onClick={() => handleLanguageChange('en')}
          selected={language === 'en'}
        >
          English
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageChange('es')}
          selected={language === 'es'}
        >
          Español
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageChange('fr')}
          selected={language === 'fr'}
        >
          Français
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelector; 