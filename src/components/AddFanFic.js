import React, { useState, useContext, useEffect} from "react"
import {ChipsInput} from './ChipsInput'
import {SelectInput} from './SelectInput'
import {useInput} from '../hooks/input';
import {emptyStringValidator, emptyObjectValidator, emptyArrayValidator} from '../helpers/validators'
import axios from 'axios'

export const AddFanFic = () => {

  const nameInput = useInput(emptyStringValidator, '')
  const textInput = useInput(emptyStringValidator, '')
  const fandomInput = useInput(emptyObjectValidator, {})
  const tagsInput = useInput(emptyArrayValidator, [])
  const [img, setImg] = useState({})

  const [drag, setDrag] = useState(false)
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
            onChange={fandomInput.forTpl.onChange}
            isInvalid={!fandomInput.isValid && fandomInput.pristine}
            name="Fandom"
          />

          <ChipsInput 
            list={tag}
            onChange={tagsInput.forTpl.onChange}
            isInvalid={!tagsInput.isValid && tagsInput.pristine}
            name="Tags"
          />

          <div className="form-floating mb-3">
            <textarea className="form-control" placeholder="Leave a text here" name="text" {...textInput.forTpl} ></textarea>
            <label htmlFor="floatingTextarea2">Description</label>
            {!textInput.isValid && textInput.pristine ? <div>Text is incorrect</div> : null}
          </div>

          <div class="mb-3 drag-and-drop-block">
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