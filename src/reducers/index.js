import { combineReducers } from 'redux'

// reducers
import authenticationReducer from './authenticationReducer'

const rootReducer = combineReducers({
	authenticationReducer
})

export default rootReducer
