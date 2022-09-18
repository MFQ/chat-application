import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ConnectedUser from "../../organisms/connected-user";
// import { UserContext } from "../../App";


const ConnectedUserPage = ({ socket }) => {
  // const userContextData = useContext(UserContext);
  // const {context, setContext} = userContextData;
  const navigate = useNavigate();
  const currentUsername = localStorage.getItem("username")
  const [selectUser, pickUserForChat] = useState("");
  const [error, setError] = useState("");
  const joinChat = () => socket
    .emit("joinChatRoom", { selectUser, id:socket.id, currentUsername })
    useEffect(() => {
      const {username} = localStorage
      if (!username) {
        navigate("/login");
      }
    }, [])
    
  socket.on("joined", (d) => {
    // setContext({...context, currentReceiver: selectUser});
    localStorage.setItem("currentReceiver", selectUser)
    setError("");
    navigate("/chatroom")
  });

  socket.on("userNotFound", (d) => 
    setError("Unable to find User") 
  );

  return <ConnectedUser 
    selectUser={selectUser}
    pickUserForChat={pickUserForChat}
    joinChat={joinChat}
    error={error}
  />

}

export default ConnectedUserPage;