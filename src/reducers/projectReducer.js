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
      const deletedTasks = [...state.tasks].filter(task => task._id !== state.activeTask._id)

      return {
        ...state,
        tasks: deletedTasks,
        activeTask: undefined,
        measurements: undefined
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
    case types.CHANGE_TASK_STATUS:
      return {
        ...state,
        tasks: action.payload.newTasks
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
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarShown: !state.isSidebarShown,
      }
    case types.DELETE_PROJECT:
      const deletedProjects = [...state.projects].filter(project => project._id !== state.activeProject._id)

      return {
        ...state,
        projects: deletedProjects,
        activeProject: {},
        tasks: undefined,
        activeTask: undefined,
        measurements: undefined
      }
    case types.UPDATE_PROJECT:
      return {
        ...state,
        projects: action.payload.projects
      }
    case types.TOGGLE_MODAL:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
        modalAction: action.payload.followingAction
      }
    default:
      return state
  }
}
