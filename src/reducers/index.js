import { combineReducers } from 'redux'

// reducers
import authenticationReducer from './authentication'

const rootReducer = combineReducers({
	authenticationReducer
})

export default rootReducer
