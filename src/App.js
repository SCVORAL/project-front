import React, {useState} from 'react'
import {AuthContext} from './context/AuthContext'
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from './hooks/auth'
import { useTranslation } from "react-i18next"
import {Navbar} from './components/Navbar'

function App() {

  const {token, login, logout, userId} = useAuth()
  const [checked, setChecked] = useState([])
  const [users, setUsers] = useState([])
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, checked, setChecked, users, setUsers, t, changeLanguage
    }}>
    <Router>
      <Navbar />
      <div className='container'>
        {routes}
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App
