import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";

import ChatRoom from '../../organisms/chat-room';
import { getRoomName } from "../../utils"

const ChatRoomPage = ({ socket }) => {

  // const userContextData = useContext(UserContext)
  // const { currentUser, currentReceiver } = userContextData;
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("username");
  const currentReceiver = localStorage.getItem("currentReceiver")
  const roomName = getRoomName(currentUser, currentReceiver)
  const [state, setState] = useState({
    messages: [],
    newMessage: ""
  })
  const { newMessage } = state;
  const messageRecivers = ({messages}) =>{
    console.log("_____________messages_", messages)
    setState({ newMessage: "", messages })
  }
  socket.on("receivingMessage", messageRecivers)
  socket.on("sendMessageReceiver", messageRecivers)

  useEffect(() => {
    const {username} = localStorage
    if (!username) {
      navigate("/login");
    }
  }, [])

  useEffect(() => {
    const {sessionId} = localStorage;
    console.log("_____________",localStorage)
    socket.emit("fetchingMessage", { roomName, id: sessionId })
  }, [])

  const typeNewMessage = el => setState({...state, newMessage: el.target.value})
  const sendMessage = () => {
    const message =  {
      message: newMessage,
      receiver: currentReceiver,
      sender: currentUser,
      roomName
    }
    setState({newMessage: "", messages: [...state.messages, message]})
    socket.emit("sendMessage",{...message, roomName})
  }

  return <div>
  <h1>Chatroom page</h1>
  <ChatRoom 
    {...state} 
    typeNewMessage={typeNewMessage} 
    sendMessage={sendMessage} 
  />
</div>
}

  export default ChatRoomPage;