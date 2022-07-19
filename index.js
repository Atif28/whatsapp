const express = require("express");
let http = require("http");
const app = express();
const port = process.env.PORT || 5000;
let server = http.createServer(app);
let io = require("socket.io")(server);



//middlewre
app.use(express.json());
let clients = {};

io.on("connection", (socket) => {
    console.log("Connection");
    console.log(socket.id, "Has joined");
    socket.on("signin", (id)=>{
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    });
socket.on("message", (msg)=>{
    console.log(msg);
    let targetId = msg.targetId;
    if(clients[targetId]){
        clients[targetId].emit("message", msg);
    }
});

});

app.route("/check").get((_req, res)=>{
    return res.json("Your App is working fine");
});

server.listen(port, "0.0.0.0", () => {
    console.log("server started");
});