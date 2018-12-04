import * as types from '../contstants/actionTypes'
import http from '../utils/http'
import config from '../utils/config'

export const login = userInfo => {
	return dispatch => http.post(`${config.apiUrl}/account/login`, userInfo)
		.then(resolved => {
			console.log('resolved', resolved)
			if (resolved.data.success) {
				dispatch({
					type: types.LOGIN_SUCCESS,
					payload: resolved.data
				})
			} else {
				dispatch({
					type: types.LOGIN_ERROR,
					payload: resolved.data
				})
			}
		})
}
