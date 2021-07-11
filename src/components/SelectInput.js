import React, { useState, useEffect } from "react"

export const SelectInput = ({list, onChange, name, fandom, isInvalid}) => {

  const [tag, setTag] = useState({})
  const [searchValue, setSearchValue] = useState(fandom)
  const [isOptionsOpen, setOptionsState] = useState(false)

  useEffect(() => {
    onChange(tag)
  }, [tag])

  const selectTag = tag => {
    setTag(tag)
    setSearchValue(tag.name)
  }

  const onSearchBlur = event => {
    setTimeout(() => {
      setOptionsState(false)
    }, 100);
  }

  const onSearchChange = event => {
    if (Object.keys(tag).length !== 0 && tag.name !== event.target.value) {
      setTag({})
      setSearchValue('');
    } else {
      setSearchValue(event.target.value)
    }
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
          onChange={onSearchChange}
          onFocus={() => setOptionsState(true)}
          onBlur={onSearchBlur}
        />

        <div className={"options-list " + (isOptionsOpen ? 'options-list_show' : 'options-list_hidden')}>
          {list.filter((tag) => tag.name.includes(searchValue.trim())).map((tag, index) => 
            <div className="option" onClick={() => selectTag(tag)} key={index}>{tag.name}</div>
          )}
        </div>
      </div>
      {isInvalid ? <div>Please select fandom</div> : null}
    </div>
  )

}