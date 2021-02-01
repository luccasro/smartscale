import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import UserProvider from 'providers/UserProvider';
import './index.css';
import { Dashboard, Homepage, Login, ForgotPassword, Register } from 'pages';
import { LINKS } from 'utils';
import { ToastProvider } from 'providers/ToastProvider';

function Application() {
  const theme = createTheme({
    typography: {
      fontFamily: ['Rajdhani', 'sans-serif'].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ToastProvider>
          <Router>
            <Routes>
              <Route path={LINKS.LOGIN} element={<Login />} />
              <Route path={LINKS.REGISTER} element={<Register />} />
              <Route
                path={LINKS.FORGOT_PASSWORD}
                element={<ForgotPassword />}
              />
              <Route path={LINKS.HOME} element={<Homepage />} />
              <Route path={LINKS.DASHBOARD} element={<Dashboard />} />
            </Routes>
          </Router>
        </ToastProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default Application;
