import authReducer from './auth';
import userAddresses from './addresses';
import categoryReducer from './category';
import { combineReducers } from 'redux';

export default combineReducers({
  authReducer,
  userAddresses,
  categoryReducer
});
