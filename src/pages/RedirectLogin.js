import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { history } from '../_helpers';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

const theme = createTheme();

function RedirectLogin() {
  const isEmailAuthenticated = false;
  useEffect(() => {
    if (isEmailAuthenticated) {
      setTimeout(() => {
        history.push('/log-in');
      }, 4000);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isEmailAuthenticated ? (
            <Card sx={{ minWidth: 275 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Stack sx={{ color: 'grey.500', mt: 3 }} direction="row">
                  <CircularProgress color="success" />
                </Stack>
                <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                  <Alert sx={{ p: 3 }} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    You are going to login in few seconds :
                    <strong> Email Verified!</strong>
                  </Alert>
                </Stack>
              </Box>
            </Card>
          ) : (
            <Card sx={{ minWidth: 275 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert sx={{ p: 3 }} severity="error">
                    <AlertTitle>Registration Failed</AlertTitle>
                    Your Email is not Verified :<strong>Session Expired</strong>
                  </Alert>
                </Stack>
                <Link sx={{ mt: 2, mb: 2 }} href="/log-in" variant="body2">
                  <Button size="large">
                    Click here to come back on Home Page
                  </Button>
                </Link>
              </Box>
            </Card>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RedirectLogin;
