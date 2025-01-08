import WebSocket, { WebSocketServer } from "ws";


const wss:WebSocketServer = new WebSocketServer({port:8080})

wss.on("connection",(socket)=>{
    console.log("Connection Established");
    socket.send("Hi");
    socket.on("message",(message)=>{
        console.log(message.toString());
        socket.send(message.toString());
    })
})