import {useState, useCallback, useEffect} from 'react'

export const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userRole, setUserRole] = useState(null)

  const login = useCallback( (jwtToken, id, roleId) => {
    setToken(jwtToken)
    setUserId(id)
    setUserRole(roleId)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, role: roleId
    }) )

  }, [] )

  const logout = useCallback( () => {
    setToken(null)
    setUserId(null)
    setUserRole(null)
    localStorage.removeItem(storageName)
  }, [] )

  useEffect( () => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.role)
    }
  }, [login])

  return {login, logout, token, userId}

}