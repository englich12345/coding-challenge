import { combineReducers } from "redux";
import {candidateReducer} from '../redux/reducers/candidate.reducer'

const rootReducer = combineReducers({
    candidateReducer
});
export default rootReducer;
