const SocketActions = {
  updateSession: "updateSession",
  disconnect: "disconnect",
  logoutCons: "logout",
  connect: "connect",

  sendLogin: "sendLogin",
  loginSuccessful: "loginSuccessful",
  loginFailed: "loginFailed",

  joined: "joined",
  userNotFound: "userNotFound",
  joinChatRoom: "joinChatRoom",

  receivingMessage: "receivingMessage",
  sendMessageReceiver: "sendMessageReceiver",
  fetchingMessage: "fetchingMessage",
  sendMessageCons: "sendMessage"
}

const loginUrl = "/login";
const chatroomUrl = "/chatroom";
const joinUrl = "/connectedusers";

const UnableToFindUser = "Unable to find User";
const MissingCredentials = "missing username or password";

export {
  SocketActions,
  loginUrl,
  chatroomUrl,
  UnableToFindUser,
  MissingCredentials,
  joinUrl
}