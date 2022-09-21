const fetchingMessage = ({socket, db, socketIO}) => {
  const { rooms } = db;
  socket.on("fetchingMessage", ({ roomName, id }) => {
		socketIO.to(id)
			.emit("receivingMessage", { messages:rooms[roomName]})
	});
}

module.exports = fetchingMessage;