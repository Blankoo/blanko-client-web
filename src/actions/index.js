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
	return dispatch => http.get(`${config.apiUrl}/projects/5c366886c1e4070f6f6729da/tasks`)
		.then(resolved => {
			dispatch({
				type: types.FETCH_TASKS,
				payload: {
					projectId,
					data: resolved.data
				}
			})
		})
}

export const toggleAddProjectModal = () => ({
	type: types.TOGGLE_ADDPROJECT,
})

export const addProject = projectData => {
	return dispatch  => http.post(`${config.apiUrl}/projects/add/`, projectData)
		.then(resolved => {
			dispatch({
				type: types.ADD_PROJECT,
				payload: resolved.data
			})
		})
}

export const addTask = taskData => {
	console.log(' add task ')
	return dispatch => http.post(`${config.apiUrl}/projects/add/5c366886c1e4070f6f6729da`, taskData)
		.then(resolved => {
			dispatch({
				type: types.ADD_TASK,
				payload: resolved.data
			})
		})
}
