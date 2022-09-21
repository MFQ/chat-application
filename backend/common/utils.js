const getRoomName = (user1, user2) => [user1, user2].sort().join("_")

module.exports = {
  getRoomName
}