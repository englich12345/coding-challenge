import { combineReducers } from 'redux';
import { candidateReducer } from './reducers/candidate.reducer';
import { notificationReducer } from './reducers/notification.reducer';

const rootReducer = combineReducers({
  candidateReducer,
  notificationReducer,
});
export default rootReducer;
