const io = require("socket.io")(4000)
const ns = require("./soksearch")
io.on("connection", (socket) => {

    socket.emit("greetings", "hey")
    socket.on("search", (msg) => {
        console.log(msg)
        ns.namesearch(msg,socket)
        // socket.emit("message", msg)


    })


})
