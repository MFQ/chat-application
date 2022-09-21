const updateSession = ({ socket, db: { sessions } }) => 
	socket.on("updateSession", ({ username, id }) => 
		sessions[username] = id
	)


module.exports = updateSession;