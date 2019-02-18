import initialState from './initialState'
import * as types from '../contstants/actionTypes'

export default function projectsReducer(state = initialState, action) {
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
        isAddProjectShown: !state.isAddProjectShown
      }
    case types.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        isAddProjectShown: false
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
      return {
        ...state,
        activeTask: action.payload.task,
        measurements: action.payload.measurements
      }

    case types.SET_TASK_NOT_ACTIVE:
      return {
        ...state,
        activeTask: undefined
      }
    case types.START_MES:
      return {
        ...state,
        activeMeasurementId: action.payload.newMeasurement._id
      }
    case types.STOP_MES:
      return {
        ...state,
        activeMeasurementId: undefined,
        measurements: state.measurements.concat(action.payload.measurement)
      }
    default:
      return state
  }
}
