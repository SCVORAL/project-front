import React, { useState, useContext, useEffect} from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'

export const Fandom = () => {

  const [fandom, setFandom] = useState([])

  const getFandom = async () => {
    // const {data} = await axios.get(`http://localhost:5000/api/fanfic/getFandom`)
    const {data} = await axios.get(`https://project-back-node.herokuapp.com/api/fanfic/getFandom`)
    setFandom(data)
  }

  useEffect(() => {
    getFandom()
  }, [])

  return (
    <div className="section-fandom">
      <div className='row'>

      { fandom.map( i => 
        (
          <div className='col-6 col-sm-4 col-lg-2 mb-5' key={i.id}>
            <Link to={'/fandom/' + i.id} className="item">
              <div className="box-img">
                <img src={i.urlImage} />
              </div>
              <div className="item-text">{i.name}</div>
            </Link>
          </div>
        )
      )}

      </div>
    </div>
  )

}