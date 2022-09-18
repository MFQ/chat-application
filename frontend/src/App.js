import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client"

import './App.css';

import LoginPage from './pages/login-page';
import ChatRoomPage from './pages/chat-room-page';
import ConnectedUserPage from "./pages/connected-user-page";

const UserContext = createContext();

const socket = socketIO.connect("http://localhost:4000", {
  reconnection: false,
  forceNew: true
})

const App = () => {

  const [context, setContext] = useState({
    currentUser: "",
    currentReceiver: ""
  })

  console.log("-________context_________", context)

  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    localStorage.setItem("sessionId", socket.id);
    const { username } = localStorage
    if (username) {
      socket.emit("updateSession", { username, id: socket.id });
    }
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });

  return (
    <div className="App">
      <UserContext.Provider value={{...context, setContext }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage socket={socket} />}/>
            <Route path="/connectedusers" element={<ConnectedUserPage socket={socket} />} />
            <Route path="/chatroom" element={<ChatRoomPage socket={socket} />}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export {UserContext};

export default App;
