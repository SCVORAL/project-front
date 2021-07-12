import React, { useState, useEffect, useContext} from "react"
import {useInput} from '../hooks/input'
import {ChipsInput} from './ChipsInput'
import {SelectInput} from './SelectInput'
import {AuthContext} from './../context/AuthContext'
import {emptyStringValidator, emptyObjectValidator, emptyArrayValidator} from '../helpers/validators'
import axios from 'axios'

export const EditFanFic = ({fanFic, reloadChapter, setReloadChapter}) => {

  const nameInput = useInput(emptyStringValidator, fanFic.name)
  const fanDomNameInput = useInput(emptyStringValidator, fanFic.fandom.name)
  const textInput = useInput(emptyStringValidator, fanFic.description)
  const fandomInput = useInput(emptyObjectValidator, {})
  const [img, setImg] = useState('')
  const [imgFandom, setImgFandom] = useState({})
  const { t } = useContext(AuthContext)

  const [drag, setDrag] = useState(false)
  const [dragFandom, setDragFandom] = useState(false)
  const [fanDom, setFanDom] = useState([])

  const FanDom = async () => {
    // const {data} = await axios.get(`http://localhost:5000/api/fanfic/getFandom`)
    const {data} = await axios.get(`https://project-back-node.herokuapp.com/api/fanfic/getFandom`)

    setFanDom(data)
  }

  const editFanFic = async () => {
    // await axios.post(`http://localhost:5000/api/fanfic/editFanFic`, {
    await axios.post(`https://project-back-node.herokuapp.com/api/fanfic/editFanFic`, {
      id: fanFic.id,
      name: nameInput.forTpl.value,
      fandomId: fandomInput.forTpl.value.id,
      imgBase64: img,
      urlImg: fanFic.urlImage,
      description: textInput.forTpl.value
    })

    setReloadChapter(!reloadChapter)
  }

  useEffect(() => {
    FanDom()
  }, [])

  const dragStartHandler = e => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = e => {
    e.preventDefault()
    setDrag(false)
  }

  const dragDropHandler = e => {
    e.preventDefault()

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = function(e) {
      setImg(reader.result)
    }
    reader.readAsDataURL(file)

    setDrag(false)
  }

  const dragStartHandler2 = e => {
    e.preventDefault()
    setDragFandom(true)
  }

  const dragLeaveHandler2 = e => {
    e.preventDefault()
    setDragFandom(false)
  }

  const dragDropHandler2 = e => {
    e.preventDefault()

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = function(e) {
      setImgFandom(reader.result)
    }
    reader.readAsDataURL(file)

    setDragFandom(false)
  }

  const fanDomAdd = async () => {

    let newFanDom = fanDom.map(a => ({...a}))

    newFanDom.push({ name: fanDomNameInput.forTpl.value })

    setFanDom(newFanDom)

    // const {data} = await axios.post(`http://localhost:5000/api/fanfic/addFandom`, {
    const {data} = await axios.post(`http://project-back-node.herokuapp.com/api/fanfic/addFandom`, {
      name: fanDomNameInput.forTpl.value,
      imgBase64: imgFandom
    })

  }

  return (

    <>
      <button type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
        {t("editFanFic")}
      </button>

      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit FanFic</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              
            <div className="section-add-fanfic">
              <div className="row justify-content-center align-items-center">
                <div className="col-12">

                  <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" name="name" {...nameInput.forTpl} />
                    {!nameInput.isValid && nameInput.pristine ? <div>Name is incorrect</div> : null}
                  </div>

                  <SelectInput 
                    list={fanDom}
                    onChange={fandomInput.forTpl.onChange}
                    fandom={fanFic.fandom.name}
                    isInvalid={!fandomInput.isValid && fandomInput.pristine}
                    name="Fandom"
                  />

                  <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addFandom">
                    Add new Fan Dom
                  </button>

                  <div className="modal fade" id="addFandom" tabIndex="-1" aria-labelledby="addFandomLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Add new fandom</h5>
                        </div>
                        <div className="modal-body">
                          <label className="form-label">Fan Dom Name:</label>
                          <input type="text" className="form-control" name="name" {...fanDomNameInput.forTpl} />
                          {!fanDomNameInput.isValid && fanDomNameInput.pristine ? <div>Name is incorrect</div> : null}

                          <div className="my-3 drag-and-drop-block">
                            {
                              dragFandom
                                ? <div 
                                    className="drop-area2 drop-area-blue2"
                                    onDragStart = { e => dragStartHandler2(e)}
                                    onDragLeave = { e => dragLeaveHandler2(e)}
                                    onDragOver = { e => dragStartHandler2(e)}
                                    onDrop = { e =>  dragDropHandler2(e)}
                                  >Отпустите картинку, чтобы загрузить его</div>
                                : <div
                                    className="drop-area2"
                                    onDragStart = { e => dragStartHandler2(e)}
                                    onDragLeave = { e => dragLeaveHandler2(e)}
                                    onDragOver = { e => dragStartHandler2(e)}
                                  >Перетащите картинку</div>
                            }
                          </div>

                          <button 
                            type="submit"
                            className="btn btn-primary"
                            disabled={!fanDomNameInput.isValid}
                            onClick={fanDomAdd}
                          >
                            Add
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-floating mb-3">
                    <textarea className="form-control" placeholder="Leave a text here" name="text" {...textInput.forTpl} ></textarea>
                    <label htmlFor="floatingTextarea2">Description</label>
                    {!textInput.isValid && textInput.pristine ? <div>Text is incorrect</div> : null}
                  </div>

                  <div className="mb-3 drag-and-drop-block">
                    {
                      drag
                        ? <div 
                            className="drop-area drop-area-blue"
                            onDragStart = { e => dragStartHandler(e)}
                            onDragLeave = { e => dragLeaveHandler(e)}
                            onDragOver = { e => dragStartHandler(e)}
                            onDrop = { e =>  dragDropHandler(e)}
                          >Отпустите картинку, чтобы загрузить его</div>
                        : <div
                            className="drop-area"
                            onDragStart = { e => dragStartHandler(e)}
                            onDragLeave = { e => dragLeaveHandler(e)}
                            onDragOver = { e => dragStartHandler(e)}
                          >Перетащите картинку</div>
                    }
                    {/*<img src={test} alt="" />*/}
                  </div>

                </div>
              </div>
            </div>

            </div>
            <div className="modal-footer">
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={!nameInput.isValid && !fandomInput.isValid && !textInput.isValid}
                onClick={editFanFic}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>




  )

}