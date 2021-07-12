import React, { useState, useEffect, useContext} from 'react'
import {Lock, Unlock, Trash} from 'react-bootstrap-icons'
import {AuthContext} from './../context/AuthContext'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

export const UserList = () => {

  const {t} = useContext(AuthContext)
  const [users, setUsers] = useState(null)
  const [checked, setChecked] = useState([])
  const [reload, setReload] = useState(true)
  const history = useHistory()


  const getAllUsers = async () => {
    // const {data} = await axios.get(`http://localhost:5000/api/auth/getAllUsers`)
    const {data} = await axios.get(`https://project-back-node.herokuapp.com/api/auth/getAllUsers`)

    setUsers(data)
  }

  useEffect(() => {
    getAllUsers()
  }, [reload])

  let arr = checked
  const handelChangeCheckBox = (id) => {
    let arrLoc = []
    let count = 0

    if( arr.length === 0){
      arrLoc.push(id)
    } else {
      for(let i = 0; i < arr.length; i++) {
        if (arr[i] !== id){
          arrLoc.push(arr[i])
          count++
        }
      }
      if(arr.length === count)
        arrLoc.push(id)
    }

    arr = arrLoc
    setChecked(arrLoc)
  }

  const handelClickBlock = async () => {
    // await axios.post(`http://localhost:5000/api/auth/block`, {checked})
    await axios.post(`https://project-back-node.herokuapp.com/api/auth/block`, {checked})
    setReload(!reload)
  }

  const handelClickUnlock = async () => {
    // await axios.post(`http://localhost:5000/api/auth/unlock`, {checked})
    await axios.post(`https://project-back-node.herokuapp.com/api/auth/unlock`, {checked})
    setReload(!reload)
  }

  const handelClickTrash = async () => {
    // await axios.post(`http://localhost:5000/api/auth/delete`, {checked})
    await axios.post(`https://project-back-node.herokuapp.com/api/auth/delete`, {checked})
    setReload(!reload)
  }  

  const handelMakeAdmin = async () => {
    // await axios.post(`http://localhost:5000/api/auth/addAdmin`, {checked})
    await axios.post(`https://project-back-node.herokuapp.com/api/auth/addAdmin`, {checked})
    setReload(!reload)
  }  

  const handelMakeUser = async () => {
    // await axios.post(`http://localhost:5000/api/auth/addUser`, {checked})
    await axios.post(`https://project-back-node.herokuapp.com/api/auth/addUser`, {checked})
    setReload(!reload)
  }

  return(
    <div className="row">
      <div className="col-12">

        <button className="btn btn-primary" onClick={handelClickBlock}><Lock /></button>
        <button className="btn btn-primary mx-3" onClick={handelClickUnlock}><Unlock /></button>
        <button className="btn btn-danger" onClick={handelClickTrash}><Trash /></button>
        <button className="btn btn-primary mx-3" onClick={handelMakeAdmin}>{t("makeAdmin")}</button>
        <button className="btn btn-primary" onClick={handelMakeUser}>{t("makeUser")}</button>

        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">#</th>
              <th scope="col">{t("name")}</th>
              <th scope="col">E-mail</th>
              <th scope="col">{t("status")}</th>
              <th scope="col">{t("role")}</th>
            </tr>
          </thead>
          <tbody>
            { users
                ?
                users.map(link => 
                  (
                    <tr key={link.id}>
                      <td><input type="checkbox" onChange={() => handelChangeCheckBox(link.id)}/></td>
                      <td>{link.id}</td>
                      <td>{link.name}</td>
                      <td>{link.email}</td>
                      <td>{link.status ? <Unlock /> : <Lock />}</td>
                      <td>{link.role.name}</td>
                      <td></td>
                    </tr>
                  )
                )
                : <tr><td>Loading</td></tr>
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}