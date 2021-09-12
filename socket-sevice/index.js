const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const io = new Server({
  cors: {
    origin: "*",
  },
});

const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
io.listen(3003);

io.on("connection", (socket) => {
  socket.on("client:message", (msg) => {
    console.log("client:message: ", msg);
  });
});
