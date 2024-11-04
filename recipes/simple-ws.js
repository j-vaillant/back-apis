const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Remplacez par l'URL où votre client est hébergé
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté :", socket.id);
  socket.on("disconnect", () => {
    console.log("Un utilisateur est déconnecté");
  });
});

server.listen(3001, () => {
  console.log("listen on port 3001");
});
