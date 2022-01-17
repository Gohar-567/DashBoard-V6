import { userConstants } from '../_constants/user.constants';

export function updateuser(state = {}, action) {
  switch (action.type) {
    case userConstants.UPDATEUSER_REQUEST:
      return { updatingUser: true };
    case userConstants.UPDATEUSER_SUCCESS:
      return { updatedUser: true };
    case userConstants.UPDATEUSER_FAILURE:
      return { errorUpdateUser: true };
    default:
      return state;
  }
}
