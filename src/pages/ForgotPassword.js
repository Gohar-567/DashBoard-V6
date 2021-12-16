import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Auth.css';

import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme();
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPassword = (props) => {
  const [notifyError, setnotifyError] = useState(false);
  const [notifySuccess, setnotifySuccess] = useState(false);
  const authentication = useSelector((state) => state.forgotPassword);
  const { successforgetingPassword, errorforgetPassword } = authentication;
  useEffect(() => {
    if (successforgetingPassword) {
      setnotifySuccess(true);
    }
  }, successforgetingPassword);
  useEffect(() => {
    if (errorforgetPassword) {
      setnotifyError(true);
    }
  }, errorforgetPassword);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      props.forgotPassword(values.email);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Your password?
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Enter your registerd email below to recieve password reset
            instruction on your given email adddress
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Collapse in={notifySuccess}>
              <Alert
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setnotifySuccess(false);
                    }}
                  >
                    {/* <CloseIcon fontSize="inherit" /> */}
                  </IconButton>
                }
                sx={{ mb: 0, mt: 3 }}
              >
                Please check your email for password reset instructions!
              </Alert>
            </Collapse>
            <Collapse in={notifyError}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setnotifyError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 0, mt: 3 }}
              >
                This account is not registered (Must be a valid email) !
              </Alert>
            </Collapse>
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              // href="/change-password"
              disabled={successforgetingPassword}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  const { forgetingPassword } = state.authentication;
  return { forgetingPassword };
};

const mapDispatchToProps = {
  forgotPassword: userActions.forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
