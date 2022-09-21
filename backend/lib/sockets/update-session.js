const updateSession = ({ socket, db }) => {
  const { sessions } = db

  socket.on("updateSession", ({ username, id }) => 
		sessions[username] = id
	)
}

module.exports = updateSession;