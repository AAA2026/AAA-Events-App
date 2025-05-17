import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Translate as TranslateIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const SettingsButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-label={t('settings.title')}
        aria-controls={open ? 'settings-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'settings-button',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
          },
        }}
      >
        {/* Theme Toggle */}
        <MenuItem onClick={handleThemeToggle}>
          <ListItemIcon>
            {theme === 'dark' ? <LightIcon /> : <DarkIcon />}
          </ListItemIcon>
          <ListItemText>
            {theme === 'dark' ? t('settings.lightMode') : t('settings.darkMode')}
          </ListItemText>
        </MenuItem>

        {/* Language Selection */}
        <MenuItem onClick={() => handleLanguageChange('en')}>
          <ListItemIcon>
            <TranslateIcon />
          </ListItemIcon>
          <ListItemText>English</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ar')}>
          <ListItemIcon>
            <TranslateIcon />
          </ListItemIcon>
          <ListItemText>العربية</ListItemText>
        </MenuItem>

        <Divider />

        {/* Authentication */}
        {!isAuthenticated ? (
          <>
            <MenuItem component={Button} href="/login" onClick={handleClose}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>{t('auth.login')}</ListItemText>
            </MenuItem>
            <MenuItem component={Button} href="/register" onClick={handleClose}>
              <ListItemIcon>
                <RegisterIcon />
              </ListItemIcon>
              <ListItemText>{t('auth.register')}</ListItemText>
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>{t('auth.logout')}</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default SettingsButton; 