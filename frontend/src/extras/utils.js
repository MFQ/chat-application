const getRoomName = (user1, user2) => [user1, user2].sort().join("_")
const isSelf = type => type === "self" ? "message-bubble-reverse" : ""

export {
  getRoomName,
  isSelf
}