import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app); //
// http.createServer() is used to create a new http server and it takes the app as an argument

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
}); // Create a new instance of the socket.io server which takes the server as an argument to

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]; // get the receiverId from the userSocketMap
}

const userSocketMap = {}; // {userId: socketId}

// when a client connects to this io it will run the function
io.on("connection", (socket) => {


  console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId; // get the userId from the socket.handshake.query (from client)
    if(userId != "undefined") userSocketMap[userId] = socket.id; // store the userId as a key and socketId as a value in the userSocketMap
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // send events to all connected clients




  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      delete userSocketMap[userId]; // delete the user from the userSocketMap
      io.emit("getOnlineUsers", Object.keys(userSocketMap)); // send events to all connected clients  
  });
});

export { app, io, server };
