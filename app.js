import express from "express";

import { createServer } from "node:http";
import { Server } from "socket.io";

import fileDirName from './src/utils/file-dir-name.js';
const { __dirname } = fileDirName(import.meta);

const app = express();

const server = createServer(app);

const io = new Server(server);

const allMessages = [];

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/src/index.html');
  });

io.on("connection", (socket) => {
  
console.log("User connected");

  socket.on("chat-msg", (msgData) => {
    console.log(msgData);

    allMessages.push(msgData);

    io.emit("chat-msg", msgData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});



server.listen(4000, () => {
  console.log("Server is running on port 4000");
});