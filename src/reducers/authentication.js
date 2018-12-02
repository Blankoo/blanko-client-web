import initialState from './initialState';
import * as types from '../contstants/actionTypes'

export default function authenticationReducer(state=initialState, action) {
  switch (action.type) {
		case types.LOGIN:
      return {
				...state,
				authenticated: true
			}
		case types.AUTHENTICATE:
      return state
    default:
      return state;
  }
}
