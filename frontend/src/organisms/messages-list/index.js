import React, { useEffect, useRef } from "react";

import MessageBubble from "../../molecules/message-bubble";
import "./index.scss"

const ClassName = "message-list"
const {username} = localStorage;

const MessageList = ({ messages }) => {
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
        messages.map( ({message, sender, receiver}) => 
          <MessageBubble
            key={message+"createdAt"}
            message={message}
            type={username === sender ? "self" : "receiver"}
            createdAt={"createdAt"} 
          />
        )
      }
</div>
}

export default MessageList;