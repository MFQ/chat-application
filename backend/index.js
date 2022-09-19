const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const mongoClient = require('mongodb').MongoClient;
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});
const {getRoomName} = require("./utils")

const users = require("./users");
const rooms = {};
const sessions = {};

app.use(cors())

socketIO.on('connection', (socket) => {
	console.log("connected!!");

	socket.on("sendLogin", ({username, password, id}) => {
		const loggedInUser = users.find( 
			u => username === u.username && u.password === password 
		)
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

	socket.on("joinChatRoom", ({ 
		selectUser, id, currentUsername
	}) => {
		const user = users.find( u => selectUser === u.username );
		if (user) {
			// const currentUser = sessions[currentUsername];
			let roomName = Object.keys(rooms)
				.find(room => room.includes(currentUsername) &&
				room.includes(user.username)
			)
			if(!roomName) {
				roomName = getRoomName(currentUsername, user.username)
				rooms[roomName] = []
			}
			const messages = rooms[roomName]
			socketIO.to(id)
				.emit("joined", { 
					status: true, 
					selectUsername: user.username, 
					roomName, 
					messages
				})
		} else {
			socketIO.to(id)
				.emit("userNotFound", { status: false })
		}
	});

	socket.on("fetchingMessage", ({ roomName, id }) => {
		console.log(id)
		console.log(roomName)
		console.log("____________sessions____________-", sessions)
		socketIO.to(id)
			.emit("receivingMessage", { messages:rooms[roomName]})
	});

	socket.on("sendMessage", ({sender, receiver, message, roomName, id, createdAt}) => {
		const newMessage = { sender, receiver, message, createdAt }
		rooms[roomName] = rooms[roomName] ? [...rooms[roomName], newMessage] : [newMessage];
		const receiverUserSessionId = sessions[receiver]
		if (receiverUserSessionId) {
			socketIO.to(receiverUserSessionId)
			.emit("sendMessageReceiver", { messages: rooms[roomName]});
		}
	})

	socket.on("updateSession", ({ username, id }) => {
		sessions[username] = id;
		console.log(sessions)
	})

	socket.on("logout", ({username}) => {
		delete sessions[username]
		console.log("_______________session___", sessions)
	})


});




http.listen(PORT, () => console.log(`Server listening on ${PORT}`) );