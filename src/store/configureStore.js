import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import initialState from '../reducers/initialState'


const configureStore = () => {
	return { ...createStore(rootReducer) }
}

export default configureStore
