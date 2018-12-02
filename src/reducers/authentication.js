import initialState from './initialState';
import * as types from '../contstants/actionTypes'
import http from '../utils/http'
import config from '../utils/config'

export default function authenticationReducer(state=initialState, action) {
  switch (action.type) {
		case types.LOGIN_SUCCESS:

			const { userInfo } = action
			console.log({userInfo})
			http.post(`${config.apiUrl}/account/login`, userInfo)
				.then(resolved => {
					const { id, success, token, user} = resolved.data
					return {
						...state,
						id,
						user,
						authenticated: success,
					}
				})
		case types.AUTHENTICATE:
      return state
    default:
      return state;
  }
}
