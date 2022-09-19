import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import ChatRoom from '../../organisms/chat-room';
import { getRoomName } from "../../extras/utils"
import { SocketActions, loginUrl } from "../../extras/constants"

const { receivingMessage, sendMessageReceiver, fetchingMessage, sendMessageCons  } 
= SocketActions

const ChatRoomPage = ({ socket }) => {

  const navigate = useNavigate();
  const currentUser = localStorage.getItem("username");
  const currentReceiver = localStorage.getItem("currentReceiver")
  const roomName = getRoomName(currentUser, currentReceiver)
  const [state, setState] = useState({
    messages: [],
    newMessage: ""
  })
  const { newMessage } = state;
  const messageRecivers = ({messages}) => setState({ newMessage: "", messages })
  
  socket.on(receivingMessage, messageRecivers)
  socket.on(sendMessageReceiver, messageRecivers)

  useEffect(() => {
    const {username} = localStorage
    if (!username) {
      navigate(loginUrl);
    }
  }, [])

  useEffect(() => {
    const {sessionId} = localStorage;
    socket.emit(fetchingMessage, { roomName, id: sessionId })
  }, [])

  const typeNewMessage = el => setState({...state, newMessage: el.target.value})
  const sendMessage = () => {
    const message =  {
      message: newMessage,
      receiver: currentReceiver,
      sender: currentUser,
      createdAt: new Date(),
      roomName
    }
    setState({newMessage: "", messages: [...state.messages, message]})
    socket.emit(sendMessageCons,{...message, roomName})
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