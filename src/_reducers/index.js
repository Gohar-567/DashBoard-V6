import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { forgotPassword } from './forgotPassword.reducer';
import { resetPassword } from './resetPassword.reducer';
import { updateuser } from './update.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  forgotPassword,
  resetPassword,
  updateuser,
});

export default rootReducer;
