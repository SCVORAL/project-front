import React, { useContext } from "react"
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from './../context/AuthContext'
import axios from 'axios'

export const Navbar = () => {

  const { logout, changeLanguage, isAuthenticated } = useContext(AuthContext)

  const history = useHistory()
  
  const isAdmin = () => {
    const data = JSON.parse(localStorage.getItem("userData"))

    // await axios.post(`http://localhost:5000/api/auth/login`, form)

    // alert(data.userId)
  }

  isAdmin()

  const logautHandler = event => {
    event.preventDefault()
    logout()
    history.push('/')
  }

  return (

  <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/addFanFic">Add Fanfic</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/users">Users list</Link>
          </li>
        </ul>
        <form className="d-flex mx-auto">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        <button className="btn btn-info me-2" onClick={() => changeLanguage("en")}>EN</button>
        <button className="btn btn-info me-2" onClick={() => changeLanguage("ru")}>RU</button>

        {
          isAuthenticated
          ? <a className="btn btn-danger" onClick={logautHandler} href="#">Выйти</a>
          : <Link className="btn btn-primary" to="/login">Авторизация</Link>
        }

      </div>
    </div>
  </nav>

  )

}