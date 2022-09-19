import React, { useEffect, useRef } from "react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import MessageBubble from "../../molecules/message-bubble";
import "./index.scss"

const ClassName = "message-list"
const {username} = localStorage;
TimeAgo.addDefaultLocale(en);

const MessageList = ({ messages }) => {
  const timeAgo = new TimeAgo('en-US')
  const messageRef = useRef(null);
  const scrollToMyRef = () => {
    if (messageRef.current) {
      const scroll = messageRef.current.scrollHeight - messageRef.current.clientHeight;
      messageRef.current.scrollTo(0, scroll);
    }
  };
  useEffect( () => scrollToMyRef(), [messages] )
  return <div
    ref={messageRef}
    className={ClassName}>
      {
        messages.map( ({message, sender, createdAt}) => 
          <MessageBubble
            key={message+"createdAt"}
            message={message}
            type={username === sender ? "self" : "receiver"}
            createdAt={timeAgo.format( new Date(createdAt) )} 
          />
        )
      }
</div>
}

export default MessageList;