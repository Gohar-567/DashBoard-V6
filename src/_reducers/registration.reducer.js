import { userConstants } from '../_constants/user.constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return { registered: true };
    case userConstants.REGISTER_FAILURE:
      return { registrationerror: true };
    default:
      return state;
  }
}
