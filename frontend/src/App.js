import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client"

import './App.css';

import { SocketActions } from "./extras/constants"

import Button from "./atoms/button"
import LoginPage from './pages/login-page';
import ChatRoomPage from './pages/chat-room-page';
import ConnectedUserPage from "./pages/connected-user-page";

const { 
  updateSession, disconnect, logoutCons, connect 
} = SocketActions;

const socket = socketIO.connect("http://localhost:4000", {
  reconnection: false,
  forceNew: true
})

const App = () => {

  // const navigate = useNavigate();
  const { username } = localStorage

  socket.on(connect, () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    localStorage.setItem("sessionId", socket.id);
    if (username) {
      socket.emit(updateSession, { username, id: socket.id });
    }
  });

  const logout = () => {
    socket.emit(logoutCons, { username })
    localStorage.clear()
    window.location.href = "/login"
  }

  socket.on(disconnect, () => {
    console.log(socket.id); // undefined
  });

  return (
    <div className="App">
      {
        username && <Button style={"logout"} text={`${username} logout`} onClick={logout} />
      }
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage socket={socket} />}/>
          <Route path="/connectedusers" element={<ConnectedUserPage socket={socket} />} />
          <Route path="/chatroom" element={<ChatRoomPage socket={socket} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
