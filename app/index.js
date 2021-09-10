var express = require('express');
var app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var users = [{
    name: "khoand",
    age: 20
}];

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get("/users", (req, res) => {
    res.json({
        status: 200,
        data: users,
    });
});

app.post("/users", (req, res) => {
    const {name, age} = req.body;
    const newUser = {name, age};
    const io = req.app.get("connections");
    io.emit("data-change", newUser)
    users.push(newUser);
    res.json({
        status: 200,
    });
});

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.set("connections", io);

io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
})
