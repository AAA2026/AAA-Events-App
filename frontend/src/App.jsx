import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import theme from './theme';
import Routes from './routes';
import { LanguageProvider } from './contexts/LanguageContext';
import './i18n'; // Import i18n configuration

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes />
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </Provider>
  );
}

export default App; 