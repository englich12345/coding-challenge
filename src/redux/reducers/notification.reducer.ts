import { get } from 'lodash';
import { NOTIFICATION } from '../types';
import { IAction } from './reducer.interface';

export const notificationReducer = (state = {}, action: IAction) => {
  if (action.type === NOTIFICATION) {
    return Object.assign({}, state, { ...action.value });
  }
  return state;
};
