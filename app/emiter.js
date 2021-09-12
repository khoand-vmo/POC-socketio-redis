const { Emitter } = require("@socket.io/redis-emitter");
const { createClient } = require("redis");

const redisClient = createClient({ host: "localhost", port: 6379 });
const emitter = new Emitter(redisClient);

setInterval(() => {
  emitter.emit("time", new Date());
}, 2000);
