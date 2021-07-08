import {createContext} from 'react'

function noop () {}

export const AuthContext = createContext({
  token: null,
  AuthContextuserId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  checked: [],
  setChecked: null
})