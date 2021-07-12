import React, { useState, useEffect } from "react"
import {useHistory} from 'react-router-dom'
import {ChipsInput} from './ChipsInput'
import {SelectInput} from './SelectInput'
import {useInput} from '../hooks/input'
import {emptyStringValidator, emptyObjectValidator, emptyArrayValidator} from '../helpers/validators'
import axios from 'axios'

export const AddFanFic = () => {

  const history = useHistory()

  const nameInput = useInput(emptyStringValidator, '')
  const fanDomNameInput = useInput(emptyStringValidator, '')
  const tagInput = useInput(emptyStringValidator, '')
  const textInput = useInput(emptyStringValidator, '')
  const fandomInput = useInput(emptyObjectValidator, {})
  const tagsInput = useInput(emptyArrayValidator, [])
  const [img, setImg] = useState(null)
  const [imgFandom, setImgFandom] = useState({})

  const [drag, setDrag] = useState(false)
  const [dragFandom, setDragFandom] = useState(false)
  const [tag, setTag] = useState([])
  const [fanDom, setFanDom] = useState([])

  const getTag = async () => {
    // const {data} = await axios.get(`http://localhost:5000/api/fanfic/gettags`)
    const {data} = await axios.get(`https://project-back-node.herokuapp.com/api/fanfic/gettags`)

    setTag(data)
  }

  const FanDom = async () => {
    // const {data} = await axios.get(`http://localhost:5000/api/fanfic/getFandom`)
    const {data} = await axios.get(`https://project-back-node.herokuapp.com/api/fanfic/getFandom`)

    setFanDom(data)
  }

  const AddFanFicHandler = async () => {

    // await axios.post(`http://localhost:5000/api/fanfic/addfanfic`, {
    await axios.post(`https://project-back-node.herokuapp.com/api/fanfic/addfanfic`, {
      userId: JSON.parse(localStorage.getItem("userData")).userId,
      name: nameInput.forTpl.value,
      fandomId: fandomInput.forTpl.value.id,
      imgBase64: img,
      tags: tagsInput.forTpl.value.map( tag => tag.name ),
      description: textInput.forTpl.value
    })

    history.push('/')
  }

  useEffect(() => {
    getTag()
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

    const {data} = await axios.post(`http://localhost:5000/api/fanfic/addFandom`, {
      name: fanDomNameInput.forTpl.value,
      imgBase64: imgFandom
    })

  }

  const tagAdd = async () => {

    let newTag = tag.map(a => ({...a}))

    newTag.push({ name: tagInput.forTpl.value })

    let count = 0
    let arrTag = newTag.filter( i => {
      if (i.name === tagInput.forTpl.value){
        if (count === 0){
          count++
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    })

    setTag(arrTag)

    const {data} = await axios.post(`http://localhost:5000/api/fanfic/tagAdd`, {name: tagInput.forTpl.value})

  }

  return (
    <div className="section-add-fanfic">
      <div className="row justify-content-center align-items-center">
        <div className="col-6">

          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" className="form-control" name="name" {...nameInput.forTpl} />
            {!nameInput.isValid && nameInput.pristine ? <div>Name is incorrect</div> : null}
          </div>

          <SelectInput 
            list={fanDom}
            fandom={''}
            onChange={fandomInput.forTpl.onChange}
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
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Add
                  </button>

                </div>
              </div>
            </div>
          </div>


          <ChipsInput 
            list={tag}
            onChange={tagsInput.forTpl.onChange}
            isInvalid={!tagsInput.isValid && tagsInput.pristine}
            name="Tags"
          />

          <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addTag">
            Add new Tag
          </button>

          <div className="modal fade" id="addTag" tabIndex="-1" aria-labelledby="addTagLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add new fandom</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <label className="form-label">Tag Name:</label>
                  <input type="text" className="form-control" name="name" {...tagInput.forTpl} />
                  {!tagInput.isValid && tagInput.pristine ? <div>Name is incorrect</div> : null}

                  <button 
                    type="submit"
                    className="btn btn-primary mt-3"
                    disabled={!tagInput.isValid}
                    onClick={tagAdd}
                    data-bs-dismiss="modal"
                    aria-label="Close"
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

          <button 
            type="submit"
            className="btn btn-primary"
            disabled={!nameInput.isValid && !fandomInput.isValid && !tagsInput.isValid && !textInput.isValid}
            onClick={AddFanFicHandler}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )

}