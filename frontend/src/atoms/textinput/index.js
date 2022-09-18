import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';



const TextInput = ({ placeHolder, onChange, value, type }) => 
  type === "textarea" ? 
  <TextareaAutosize
    minRows={3}
    maxRows={3}
    autoFocus 
    cacheMeasurements
    value={value} 
    onChange={onChange} 
    placeholder={placeHolder}   
  /> :
  <input 
    type={type} 
    onChange={onChange} 
    placeholder={placeHolder} 
    value={value} 
  />

  export default TextInput;