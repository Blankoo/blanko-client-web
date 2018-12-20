import initialState from './initialState';
import * as types from '../contstants/actionTypes'

export default function projectsReducer(state=initialState, action) {
	switch (action.type) {
		case types.FETCH_PROJECTS:
			return {
				...state,
				projects: action.payload
			}
		case types.FETCH_TASKS:
		return {
			...state,
			tasks: action.payload
		}
    default:
      return state;
  }
}
