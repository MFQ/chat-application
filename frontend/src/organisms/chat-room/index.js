import React from "react";

import MessageController from "../../molecules/message-controller"
import MessageList from "../messages-list";


const ChatRoom = ({ 
  messages, 
  newMessage, 
  typeNewMessage, 
  sendMessage 
}) => 
  <div>
    <MessageList messages={messages} />
    <MessageController 
      typeNewMessage={typeNewMessage} 
      sendMessage={sendMessage}
      newMessage={newMessage}
    />
  </div>

export default ChatRoom;