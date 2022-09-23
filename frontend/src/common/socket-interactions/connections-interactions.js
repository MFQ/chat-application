import { SocketActions } from "../constants"
import { setSessionId } from "../utils";

const { username } = localStorage
const { connect, updateSession, logoutCons, disconnect } = SocketActions;
const emitUpdateSession = (socket, id) => 
  username ? socket.emit(updateSession, { username, id }) : console.log("username is not available")


const onConnect = socket => {
  socket.on(connect, () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    setSessionId(socket.id);
    emitUpdateSession();    
  });
}

const onDisconnet = socket => socket.on(disconnect, () => 
  console.log(socket.id) // undefined
);


const emitLogout = socket => {
  socket.emit(logoutCons, { username })
  localStorage.clear()
  window.location.href = "/login"
}


const connectionInteractions = socket => {
  onConnect(socket);
  onDisconnet(socket);
}

export { emitLogout }

export default connectionInteractions;