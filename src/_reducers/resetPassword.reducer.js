import { userConstants } from '../_constants/user.constants';

export function resetPassword(state = {}, action) {
  switch (action.type) {
    case userConstants.RESETPASSWORD_REQUEST:
      return { resetingPassword: true };
    case userConstants.RESETPASSWORD_SUCCESS:
      return {};
    case userConstants.RESETPASSWORD_FAILURE:
      return {};
    default:
      return state;
  }
}
