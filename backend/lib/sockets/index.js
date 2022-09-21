const fetchingMessage = require("./fetching-message");
const joinChatRoom = require("./join-chat-room");
const logoutSession = require("./logout-sessions");
const sendLogin = require("./send-login");
const sendMessage = require("./send-message");
const updateSession = require("./update-session");


const socketsEvents = ( socketIO, db ) => {

  socketIO.on('connection', socket => {
    console.log("connected!!");

    sendLogin({ socket, db, socketIO });    
    fetchingMessage({ socket, db, socketIO });
    joinChatRoom({ socket, db, socketIO });
    logoutSession({ socket, db });
    sendMessage({ socket, db, socketIO });
    updateSession({socket, db});

  });

}

module.exports = socketsEvents;