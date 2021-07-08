import {useState, useCallback, useEffect} from 'react'

export const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userRole, setUserRole] = useState(null)

  const login = useCallback( (jwtToken, id, roleId) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, roleId
    }) )
  }, [] )

  const logout = useCallback( () => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [] )

  useEffect( () => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId)
    }
  }, [login])

  return {login, logout, token, userId}

}