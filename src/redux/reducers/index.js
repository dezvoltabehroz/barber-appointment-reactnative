import authReducer from './auth';
import userAddresses from './addresses';
import { combineReducers } from 'redux';

export default combineReducers({
  authReducer,
  userAddresses
});
