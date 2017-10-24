var express = require("express");

// Create a new Express application
var app = express();

app.use(express.static('public'))
// Create an http server with Node's HTTP module.
// Pass it the Express application, and listen on port 8080.
var server = require('http').createServer(app);

server.listen(process.env.PORT || 3000);
var port = process.env.PORT || 3000;
// Instantiate Socket.IO hand have it listen on the Express/HTTP server
var socket = require("socket.io");
var io = socket.listen(server);

console.log(`server started, socket open at ${port}...`);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection: " + socket.id);

  socket.on("move", moveDog);
  socket.on("connected", sendNewDog);
  socket.on("stay", sitDog);

  function sendNewDog(data) {
    console.log("DogJoined");
    data.id = socket.id;
    socket.broadcast.emit("dogJoined", data);
  }

  function moveDog(data) {
      
    console.log("dog is moving");
    data.id = socket.id;
    socket.broadcast.emit("dogMoved", data);
  }

  function sitDog(data) {
      
    console.log("Dog is sitting.");
    data.id = socket.id;
    socket.broadcast.emit("sitDog", data);
  }
}
