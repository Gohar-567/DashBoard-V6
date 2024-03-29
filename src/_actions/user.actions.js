import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  forgotPassword,
  resetPassword,
};

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        console.log(user, 'userAction');
        history.push('/');
        alert(JSON.stringify('Login successful'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        console.log(error, 'userActionError');
        // alert(JSON.stringify(error + ' (Login Failed)', null, 2));
      },
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function forgotPassword(email) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.forgotPassword(email).then(
      (user) => {
        dispatch(success(user));
        // console.log(user, 'forgotPasswordAction');
        alert(JSON.stringify(user));
        // history.push('/change-password');
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        console.log(error, 'forgotPasswordActionError');
        alert(JSON.stringify(error + ' (Forgot Password Failed)', null, 2));
      },
    );
  };

  function request(user) {
    return { type: userConstants.FORGOTPASSWORD_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.FORGOTPASSWORD_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.FORGOTPASSWORD_FAILURE, error };
  }
}

function resetPassword(token, password, confirmPassword) {
  console.log(password, 'resetPassword1');
  return (dispatch) => {
    dispatch(request());

    userService.resetPassword(token, password, confirmPassword).then(
      (user) => {
        dispatch(success(user));
        console.log(user, 'resetPasswordAction');
        alert(JSON.stringify(user));
        history.push('/log-in');
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        // console.log(error, 'resetPasswordActionError1');
        // alert(JSON.stringify(error + ' (Reset Password Failed)', null, 2));
      },
    );
  };

  function request(user) {
    return { type: userConstants.RESETPASSWORD_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.RESETPASSWORD_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.RESETPASSWORD_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      () => {
        dispatch(success());
        // history.push('/log-in');
        dispatch(alertActions.success('Registration successful'));
        alert(
          JSON.stringify(
            'please check your email for verification instructions',
          ),
        );
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        alert(JSON.stringify(error + '11', null, 2));
      },
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error)),
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      () => {
        dispatch(success(id));
      },
      (error) => {
        dispatch(failure(id, error));
      },
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
