import initialState from './initialState';
import * as types from '../contstants/actionTypes'

export default function projectsReducer(state=initialState, action) {
	console.log({ action })
	switch (action.type) {
		case types.FETCH_PROJECTS:
			return {
				...state,
				projects: action.payload
			}
		case types.FETCH_TASKS:
			return {
				...state,
				tasks: action.payload.data,
				activeProject: action.payload.projectId
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
		default:
      return state;
  }
}
