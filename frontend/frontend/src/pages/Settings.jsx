import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setTheme } from '../store/slices/uiSlice';

const Settings = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDarkMode = theme.palette.mode === 'dark';
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  const handleThemeChange = () => {
    dispatch(setTheme(isDarkMode ? 'light' : 'dark'));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Settings
      </Typography>

      <Paper 
        elevation={0}
        sx={{ 
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        }}
      >
        {saved && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Settings saved successfully!
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Appearance
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={handleThemeChange}
                color="primary"
              />
            }
            label="Dark Mode"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Notifications
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                color="primary"
              />
            }
            label="Enable Push Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                color="primary"
              />
            }
            label="Enable Email Notifications"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Account Settings
          </Typography>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            defaultValue="user@example.com"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Display Name"
            variant="outlined"
            defaultValue="John Doe"
            sx={{ mb: 2 }}
          />
          <Button
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
          >
            Change Password
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: 'linear-gradient(45deg, #6366f1, #a855f7)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5, #9333ea)',
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings; 