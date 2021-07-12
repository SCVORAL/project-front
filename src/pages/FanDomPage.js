import React, { useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'

export const FanDomPage = props => {

  const [fanfics, setFanfics] = useState(null)

  const getAllFanFic = async () => {
    const idFandom = props.match.params.id
    // const {data} = await axios.post(`http://localhost:5000/api/fanfic/getAllFanFic`, {idFandom})
    const {data} = await axios.post(`https://project-back-node.herokuapp.com/api/fanfic/getAllFanFic`, {idFandom})
    setFanfics(data)
  }

  useEffect(() => {
    getAllFanFic()
  }, [])

  return (
    <div className="section-one-fandom">
      <div className="row">
        {
          fanfics
            ?
              fanfics.map( i => (
                  <div className="col-sm-6 col-md-4 col-xl-3 mb-5" key={i.id}>
                    <div className="d-flex position-relative">

                      <div className="card">
                        <img src={i.urlImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{i.name}</h5>
                          <p className="card-text">
                            {i.description}
                          </p>
                          <Link className="stretched-link" to={'/fanfic/' + i.id}> Read </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              )
            : <div className="col-12">Loading</div>
        }
      </div>
    </div>
  )

}