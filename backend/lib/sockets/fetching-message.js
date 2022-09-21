const fetchingMessage = ({socket, db: { rooms }, socketIO}) => 
  socket.on("fetchingMessage", ({ roomName, id }) => {
		socketIO.to(id)
			.emit("receivingMessage", { messages:rooms[roomName]})
	});


module.exports = fetchingMessage;