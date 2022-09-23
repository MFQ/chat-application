import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client"

import './App.css';

import { connectionInteractions, emitLogout } from "./common/socket-interactions";

import Button from "./atoms/button"
import LoginPage from './pages/login-page';
import ChatRoomPage from './pages/chat-room-page';
import ConnectedUserPage from "./pages/connected-user-page";

const socket = socketIO.connect("http://localhost:4000", {
  reconnection: false,
  forceNew: true
})

const App = () => {

  const { username } = localStorage
  connectionInteractions(socket);

  return (
    <div className="App">
      {
        username && <Button style={"logout"} text={`${username} logout`} onClick={ () => emitLogout(socket)} />
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
