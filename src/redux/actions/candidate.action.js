import { getCandidates } from '../../api/application.api'
import { GET_ALL_CANDIDATES } from '../types'

const dispatchCandidates = (
  dispatch,
  loading = false,
  data = null,
  error = null
) => {
  dispatch({
    type: GET_ALL_CANDIDATES,
    value: {
      loading,
      data,
      error
    }
  })
}

export const fetchAllCandidates = () => async dispatch => {
  dispatchCandidates(dispatch, true, null, null)
  try {
    await getCandidates().then(response => {
      dispatchCandidates(dispatch, false, response.data, null)
    }).catch(error => {
      dispatchCandidates(dispatch, false, null, error)
    })
  } catch (error) {
    dispatchCandidates(dispatch, false, null, error)
  }
}