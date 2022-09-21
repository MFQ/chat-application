const sendMessage = ({socket, db, socketIO}) => {

  const { rooms, sessions } = db;

  socket.on("sendMessage", ({sender, receiver, message, roomName, id, createdAt}) => {
		const newMessage = { sender, receiver, message, createdAt }
		rooms[roomName] = rooms[roomName] ? [...rooms[roomName], newMessage] : [newMessage];
		const receiverUserSessionId = sessions[receiver]
		if (receiverUserSessionId) {
			socketIO.to(receiverUserSessionId).emit("sendMessageReceiver", { messages: rooms[roomName]});
		}
	})

}

module.exports = sendMessage;