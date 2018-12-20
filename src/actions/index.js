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

export const fetchTasks = projectId => {
	console.log('project id from actions', projectId)
	return dispatch => http.get(`${config.apiUrl}/projects/${projectId}/tasks`)
		.then(resolved => {
			dispatch({
				type: types.FETCH_TASKS,
				payload: resolved.data
			})
		})
}
