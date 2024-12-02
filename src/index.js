const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const connectDB = require("./config/db");
const websocketRoutes = require("./routes/websocketRoutes");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

connectDB();

wss.on("connection", (ws) => {
  console.log("New client connected");
  websocketRoutes(ws); 
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
