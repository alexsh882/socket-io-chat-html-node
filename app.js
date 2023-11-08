import express from "express";

import { createServer } from "node:http";
import { Server } from "socket.io";

import fileDirName from "./src/utils/file-dir-name.js";
const { __dirname } = fileDirName(import.meta);

const app = express();

const server = createServer(app);

const io = new Server(server);

const allMessages = [];

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

io.on("connection", (socket) => {

  // allMessages.map((msgData) => {
  //   socket.emit("chat-msg", msgData);
  // });

  socket.emit('all-msg', allMessages);

  socket.on("chat-msg", (msgData) => {
    allMessages.push(msgData);
    socket.broadcast.emit("chat-msg", msgData);
  });

  socket.on('typing', (username) => {
    socket.broadcast.emit("typing", username);
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
