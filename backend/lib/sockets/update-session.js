const updateSession = ({ socket, db }) => {
  const { sessions } = db

  socket.on("updateSession", ({ username, id }) => {
		sessions[username] = id;
		console.log(sessions)
	})
}

module.exports = updateSession;