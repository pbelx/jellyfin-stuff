const io = require("socket.io-client")
const socket = io("ws://host:4000")
socket.on("connect",()=>{
    socket.emit("search","username")
})
socket.on("searchm",(data)=>{
    console.log(data)
})
socket.on("greetings",(data)=>{
    console.log(data)
})
