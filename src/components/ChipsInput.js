import React, { useState, useEffect } from "react"

export const ChipsInput = ({list, onChange, name, isInvalid}) => {

  const [tags, setTags] = useState([])
  const [filteredList, setfilteredList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isOptionsOpen, setOptionsState] = useState(false)

  useEffect(() => {
    setfilteredList(list)
  }, [list])

  useEffect(() => {
    onChange(tags)
  }, [tags])

  const selectTag = id => {
    setTags([...tags, list.find(tag => tag.id === id)])
    setfilteredList(filteredList.filter(tag => tag.id !== id))
    setSearchValue('')
  }

  const delTag = id => {
    setTags(tags.filter( tag => tag.id !== id ))
    setfilteredList([...filteredList, list.find(tag => tag.id === id)])
  }

  const onSearchBlur = (event) => {
    setTimeout(() => setOptionsState(false), 100)
  }

  return(
    <div className="section-tag">
      <div className="mb-3 relative-host">
        <label className="form-label" htmlFor="tag-list">{name}:</label>
        <input 
          className="form-control"
          type="text"
          name="tags"
          id="tag-list"
          list="tag_list"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onFocus={() => setOptionsState(true)}
          onBlur={onSearchBlur}
        />

        <div className={"options-list " + (isOptionsOpen ? 'options-list_show' : 'options-list_hidden')}>
          {filteredList.filter((tag) => tag.name.includes(searchValue.trim())).map(tag => 
            <div className="option" onClick={() => selectTag(tag.id)} key={tag.id}>{tag.name}</div>
          )}
        </div>
      </div>

      {isInvalid ? <div>Please select at least one tag</div> : null}

      <div className="mb-3">
        <div className="row">
          {
            tags.map( (tag) => 
              (
                <div className="col-auto" key={tag.id}>
                  <div className="del-tag mr-1">
                    {tag.name} 
                    <div className="del-tag-btn" onClick={() => delTag(tag.id)}>x</div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )

}