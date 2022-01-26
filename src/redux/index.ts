import { combineReducers } from 'redux';
import { applicationReducer } from './reducers/application.reducer';
import { notificationReducer } from './reducers/notification.reducer';

const rootReducer = combineReducers({
  applicationReducer,
  notificationReducer,
});
export default rootReducer;
