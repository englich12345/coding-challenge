import { Dispatch } from 'redux';
import { get } from 'lodash';
import { getCandidates } from '../../api/application.api';
import { GET_ALL_CANDIDATES } from '../types';
import { IListApplication } from './action.interface';

const dispatchCandidates = (
  dispatch: Dispatch,
  loading = false,
  data: IListApplication | null,
  error?: any
) => {
  dispatch({
    type: GET_ALL_CANDIDATES,
    value: {
      loading,
      data,
      error,
    },
  });
};

export const fetchAllCandidates = () => async (dispatch: Dispatch) => {
  dispatchCandidates(dispatch, true, null, null);
  try {
    await getCandidates()
      .then(response => {
        if (get(response, 'data.data')) {
          dispatchCandidates(dispatch, false, response.data, null);
        } else if (get(response, 'data.error')) {
          dispatchCandidates(
            dispatch,
            false,
            null,
            get(response, 'data.error')
          );
        }
      })
      .catch(error => {
        dispatchCandidates(dispatch, false, null, error);
      });
  } catch (error) {
    dispatchCandidates(dispatch, false, null, error);
  }
};
