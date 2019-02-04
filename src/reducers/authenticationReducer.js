import initialState from './initialState'
import * as types from '../contstants/actionTypes'

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const { id, user, success } = action.payload

      return {
        ...state,
        userId: id,
        user,
        authenticated: success,
      }
    case types.LOGIN_ERROR:
      return {
        ...state,
        authenticated: action.payload.success,
      }
    default:
      return state
  }
}
