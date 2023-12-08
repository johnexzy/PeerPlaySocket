const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();
const PORT = process.env.PORT || 4000;
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connect", (socket) => {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on("send_msg", (data) => {
    console.log(data, "DATA", socket.id);
  
    socket.broadcast.to(data.roomId).emit("receive_msg", data);
  });

  socket.on("seek", (data) => {
    console.log(data, "Seek Data");

    socket.broadcast.to(data.roomId).emit("seek", { seekTime: data.seekTime });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  console.log("socket connect", socket.id);
  socket.broadcast.emit("welcome", `Welcome ${socket.id}`);

});

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
