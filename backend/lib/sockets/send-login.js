const sendLogin = ({socket, db: { users, sessions }, socketIO}) => 
  socket.on("sendLogin", ({username, password, id}) => {
		const loggedInUser = users.find( 
			u => username === u.username && u.password === password 
		)

		if (loggedInUser) {
				socketIO.to(id)
					.emit("loginSuccessful", { loginStatus: true, username })
				sessions[username] = id
		}
		else 
			socketIO.to(id)
				.emit("loginFailed", { loginStatus: false })
	});


module.exports = sendLogin