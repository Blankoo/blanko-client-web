import initialState from './initialState';
import * as types from '../contstants/actionTypes'

export default function projectsReducer(state=initialState, action) {
	switch (action.type) {
		case types.FETCH_PROJECTS:
			return {
				...state,
				projects: action.payload
			}

		case types.SET_PROJECT_DATA:
			return {
				...state,
				activeProject: action.payload,
				activeProjectId: action.payload._id
			}
		case types.FETCH_TASKS:
			return {
				...state,
				tasks: action.payload.data,
			}
		case types.TOGGLE_ADDPROJECT:
			return {
				...state,
				addProjectShown: !state.addProjectShown
			}
		case types.ADD_PROJECT:
			return {
				...state,
				projects: [...state.projects, action.payload],
				addProjectShown: false
			}
		case types.ADD_TASK:
			return {
				...state,
				tasks: [...state.tasks, action.payload.body]
			}
		case types.DELETE_TASK:
			const deletedId = action.payload.id
			const newTasks = state.tasks.filter(task => task._id !== deletedId)

			return {
				...state,
				tasks: newTasks
			}

		case types.SET_TASK_ACTIVE:
			console.log('set task active reducer')
			return {
				...state,
				activeTask: action.payload
			}
		default:
      return state;
  }
}
