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

const theme = createTheme();
const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Too Short!')
    .max(25, 'Too Long!')
    .required('')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ChangePassword = (props) => {
  const formik = useFormik({
    initialValues: {
      token: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      props.resetPassword(
        (values.token =
          '41914c115eb5cf078bba82c9c0c990b7c19df46eaf898ae2bb9740dce7f02243dec8ccad1b6f9e9f'),
        values.password,
        values.confirmPassword,
      );
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
            Change password
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Enter your register email below to recieve password reset
            instruction
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              sx={{ mt: 1 }}
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              // href="/log-in"
            >
              Change Password
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  const { resetingPassword } = state.authentication;
  return { resetingPassword };
};

const mapDispatchToProps = {
  resetPassword: userActions.resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
