import React from 'react';

import "./index.scss"

const ClassName = "bubble"

const Bubble = ({ type, children }) => 
  <div className={ClassName}>{children}</div>

  export default Bubble;