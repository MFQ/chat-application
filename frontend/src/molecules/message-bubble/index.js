import React from 'react';

import Bubble from "../../atoms/bubble"
import Text from "../../atoms/text"
import { isSelf } from "../../utils"
import "./index.scss"

const Classname = "message-bubble"

const MessageBubble = ({ type, message, createdAt}) =>
  <div className={`${Classname} ${ isSelf(type)}`}>
    <Bubble type={type}>
      <Text text={message} style={"normal"}/>
      <Text text={createdAt} style={"small"}/>
    </Bubble>
  </div>

  export default MessageBubble;