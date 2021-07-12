import React, {useState, useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from './../context/AuthContext'
import axios from 'axios'

export const SignIn = () => {

  const {login, t} = useContext(AuthContext)
  const history = useHistory()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [loginError, setLoginError] = useState(null)

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {

      // const {data} = await axios.post(`http://localhost:5000/api/auth/login`, form)
      const {data} = await axios.post(`https://project-back-node.herokuapp.com/api/auth/login`, form)

      if(data.message === "0"){
        return setLoginError(t("incorrectData"))
      } else if (data.message === "1"){
        return setLoginError(t("invalidPasswordOrEmail"))
      } else if (data.message === "2"){
        return setLoginError(t("somethingWrong"))
      }

      if(data.userStatus) {
        login(data.token, data.userId, data.roleId)
      } else {
        return alert(t("userBlock"))
      }

      history.push('/')

    } catch (e) {
    }
  } 

  return(
    <div className="row justify-content-center align-items-center">
      <div className="col-6">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={changeHandler}/>
        </div>
        <div className="mb-3">
          <label className="form-label">{t("password")}</label>
          <input type="password" className="form-control" name="password" onChange={changeHandler}/>
        </div>
        {
          loginError
            ?
              <div className="login-error mb-3">{loginError}</div>
            : null
        }
        <button 
          type="submit" 
          className="btn btn-primary"
          onClick={loginHandler}
        >
          {t("login")}
        </button>
        <NavLink className="btn btn-primary ms-3" to="/signup">{t("register")}</NavLink>
      </div>
    </div>
  )
}