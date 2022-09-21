// const { getRoomName } = require("../../common")

const { getRoomName } = require("../../common/utils")

const joinChatRoom = ({ socket, db: { rooms, users }, socketIO }) => 
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


module.exports = joinChatRoom