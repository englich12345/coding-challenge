import { Dispatch } from 'redux';
import { NOTIFICATION } from '../types';
import { INotification } from '../../components/commons/Notification/Notification';

export const notification =
  (notificationParams: INotification) => (dispatch: Dispatch) => {
    dispatch({
      type: NOTIFICATION,
      value: notificationParams,
    });
  };
