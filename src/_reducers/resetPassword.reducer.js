import { userConstants } from '../_constants/user.constants';

export function resetPassword(state = {}, action) {
  switch (action.type) {
    case userConstants.RESETPASSWORD_REQUEST:
      return { resetingPassword: true };
    case userConstants.RESETPASSWORD_SUCCESS:
      return { resetedPassword: true };
    case userConstants.RESETPASSWORD_FAILURE:
      return { errorresetPassword: true };
    default:
      return state;
  }
}
