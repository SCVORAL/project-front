import React, { useState, useEffect } from 'react'
import {Lock, Unlock, Trash} from 'react-bootstrap-icons'
import axios from 'axios'

export const UserList = () => {

  const [users, setUsers] = useState(null)
  const [checked, setChecked] = useState([])
  const [reload, setReload] = useState(true)


  const getAllUsers = async () => {
    const {data} = await axios.get(`http://localhost:5000/api/auth/getAllUsers`)

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
    await axios.post(`http://localhost:5000/api/auth/block`, {checked})
    setReload(!reload)
  }

  const handelClickUnlock = async () => {
    await axios.post(`http://localhost:5000/api/auth/unlock`, {checked})
    setReload(!reload)
  }

  const handelClickTrash = async () => {
    await axios.post(`http://localhost:5000/api/auth/delete`, {checked})
    setReload(!reload)
  }  

  const handelMakeAdmin = async () => {
    await axios.post(`http://localhost:5000/api/auth/addAdmin`, {checked})
    setReload(!reload)
  }  

  const handelMakeUser = async () => {
    await axios.post(`http://localhost:5000/api/auth/addUser`, {checked})
    setReload(!reload)
  }

  return(
    <div className="row">
      <div className="col-12">

        <button className="btn btn-primary" onClick={handelClickBlock}><Lock /></button>
        <button className="btn btn-primary mx-3" onClick={handelClickUnlock}><Unlock /></button>
        <button className="btn btn-danger" onClick={handelClickTrash}><Trash /></button>
        <button className="btn btn-primary mx-3" onClick={handelMakeAdmin}>Make Admin</button>
        <button className="btn btn-primary" onClick={handelMakeUser}>Make User</button>

        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Status</th>
              <th scope="col">Is Admin</th>
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