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
const { getRoomName } = require("./common/utils")
const socketsEvents = require("./lib/sockets")
const users = require("./users");
const rooms = {};
const sessions = {};

app.use(cors())

socketsEvents( socketIO, { users, rooms, sessions })

http.listen(PORT, () => console.log(`Server listening on ${PORT}`) );