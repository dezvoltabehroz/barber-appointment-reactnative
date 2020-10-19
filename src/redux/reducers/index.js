import authReducer from './auth';
import userAddresses from './addresses';
import categoryReducer from './category';
import barberReducer from './barbers'
import { combineReducers } from 'redux';

export default combineReducers({
  authReducer,
  userAddresses,
  categoryReducer,
  barberReducer,
});
