import { combineReducers } from 'redux';
import { candidateReducer } from './reducers/candidate.reducer';

const rootReducer = combineReducers({
  candidateReducer,
});
export default rootReducer;
