import React, { useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'

export const FanDomPage = props => {

  const [fanfics, setFanfics] = useState(null)

  const getAllFanFic = async () => {
    const idFandom = props.match.params.id
    const {data} = await axios.post(`http://localhost:5000/api/fanfic/getAllFanFic`, {idFandom})
    // const {data} = await axios.post(`https://project-back-node.herokuapp.com/api/fanfic/getAllFanFic`, {idFandom})
    setFanfics(data)
  }

  useEffect(() => {
    getAllFanFic()
  }, [])

  return (
    <div className="section-fandom">
      <div className="row">
        {
          fanfics
            ?
              fanfics.map( i => (
                  <div className="col-md-3" key={i.id}>
                    <div className="d-flex position-relative">

                      <div class="card">
                        <img src={i.urlImage} class="card-img-top" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{i.name}</h5>
                          <p class="card-text">
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