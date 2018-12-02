import * as types from '../contstants/actionTypes'
import http from '../utils/http'
import config from '../utils/config'

export const login = userInfo => {
 	return {
		type: types.LOGIN_SUCCESS,
		userInfo
	}
}

export const authenticate = auth => ({
  type: types.AUTHENTICATE,
  auth
})
