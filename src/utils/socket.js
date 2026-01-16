const socket = require("socket.io");
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
        "https://mini-project-movies-space.vercel.app",
        "http://localhost:5173",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ name }) => {
      const roomId = "Public_Chat@MUVIES";
      console.log(name + " " + "joined the Chat " + roomId);
      socket.join(roomId);
    });
    socket.on("sendMessage", ({ name, text }) => {
      const roomId = "Public_Chat@MUVIES";
      io.to(roomId).emit("messageRecieved", { name, text });
      console.log(name + " " + text);
    });
  });
};
module.exports = initializeSocket;
