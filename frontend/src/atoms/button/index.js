import React from 'react';

const Button = ({ text, onClick, style }) => 
  <button className={style} onClick={onClick}>{text}</button>

  export default Button;