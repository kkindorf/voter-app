import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import userPollReducer from './user_polls_reducer';
import pollReducer from './poll_reducer';
const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  userPolls: userPollReducer,
  pollData: pollReducer
});

export default rootReducer;
