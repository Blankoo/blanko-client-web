import { combineReducers } from 'redux'

// reducers
import authenticationReducer from './authenticationReducer'
import projectReducer from './projectReducer'

const rootReducer = combineReducers({
  authenticationReducer,
  projectReducer
})

export default rootReducer
