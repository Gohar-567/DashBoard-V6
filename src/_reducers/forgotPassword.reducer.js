import { userConstants } from '../_constants/user.constants';

export function forgotPassword(state = {}, action) {
  switch (action.type) {
    case userConstants.FORGOTPASSWORD_REQUEST:
      return { forgetingPassword: true };
    case userConstants.FORGOTPASSWORD_SUCCESS:
      return { successforgetingPassword: true };
    case userConstants.FORGOTPASSWORD_FAILURE:
      return { errorforgetPassword: true };
    default:
      return state;
  }
}
