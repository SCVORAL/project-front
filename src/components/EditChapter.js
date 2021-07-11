import React, { useState, useEffect} from "react"
import {useInput} from '../hooks/input'
import {emptyStringValidator} from '../helpers/validators'
import axios from 'axios'

export const EditChapter = ({chapter, reloadChapter, setReloadChapter}) => {

  const [fanFic, setFanFic] = useState({})
  const nameInput = useInput(emptyStringValidator, chapter.name)
  const contentInput = useInput(emptyStringValidator, chapter.content)


  useEffect(() => {

  }, [])

  const editBtn = async () => {
    const {data} = await axios.post(`http://localhost:5000/api/fanfic/updateChapter`, {
      name: nameInput.forTpl.value,
      content: contentInput.forTpl.value,
      id: chapter.id
    })

    setReloadChapter(!reloadChapter)
  }

  return (
    <>
      <button type="button" className="btn btn-primary mx-3 mt-3" data-bs-toggle="modal" data-bs-target={"#chapter" + chapter.id}>
        Edit Chapter
      </button>

      <div className="modal fade" id={"chapter" + chapter.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit {chapter.name}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
              <button 
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                disabled={!nameInput.isValid || !contentInput.isValid}
                onClick={editBtn}
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