var express = require("express");
var app = express.createServer(express.logger());
var io = require("socket.io").listen(app);
// var io = socket.listen(server);
app.use(express.static(__dirname+"/public"));

// app.use(express.static('public'))
// // Create an http server with Node's HTTP module.
// // Pass it the Express application, and listen on port 8080.
// var server = require('http').createServer(app);

// server.listen(process.env.PORT || 3000);
// // Instantiate Socket.IO hand have it listen on the Express/HTTP server
// var socket = require("socket.io");
// var io = socket.listen(server);

io.configure(function(){
    io.set("transports",["xhr-polling"]);
    io.set("polling duration",10);
})
var port = process.env.PORT || 3000;
app.listen(port,function(){
    
    console.log(`server started, socket open at ${port} in ${app.settings.env} mode...`);
    
})

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
