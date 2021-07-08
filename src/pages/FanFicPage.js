import React, { useState, useEffect} from "react"
import axios from 'axios'

export const FanFicPage = props => {

  const [fanfic, setFanfic] = useState(null)

  const getAllFanFic = async () => {
    const idFandom = props.match.params.id
    // const {data} = await axios.post(`http://localhost:5000/api/fanfic/getAllFanFic`, {idFandom})
    const {data} = await axios.post(`https://project-back-node.herokuapp.com/api/fanfic/getAllFanFic`, {idFandom})
    setFanfic(data)
  }

  useEffect(() => {
    getAllFanFic()
  }, [])

  console.log(fanfic)

  return (
    <div className="section-fandom">
      <div className="row">
        {
          fanfic
            ?
              fanfic.map( i => (
                  <div className="col-md-6" key={i.id}>
                    <div className="d-flex position-relative">
                      <img src={i.urlImage} className="flex-shrink-0 me-3" alt="..." />
                      <div>
                        <h5 className="mt-0">{i.name}</h5>
                        <p>
                          {i.description}
                        </p>
                        <a href="#" className="stretched-link">Go somewhere</a>
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