const logoutSession = ({socket, db: { sessions }}) => 
  socket.on("logout", ({username}) => {
		delete sessions[username]
	})

module.exports = logoutSession;