const getRoomName = (user1, user2) => [user1, user2].sort().join("_")

const isSelf = type => type === "self" ? "message-bubble-reverse" : ""

const setUsernameLocal = username => localStorage.setItem("username", username);
const setSessionId = sessionId => localStorage.setItem("sessionId", sessionId)
const setCurrentReceiverLocal = receiver => localStorage.setItem("currentReceiver", receiver);

export {
  getRoomName,
  isSelf,
  setSessionId,
  setUsernameLocal,
  setCurrentReceiverLocal
}