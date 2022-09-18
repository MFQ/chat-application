import React from "react";

import TextInput from "../../atoms/textinput";
import Button from "../../atoms/button";

import "./index.scss"

const ClassName = "message-controller"

const MessageController = ({ sendMessage, typeNewMessage, newMessage }) => 
  <div className={ClassName}>
    <TextInput
      onChange={typeNewMessage}
      placeHolder="enter your message"
      type="textarea"
      value={newMessage}
    />
    <Button onClick={sendMessage} text={"Send"} />
  </div>

export default MessageController;