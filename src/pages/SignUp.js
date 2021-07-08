import React, {useState, useEffect, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from './../context/AuthContext'
import axios from 'axios'


export const SignUp = () => {

  const {login, t} = useContext(AuthContext)

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    code: ''
  })

  const [registerError, setRegisterError] = useState(false)
  const [verification, setVerification] = useState(false)

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      // const {data} = await axios.post(`http://localhost:5000/api/auth/register`, form)
      const {data} = await axios.post(`https://project-back-node.herokuapp.com/api/auth/register`, form)

      if (data.error) {
        if (data.error == "1"){
          setRegisterError(t("emailAlredyRegistered"))
        } else if (data.error == "2") {
          setRegisterError(t("somethingWrong"))
        } else if (data.error == "0") {
          setRegisterError(t("incorrectData"))
        } else if (data.error == "3"){
          setRegisterError(t("verificationError"))
        } else if (data.error == "4") {
          setRegisterError(t("accountActivated"))
        }
      } else {
        login(data.token, data.userId)
        setRegisterError(false)
        setVerification(true)
      }
    } catch (e) {}
  }

  const verifyHandler = async () => {
    try {
      // const {data} = await axios.post(`http://localhost:5000/api/auth/verify`, form)
      const {data} = await axios.post(`https://project-back-node.herokuapp.com/api/auth/verify`, form)

      if (data.error == "0"){
        setRegisterError(t("verifyCodeError"))
      } else if (data.error == "1") {
        setRegisterError(t("verificationError"))
      } else if (data.error == "2") {
        setRegisterError(t("accountActivated"))
      } else if (data.error == "3") {
        setRegisterError(t("somethingWrong"))
      }

    } catch (e) {}
  } 

  return(
    <div className="row justify-content-center align-items-center">
      <div className="col-6">
        <div className="mb-3">
          <label className="form-label">{t("name")}</label>
          <input 
            type="text" 
            className="form-control" 
            name="name" 
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t("password")}</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            onChange={changeHandler}
          />
        </div>
        {
          verification
            ?
              <div className="mb-3">
                <label className="form-label">Verify code</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="code" 
                  onChange={changeHandler}
                />
              </div>
            :
              null
        }

        {
          registerError
            ?
              <div className="login-error mb-3"> {registerError} </div>
            : null
        }

        {verification 
          ? 
            <button 
              type="submit" 
              className="btn btn-primary"
              onClick={verifyHandler}
            >
            {t("verification") }
            </ button>

          : 
            <button 
              type="submit" 
              className="btn btn-primary"
              onClick={registerHandler}
            >
              {t("register")}
            </ button>
        }
        
        <NavLink className="btn btn-primary ms-3" to="/">{t("backLogin")}</NavLink>
      </div>
    </div>
  )
}