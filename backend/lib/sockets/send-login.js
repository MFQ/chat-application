const sendLogin = ({socket, db, socketIO}) => {
  const { users, sessions } = db;
  socket.on("sendLogin", ({username, password, id}) => {
		const loggedInUser = users.find( 
			u => username === u.username && u.password === password 
		)

    console.log("___________-login user", loggedInUser, id)

		if (loggedInUser) {
				socketIO.to(id)
					.emit("loginSuccessful", { loginStatus: true })
				sessions[username] = id
		}
		else 
			socketIO.to(id)
				.emit("loginFailed", { loginStatus: false })
		console.log("____________session________", sessions)
	});
}

module.exports = sendLogin