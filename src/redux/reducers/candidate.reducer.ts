import { get } from 'lodash';
import { GET_ALL_CANDIDATES } from '../types';
import { IAction } from './reducer.interface';

export const candidateReducer = (state = {}, action: IAction) => {
  if (action.type === GET_ALL_CANDIDATES) {
    const data = get(action, 'value.data');
    if (data) {
      return Object.assign({}, state, { ...action.value, data });
    }
    return Object.assign({}, state, action.value);
  }
  return state;
};
