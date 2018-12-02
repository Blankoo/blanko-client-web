import * as types from '../contstants/actionTypes'

export const login = login => ({
  type: types.LOGIN,
  login
})

export const authenticate = auth => ({
  type: types.AUTHENTICATE,
  auth
})
