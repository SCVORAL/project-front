import {useState, useCallback, useEffect} from 'react';
import {isEmpty} from 'lodash'

export const useInput = (validator, startValue) => {

  const [value, setValue] = useState(startValue);
  const [isValid, setValidity] = useState(validator(startValue));
  const [pristine, setPristine] = useState(false);

  const onChange = (event) => {
    const newValue = event.nativeEvent instanceof InputEvent ? event.target.value : event;
    if (!pristine) {
      setPristine(!isEmpty(newValue))
    }
    setValue(newValue);
    setValidity(validator(newValue));
  }

  return { forTpl: { value, onChange }, setValue, isValid, pristine }
}

