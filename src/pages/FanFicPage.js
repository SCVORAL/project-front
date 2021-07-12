import React, { useState, useEffect, useContext} from "react"
import {useInput} from '../hooks/input';
import {emptyStringValidator} from '../helpers/validators'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from './../context/AuthContext'
import {EditFanFic} from './../components/EditFanFic'
import {EditChapter} from './../components/EditChapter'
import axios from 'axios'

export const FanFicPage = props => {

  const [reloadChapter, setReloadChapter] = useState(true)
  const [fanFic, setFanFic] = useState({})
  const nameInput = useInput(emptyStringValidator, '')
  const contentInput = useInput(emptyStringValidator, '')
  const history = useHistory()

  const { t } = useContext(AuthContext)

  let userRoleId = ''
  let userId = ''
  if (localStorage.getItem('userData')){
    userRoleId = JSON.parse(localStorage.getItem('userData')).role
    userId = JSON.parse(localStorage.getItem('userData')).userId
  }

  useEffect(() => {
    getFanFicId()
  }, [reloadChapter])

  const idFanFic = props.match.params.id

  const getFanFicId = async () => {
    // const {data} = await axios.post(`http://localhost:5000/api/fanfic/getFanFicId`, {idFanFic})
    const {data} = await axios.post(`https://project-back-node.herokuapp.com/api/fanfic/getFanFicId`, {idFanFic})

    setFanFic(data)
  }

  const addChapter = async () => {

    const newChapter = {
      name: nameInput.forTpl.value,
      content: contentInput.forTpl.value,
      fanficId: fanFic.id
    }

    let newChapters = fanFic.chapters.map(a => ({...a}))

    newChapters.push(newChapter)

    setFanFic({...fanFic, chapters: newChapters})

    // const {data} = await axios.post(`http://localhost:5000/api/fanfic/addChapter`, {
    const {data} = await axios.post(`http://project-back-node.herokuapp.com/api/fanfic/addChapter`, {
      name: nameInput.forTpl.value,
      content: contentInput.forTpl.value,
      fanficId: fanFic.id
    })

    setReloadChapter(!reloadChapter)

  }

  const dellChapter = async ({id, fanficId}) => {

    let newfan = fanFic.chapters.filter( chapter => {
      return chapter.id !== id
    })

    setFanFic({...fanFic, chapters: newfan})

    // const {data} = await axios.post(`http://localhost:5000/api/fanfic/delChapter`, {id, fanficId})
    const {data} = await axios.post(`http://project-back-node.herokuapp.com/api/fanfic/delChapter`, {id, fanficId})

    setReloadChapter(!reloadChapter)
  }

  const deleteFanFic = async id => {

    // const {data} = await axios.post(`http://localhost:5000/api/fanfic/deleteFanFic`, {id})
    const {data} = await axios.post(`http://project-back-node.herokuapp.com/api/fanfic/deleteFanFic`, {id})

    history.push('/')

  }

  const fanFicFull = () => {
    return (
      <div className="row">
        <div className="col-sm-3">
          { fanFic.urlImage
              ?  <img src={fanFic.urlImage} alt="" />
              :  <img src="https://res.cloudinary.com/scvoral/image/upload/v1625836530/woocommerce-placeholder_dlbx3k.png" alt="" />
          }
        </div>
        <div className="col-sm-9">

          <h2>{fanFic.name}</h2>
          <div className="row">
            <div className="col">{t("author")}: {fanFic.user.name}</div>
          </div>
          <div>{fanFic.description}</div>

          <a className="btn btn-primary my-3" data-bs-toggle="collapse" href="#collapseRead" role="button" aria-expanded="false" aria-controls="collapseRead collapseAdd">
            {t("read")}
          </a>

          {
            userRoleId === 1 || userId === fanFic.userId
              ?
                <>
                  <a className="btn btn-success my-3 mx-3" data-bs-toggle="collapse" href="#collapseAdd" role="button" aria-expanded="false" aria-controls="collapseAdd collapseRead">
                    {t("addChapter")}
                  </a>

                  <button onClick={() => deleteFanFic(fanFic.id)} type="button" className="btn btn-danger my-3">{t("deleteFanFic")}</button>

                  <EditFanFic 
                    fanFic={fanFic}
                    reloadChapter={reloadChapter}
                    setReloadChapter={setReloadChapter}
                  />
                </>
              : null
          }

          <div className="collapse" id="collapseRead">
            
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                {
                  fanFic.chapters.map( (i, index) => 
                    (
                      <button key={index} className="nav-link" data-bs-toggle="tab" data-bs-target={"#nav-" + i.id} type="button" role="tab">{i.name}</button>
                    )
                  )
                }
              </div>
            </nav>

            <div className="tab-content" id="nav-tabContent">
              {
                fanFic.chapters.map( (i, index) =>
                  {
                    return (
                      <div key={index} className="tab-pane fade" id={"nav-" + i.id} role="tabpanel">
                        {
                          userRoleId === 1 || userId === fanFic.userId
                            ?
                              <>
                                <button onClick={() => dellChapter(i)} type="button" className="btn btn-danger mt-3">{t("delete")} {i.name}</button>
                                <EditChapter
                                  chapter={i}
                                  reloadChapter={reloadChapter}
                                  setReloadChapter={setReloadChapter}
                                />
                              </>
                            : null
                        }

                        <div className="mt-3">{i.content}</div>

                      </div>
                    )
                  }
                )
              }
            </div>

          </div>

          <div className="collapse" id="collapseAdd">
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input type="text" className="form-control" name="name" {...nameInput.forTpl} />
              {!nameInput.isValid && nameInput.pristine ? <div>Name is incorrect</div> : null}
            </div>

            <div className="form-floating mb-3">
              <textarea className="form-control" placeholder="Leave a text here" name="text" {...contentInput.forTpl} ></textarea>
              <label htmlFor="floatingTextarea2">Content</label>
              {!contentInput.isValid && contentInput.pristine ? <div>Text is incorrect</div> : null}
            </div>

            <button 
              type="submit"
              className="btn btn-primary"
              disabled={!nameInput.isValid || !contentInput.isValid}
              onClick={addChapter}
            >
              Add
            </button>
          </div>

        </div>
      </div>
    )
  }
   

  return (
    <div className="section-fan-fic">

      {
        fanFic.name !== undefined
          ?
            fanFicFull()
          :
            <div>Loading</div>
      }

    </div>
  )

}