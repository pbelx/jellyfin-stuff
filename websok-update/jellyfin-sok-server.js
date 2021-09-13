// const io = require("socket.io")(4000)
const http = require('http');
const server = http.createServer()

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST","OPTIONS"]
    }
  });
const ns = require("./soksearch")
const add = require("./adduserSokfn")
io.on("connection", (socket) => {

    socket.emit("greetings", "hey boy")
    socket.on("search", (msg) => {
        console.log(msg)
        ns.namesearch(msg,socket)
        // socket.emit("message", msg)


    })
    socket.on("addname", (msg) => {
        // console.log(msg.pname)
        
        let xname = msg.pname
        let xpassword = msg.pass
        add.adduser(xname,xpassword,socket)
        socket.emit("addm", msg)


    })


})

server.listen(4000)
console.log("server on port 4000")
