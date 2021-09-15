const express = require("express")
const ns = require("./searchuser")
const cors = require("cors")

const app = express()
let coptions = {
    origin:"*"
}
app.use(cors(coptions))
app.use(express.json())

app.post("/searchname",(req,res)=>{
    console.log(req.body.xname)
    // res.send(req.body.xname)
    let username = req.body.xname
    ns.namesearch(username,res)

})
app.post("/addname",(req,res)=>{
    console.log(req.body.xname)
    // res.send(req.body.xname)
    let username = req.body.xname
    let password = req.body.xpass
    ns.adduser(username,password,res)

})

app.listen(9000)
console.log("server 9000")
