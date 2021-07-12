import React, { useContext } from "react"
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from './../context/AuthContext'
import axios from 'axios'

export const Navbar = () => {

  const { t, logout, changeLanguage, isAuthenticated } = useContext(AuthContext)

  const history = useHistory()

  let userRoleId = ''
  if (localStorage.getItem('userData'))
    userRoleId = JSON.parse(localStorage.getItem('userData')).role

  const logautHandler = event => {
    event.preventDefault()
    logout()
    history.push('/')
  }

  return (

  <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">{t("home")}</Link>
          </li>
          {
            isAuthenticated
            ?
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/addFanFic">{t("addFanFic")}</Link>
              </li>
            : null
          }
          {
            userRoleId === 1
              ?
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/users">{t("usersList")}</Link>
                </li>
              : null
          }
        </ul>

        <form className="d-flex mx-auto mb-3 mb-lg-0">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">{t("search")}</button>
        </form>

        <button className="btn btn-info me-2" onClick={() => changeLanguage("en")}>EN</button>
        <button className="btn btn-info me-2" onClick={() => changeLanguage("ru")}>RU</button>

        {
          isAuthenticated
          ? <a className="btn btn-danger" onClick={logautHandler} href="#">{t("logout")}</a>
          : <Link className="btn btn-primary" to="/login">{t("login")}</Link>
        }

      </div>
    </div>
  </nav>

  )

}