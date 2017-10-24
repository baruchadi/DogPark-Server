var express = require("express");

// Create a new Express application
var app = express();

// Create an http server with Node's HTTP module.
// Pass it the Express application, and listen on port 8080.
var server = app.listen(3000);

// Instantiate Socket.IO hand have it listen on the Express/HTTP server
var socket = require("socket.io");
var io = socket(server);

console.log("server started, socket open at 3000...");

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection: " + socket.id);

  socket.on("move", moveDog);
  socket.on("connected", sendNewDog);
  socket.on("stay", sitDog);

  function sendNewDog(data) {
    data.id = socket.id;
    socket.broadcast.emit("dogJoined", data);
  }

  function moveDog(data) {
    data.id = socket.id;
    socket.broadcast.emit("dogMoved", data);
  }

  function sitDog(data) {
    data.id = socket.id;
    socket.broadcast.emit("sitDog", data);
  }
}