import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Auth.css';

import logger from 'redux-logger';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { useSelector } from 'react-redux';
import { useState } from 'react';
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
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = (props) => {
  const [notifyError, setnotifyError] = useState(false);
  const authentication = useSelector((state) => state.authentication);
  const { notloggedIn } = authentication;
  useEffect(() => {
    // reset login status
    props.logout();
  }, []);
  useEffect(() => {
    if (notloggedIn) {
      // alert(notloggedIn);
      setnotifyError(true);
    }
  }, notloggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.login(values.email, values.password);
      logger;
      // alert(JSON.stringify(values, null, 2));
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
            Sign in
          </Typography>

          <form onSubmit={formik.handleSubmit}>
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
                Email or password is incorrect (Login Failed) !
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
            <TextField
              sx={{ mt: 3 }}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              // href="/"
            >
              Sign In
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  const { loggingIn } = state.authentication;
  return { loggingIn };
};

const mapDispatchToProps = {
  login: userActions.login,
  logout: userActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// import { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
// import { userActions } from '../_actions';
// import MDBInputFormik from '../components/mdbformik/MdbInputFormik';
// import { MDBBtn } from 'mdb-react-ui-kit';
// import './login.css';
// const SigninSchema = Yup.object().shape({
//   email: Yup.string().email('Email is invalid').required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Min 6 characters')
//     .required('Password is required'),
// });

// const Login = (props) => {
//   useEffect(() => {
//     // reset login status
//     props.logout();
//   }, []);

//   return (
//     <div className="login-container">
//       <Formik
//         initialValues={{
//           email: '',
//           password: '',
//           remember: false,
//         }}
//         validationSchema={SigninSchema}
//         onSubmit={({ email, password }) => {
//           // same shape as initial values
//           props.login(email, password);
//         }}
//       >
//         {({ errors, touched }) => (
//           <Form>
//             <h1 className="mb-3" style={{ textAlign: 'center' }}>
//               Welcome Back!
//             </h1>
//             <div className="p-2">
//               <Field
//                 component={MDBInputFormik}
//                 name="email"
//                 type="text"
//                 label="Email"
//                 size="lg"
//               />
//               {errors.email && touched.email ? <div>{errors.email}</div> : null}
//             </div>
//             <div className="p-2 mb-2">
//               <Field
//                 component={MDBInputFormik}
//                 name="password"
//                 type="password"
//                 label="Password"
//                 size="lg"
//               />
//               {errors.password && touched.password ? (
//                 <div>{errors.password}</div>
//               ) : null}
//             </div>
//             <label className="Remember-me">
//               <Field type="checkbox" name="remember" />
//               Remember me
//             </label>
//             <a className="login-form-forgot" href="/">
//               Forgot password?
//             </a>
//             <MDBBtn
//               color="primary"
//               className="mt-5 mb-4"
//               type="submit"
//               size="large"
//             >
//               Log in
//             </MDBBtn>
//             <br />
//             Or <a href="/">register now!</a>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   const { loggingIn } = state.authentication;
//   return { loggingIn };
// };

// const mapDispatchToProps = {
//   login: userActions.login,
//   logout: userActions.logout,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
