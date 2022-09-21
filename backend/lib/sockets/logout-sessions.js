const logoutSession = ({socket, db}) => {

  const { sessions } = db;
  socket.on("logout", ({username}) => {
		delete sessions[username]
	})
}

module.exports = logoutSession;