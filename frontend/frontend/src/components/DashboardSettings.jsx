import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Brightness4 as DarkModeIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/uiSlice';

const DashboardSettings = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          p: 3,
          borderRadius: { xs: '24px 0 0 24px' },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Settings
        </Typography>
        <IconButton onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <List>
        <ListItem>
          <ListItemIcon>
            <DarkModeIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Dark Mode" 
            secondary="Toggle dark/light theme"
          />
          <Switch
            edge="end"
            checked={theme === 'dark'}
            onChange={() => dispatch(toggleTheme())}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Notifications" 
            secondary="Enable push notifications"
          />
          <Switch edge="end" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Language" 
            secondary="Choose your preferred language"
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DashboardSettings; 