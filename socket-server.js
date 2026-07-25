const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", ({ roomCode, callsign }) => {
  socket.join(roomCode);

  console.log(`${callsign} joined room ${roomCode}`);

  socket.to(roomCode).emit("user-joined", {
    socketId: socket.id,
    callsign,
  });
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

console.log("Socket.IO server running on http://localhost:3001");
