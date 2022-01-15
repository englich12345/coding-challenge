import { GET_ALL_CANDIDATES } from '../types'
import {get} from 'lodash'

export const candidateReducer = (state = {}, action) => {
  if (action.type === GET_ALL_CANDIDATES) {
    const data = get(action, 'value.data')
    if (data) {
      return Object.assign({}, state, {...action.value, data})
    }
    return Object.assign({}, state, action.value)
  }
  return state
}