import * as types from '../contstants/actionTypes'
import http from '../utils/http'
import config from '../utils/config'

export const login = userInfo => {
  return dispatch => http.post(`${config.apiUrl}/account/login`, userInfo)
  .then((resolved) => {
    if (resolved.data.success) {
      return dispatch({
        type: types.LOGIN_SUCCESS,
        payload: resolved.data
      })
    }
    return dispatch({
      type: types.LOGIN_ERROR,
      payload: resolved.data
    })
  })
}

export const fetchProjects = () => dispatch => http.get(`${config.apiUrl}/projects`)
  .then((resolved) => {
    dispatch({
      type: types.FETCH_PROJECTS,
      payload: resolved.data
    })
  })

export const setSelectedProject = project => ({
  type: types.SET_PROJECT_DATA,
  payload: project
})

export const fetchTasks = projectID => dispatch => http.get(`${config.apiUrl}/projects/${projectID}/tasks`)
  .then((resolved) => {

    dispatch({
      type: types.FETCH_TASKS,
      payload: {
        data: resolved.data
      }
    })
  })

export function setAllTasks(k) {
  return (dispatch) => {
    http.get(`${config.apiUrl}/tasks`)
      .then(resolved => {
        dispatch({
          type: types.FETCH_TASKS,
          payload: {
            data: resolved.data
          }
        })
      })
  }
}

export const toggleAddProjectModal = () => ({
  type: types.TOGGLE_ADDPROJECT,
})

export function toggleModal(key, value, followingAction) {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_MODAL,
      payload: {
        key,
        value,
        followingAction
      }
    })
  }
}

export function dispatchAction(actionName, payload) {
  return dispatch => {
    if(actionName === types.DELETE_TASK) {
      dispatch(deleteTask())
    } else if(actionName === types.DELETE_PROJECT) {
      dispatch(deleteProject())
    }
  }
}

export const addProject = projectData => dispatch => http.post(`${config.apiUrl}/projects/add/`, projectData)
  .then((resolved) => {
    dispatch({
      type: types.ADD_PROJECT,
      payload: resolved.data
    })
  })

export const getSingleProject = id => dispatch => http.get(`${config.apiUrl}/projects/${id}`)
  .then((resolved) => {
    dispatch({
      type: types.SET_PROJECT_DATA,
      payload: resolved.data
    })
  })

export const addTask = (taskData, activeProjectId) => dispatch => http.post(`${config.apiUrl}/projects/add/${activeProjectId}`, taskData)
  .then((resolved) => {
    dispatch({
      type: types.ADD_TASK,
      payload: resolved.data
    })
  })

export function setTaskActive(task) {
  return (dispatch, getState) => {
    const thereIsNoActiveMeasurement = getState().projectReducer.activeMeasurementId === undefined

    if(thereIsNoActiveMeasurement) {
      if(task !== undefined) {
        http.get(`${config.apiUrl}/timemeasurements/all/${task._id}`)
          .then(resolved => {
            const measurements = resolved.data
            dispatch({
              type: types.SET_TASK_ACTIVE,
              payload: {
                task,
                measurements
              }
            })
          })
      } else {
        dispatch({
          type: types.SET_TASK_NOT_ACTIVE
        })
      }
    }
  }
}

export function updateTaskStatus(taskId, currentStatus) {
  const newStatus = {
    status: currentStatus === 'TODO' ? 'DONE' : 'TODO'
  }
  let updatedTaskGlob = {}

  if(taskId !== undefined) {
    return (dispatch, getState) => http.put(`${config.apiUrl}/tasks/update/${taskId}`, newStatus)
      .then(resolved => {

        const oldTasks = getState().projectReducer.tasks
        const newTasks = oldTasks.map(task => {
          if(task._id === taskId ) {
            const updatedTask = {
              ...task,
              status: (task.status === 'TODO') ? 'DONE' : 'TODO'
            }
            updatedTaskGlob = updatedTask
            return updatedTask
          } else {
            return task
          }
        })

        dispatch({
          type: types.CHANGE_TASK_STATUS,
          payload: {
            newTasks,
            data: resolved.data
          }
        })
        if(getState().projectReducer.activeTask !== undefined) {
          dispatch(setTaskActive(updatedTaskGlob))
        }
      })
  }
}

