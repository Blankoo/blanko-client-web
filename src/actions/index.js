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
			dispatch({
				type: types.FETCH_PROJECTS,
				payload: resolved.data
			})
		})
}

export const setSelectedProject = project => ({
	type: types.SET_PROJECT_DATA,
	payload: project
})

export const fetchTasks = projectID => {
	return dispatch => http.get(`${config.apiUrl}/projects/${projectID}/tasks`)
		.then(resolved => {
			dispatch({
				type: types.FETCH_TASKS,
				payload: {
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

export const getSingleProject = id => {
	return dispatch => http.get(`${config.apiUrl}/projects/${id}`)
		.then(resolved => {
			dispatch({
				type: types.SET_PROJECT_DATA,
				payload: resolved.data
			})
		})
}

export const addTask = (taskData, activeProjectId) => {
	return dispatch => http.post(`${config.apiUrl}/projects/add/${activeProjectId}`, taskData)
		.then(resolved => {
			dispatch({
				type: types.ADD_TASK,
				payload: resolved.data
			})
		})
}

export const deleteTask = (projectId, taskId) => {
	return dispatch => http.delete(`${config.apiUrl}/tasks/${projectId}/${taskId}`)
		.then(resolved => {
			dispatch({
				type: types.DELETE_TASK,
				payload: resolved.data
			})
		})
}
