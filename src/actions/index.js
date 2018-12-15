import * as types from '../contstants/actionTypes'
import http from '../utils/http'
import config from '../utils/config'

export const login = userInfo => {
	return dispatch => http.post(`${config.apiUrl}/account/login`, userInfo)
		.then(resolved => {
			if (resolved.data.success) {
				return dispatch({
					type: types.LOGIN_SUCCESS,
					payload: resolved.data
				})
			} else {
				return dispatch({
					type: types.LOGIN_ERROR,
					payload: resolved.data
				})
			}
		})
}

export const fetchProjects = () => {
	return dispatch => http.get(`${config.apiUrl}/projects`)
		.then(resolved => {
			console.log({ resolvedProjects: resolved })
			dispatch({
				type: types.FETCH_PROJECTS,
				payload: resolved.data
			})
		})
}