export const startTimeMeasurement = (taskId, startMesObj) => {
  console.log({ startMesObj })
  if(taskId !== undefined) {
    return dispatch => http.post(`${config.apiUrl}/timemeasurements/new/${taskId}`, startMesObj)
    .then(resolved => {
      dispatch({
        type: types.START_MES,
        payload: resolved.data
      })
    })
  }
}

export function stopTimeMeasurement(taskId, measurementId, endMesObj) {
  if(taskId !== undefined) {
    return dispatch => http.put(`${config.apiUrl}/timemeasurements/update/${taskId}/${measurementId}`, endMesObj)
      .then(resolved => {
        dispatch({
          type: types.STOP_MES,
          payload: resolved.data
        })
      })
  }
}

export function showSidebar() {
    return {
      type: types.TOGGLE_SIDEBAR,
    }
}

export function deleteTask(taskId) {
  return (dispatch, getState) => {
    const activeTaskId = getState().projectReducer.activeTask._id || taskId
    return http.delete(`${config.apiUrl}/tasks/${activeTaskId}`)
      .then((resolved) => {
        dispatch({
          type: types.DELETE_TASK,
          payload: {
            activeTaskId,
            resolved: resolved.data
          }
        })
      })
  }
}

export function deleteProject(projectId) {
  return (dispatch, getState) => {
    const activeProjectId = getState().projectReducer.activeProject._id || projectId
    return http.delete(`${config.apiUrl}/projects/${activeProjectId}`)
      .then(() => {
        dispatch({
          type: types.DELETE_PROJECT,
          payload: { id: activeProjectId }
        })
        window.localStorage.removeItem('PROJ_ID')
      })
  }
}

export function renewTasksArray(newTask) {
  return (dispatch, getState) => {
    const oldTasks = getState().projectReducer.tasks
    const newTasks = oldTasks.map((task) => {
      if (task._id === newTask._id) {
        task = newTask
        return task
      }
      return task
    })

    dispatch({
      type: types.RENEW_TASK_ARRAY,
      payload: { newTasks }
    })
  }
}

export function updateProject(projectId, updateObject) {
  return (dispatch, getState) => {
    if (updateObject === undefined) {
      const currentFavStatus = getState().projectReducer.activeProject.favorite
      updateObject = {
        favorite: !currentFavStatus
      }
    }

    const oldProjects = getState().projectReducer.projects
    const newProjects = oldProjects.map((project) => {
      if (project._id === projectId) {
        const updatedproject = {
          ...project,
          favorite: !project.favorite
        }
        return updatedproject
      }
      return project
    })

    http.put(`${config.apiUrl}/projects/${projectId}`, updateObject)
      .then((resolved) => {
        dispatch({
          type: types.UPDATE_PROJECT,
          payload: {
            projects: newProjects,
            res: resolved.data
          }
        })
      })
  }
}

export function updateTask(bodyToUpdate, taskId) {
  return (dispatch) => {
    http.put(`${config.apiUrl}/tasks/update/${taskId}`, bodyToUpdate)
      .then((resolved) => {
        dispatch(renewTasksArray(resolved.data.task))
      })
  }
}

export function reorderTasks(tasks, source, destination, taskId, projectId) {
    console.log('reorder action')
    const newTasksList = [...tasks]
    const [removedTask] = newTasksList.splice(source.index, 1)
    newTasksList.splice(destination.index, 0, removedTask)

  const orderedTaskList = newTasksList.map((task, idx) => {
    task.order = idx
    return task
  })

  console.log({
    orderedTaskList,
    newTasksList,
    tasks
  })

  persistNewListOrder({
    taskId,
    source,
    destination,
    projectId,
    tasks: orderedTaskList
  })

  return {
    type: types.REORDER_TASKS,
    payload: {
      tasks: orderedTaskList
    }
  }
}

function persistNewListOrder(body) {
  http.put(`${config.apiUrl}/tasks/reorder`, body)
    .then(a => a)
    .catch(err => console.error({ err }))
}

export function addNewTimeMeasurement(totalTimeInSeconds, taskId) {
  const newMesBody = {
    total: totalTimeInSeconds,
    isFinished: true
  }

  return dispatch => http.post(`${config.apiUrl}/timemeasurements/new/${taskId}`, newMesBody)
    .then((resolved) => {
      dispatch({
        type: types.NEW_MES,
        payload: resolved.data
      })
    })
}
