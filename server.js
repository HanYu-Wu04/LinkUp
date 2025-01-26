const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
const os = require("os");

const dev = process.env.NODE_ENV !== "production";
const port = 3000;

// Function to get the local IP address
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface || []) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address; // Return the first non-internal IPv4 address
      }
    }
  }
  return "127.0.0.1"; // Fallback to localhost if no address is found
}

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // Join a specific room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Handle sending messages to a specific room
    socket.on("message", ({ roomId, data }) => {
      console.log(`Message from ${socket.id} to room ${roomId}: ${data}`);
      io.to(roomId).emit("message", data); // Send to all users in the room
    });
  });

  const hostname = "0.0.0.0"; // Bind to all network interfaces
  const localIp = getLocalIp();

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`> Ready on http://${localIp}:${port}`);
      console.log(`> Also accessible on http://localhost:${port}`);
    });
});
