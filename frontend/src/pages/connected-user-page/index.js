import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ConnectedUser from "../../organisms/connected-user";
import { SocketActions } from "../../extras/constants"

const { joined, userNotFound, joinChatRoom } = SocketActions;


const ConnectedUserPage = ({ socket }) => {
  const navigate = useNavigate();
  const currentUsername = localStorage.getItem("username")
  const [selectUser, pickUserForChat] = useState("");
  const [error, setError] = useState("");
  
  const joinChat = () => socket
    .emit(joinChatRoom, { selectUser, id:socket.id, currentUsername })
    useEffect(() => {
      const {username} = localStorage
      if (!username) {
        navigate("/login");
      }
    }, [])
    
  socket.on(joined, (d) => {
    localStorage.setItem("currentReceiver", selectUser)
    setError("");
    navigate("/chatroom")
  });

  socket.on(userNotFound, (d) => setError("Unable to find User"));

  return <ConnectedUser 
    selectUser={selectUser}
    pickUserForChat={pickUserForChat}
    joinChat={joinChat}
    error={error}
  />

}

export default ConnectedUserPage;